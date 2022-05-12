<template>
  <div class="bloc-modale" v-if="revele">
    <div class="overlay"></div>

    <div class="modale card">
      <div v-on:click="toggleModale" class="btn-modale btn btn-outline-danger">
        X
      </div>
      <h2>Créer ton article, user: {{ articleData.user_id }}</h2>
      <div class="container">
        <div class="form-group">
          <label for="titre">Titre du post</label>
          <input
            v-model="articleData.titre"
            type="text"
            id="titre"
            class="form-control"
          />
        </div>

        <div class="form-group">
          <label for="txt">Contenu</label>
          <textarea
            v-model="articleData.contenu"
            class="form-control"
            id="txt"
            cols="50"
            rows="4"
          ></textarea>
          <button
            v-on:click.prevent="createArticle()"
            class="btn btn-outline-success mt-3"
          >
            Création article
          </button>
          <button type="file" class="btn btn-outline-success mt-3">
            Ajouter image
          </button>
          <form id="form-img">
            <div class="form-group justify-content-center">
              <label for="File">Choisir une nouvelle photo</label>
              <input
                @change="selectFile()"
                type="file"
                ref="file"
                name="image"
                class="form-control-file"
                id="File"
                accept=".jpg, .jpeg, .gif, .png"
              />
            </div>
          </form>
        </div>
        <p>titre: {{ articleData.titre }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import article from "../_services/article";
import jwt_decode from "jwt-decode";
import router from "@/router";

import store from "../store/index";
export default {
  name: "modalArticle",
  props: ["revele", "toggleModale"],
  data() {
    return {
      articleData: {
        user_id: "",
        titre: "",
        contenu: "",
        image: "",
      },
    };
  },

  methods: {
    selectFile() {
      console.log(this.$refs.file.files[0]);
      this.articleData.image = this.$refs.file.files[0];
    },

    createArticle() {
      const token = localStorage.getItem("token");
      const userData = jwt_decode(token);
      console.log(userData.id);
      const id = userData.id;
      /*let articleData = {
        user_id: id,
        titre: this.articleData.titre,
        contenu: this.articleData.contenu,
        image: this.articleData.image,
      };*/
      const formData = new FormData();
      formData.append("image", this.articleData.image);
      formData.append("user_id", id);
      formData.append("titre", this.articleData.titre);
      formData.append("contenu", this.articleData.contenu);
      article
        .addArticle(formData)
        .then((res) => console.log(res), this.$router.go())
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style>
.bloc-modale {
  position: fixed;

  z-index: 3;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.overlay {
  background-color: rgba(0, 0, 0, 0.5);

  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}
.modale {
  background: whitesmoke;
  color: rgb(0, 0, 0);
  padding: 50px;
  position: fixed;
  border-radius: 30px;
}
.btn-modale {
  position: absolute;
  top: 10px;
  right: 10px;
  border-radius: 50%;
}
</style>
