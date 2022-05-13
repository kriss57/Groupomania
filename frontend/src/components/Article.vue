<template>
  <div>
    <div class="bloc-modale">
      <div class="overlay"></div>

      <div class="modale card">
        <div v-on:click="redirect" class="btn-modale btn btn-outline-danger">
          X
        </div>
        <h2 v-if="userActuId == 1">Modifie le post, user: {{ userActuId }}</h2>
        <h2 v-else>Tu n'est pas l'auteur de ce post !</h2>
        <p>user connecté:</p>
        <div class="container">
          <div class="form-group">
            <label for="titre">Titre du post</label>
            <input
              v-model="articleUnique.titre"
              type="text"
              id="titre"
              class="form-control"
            />
          </div>

          <div class="form-group">
            <label for="txt">Contenu</label>
            <textarea
              v-model="articleUnique.contenu"
              class="form-control"
              id="txt"
              cols="50"
              rows="4"
            ></textarea>
          </div>
          <button
            v-if="articleUnique.user_id === userActuId || userActuId == 1"
            v-on:click.prevent="updateArticle()"
            class="btn btn-outline-success mt-3"
          >
            Modifier article
          </button>
          <button
            v-if="articleUnique.user_id == userActuId || userActuId == 1"
            class="btn btn-outline-success mt-3"
          >
            Modifier image
          </button>
          <button
            v-if="articleUnique.user_id == userActuId || userActuId == 1"
            v-on:click="deleteArticle"
            class="btn btn-outline-success mt-3"
          >
            Supprimer article
          </button>
          <div class="form-group">
            <label for="titre">Commentaire</label>
            <input
              v-model.lazy="remarkData.contenu"
              type="text"
              id="commentaire"
              class="form-control"
              placeholder="Commenter"
            />
            <button
              v-on:click.prevent="createRemark"
              class="btn btn-outline-danger mt-3"
            >
              Ajouter commentaire
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="back-plan">
      <p>{{ userActuId }}</p>
    </div>
  </div>
</template>

<script>
import jwtInterceptor from "../_helpers/jwtInterceptor";
import article from "../_services/article";
import remark from "@/_services/remark";
import router from "@/router";
import jwt_decode from "jwt-decode";

export default {
  name: "article",

  data() {
    return {
      id: this.$route.params.id,
      articleUnique: [],
      remarkData: [],
      userActuId: "",
    };
  },

  mounted() {
    let id = this.id;
    jwtInterceptor;
    article
      .getArticle(id)
      .then((res) => {
        this.articleUnique = res.data.data;
      })
      .catch((err) => console.log(err));
  },

  created() {
    const token = localStorage.getItem("token");
    const userData = jwt_decode(token);
    console.log(userData);
    this.userActuId = userData.id;
  },

  methods: {
    updateArticle() {
      let id = this.id;
      let articleData = {
        user_id: this.articleUnique.user_id,
        titre: this.articleUnique.titre,
        contenu: this.articleUnique.contenu,
        image: this.articleUnique.image,
      };
      article
        .updateArticle(id, articleData)
        .then((res) => console.log(res), router.push("/admin/wall"))
        .catch((err) => console.log(err));
    },
    deleteArticle() {
      let id = this.id;
      article
        .deleteArticle(id)
        .then((res) => console.log(res), router.push("/admin/wall"))
        .catch((err) => console.log(err));
    },
    createRemark() {
      let remarkData = {
        user_id: this.userActuId,
        article_id: this.articleUnique.id,
        contenu: this.remarkData.contenu,
      };
      console.log(this.remarkData.contenu);
      console.log(this.articleUnique.id);
      remark
        .addRemark(remarkData)
        .then((res) => console.log(res), router.push("/admin/wall"))
        .catch((err) => console.log(err));
    },
    redirect() {
      router.push("/admin/wall");
    },
  },
};
</script>

<style scoped>
.overlay {
  background-color: rgba(115, 144, 240, 0.448);
}
</style>
