<template>
  <div>
    <div class="container mt-5">
      <PhotoUser />
      <form>
        <div class="form-group">
          <label for="prenom">Ton prénom</label>
          <input
            v-model.lazy="userProfil.prenom"
            type="text"
            id="prenom"
            class="form-control"
          />
        </div>

        <div class="form-group">
          <label for="nom">Ton nom</label>
          <input
            v-model.lazy="userProfil.nom"
            type="text"
            id="nom"
            class="form-control"
          />
        </div>

        <div class="form-group">
          <label for="pseudo">Ton pseudo</label>
          <input
            v-model.lazy="userProfil.pseudo"
            type="text"
            id="pseudo"
            class="form-control"
          />
        </div>

        <div class="form-group">
          <label for="email">Ton email</label>
          <input
            v-model.lazy="userProfil.email"
            type="email"
            id="email"
            class="form-control"
            disabled="disabled"
          />
        </div>
      </form>
    </div>
    <div class="btn-profil">
      <button
        v-on:click.prevent="updateUser()"
        type="button"
        class="btn btn-secondary btn-lg btn-block"
      >
        Modifier
      </button>

      <button
        v-on:click.prevent="deleteUser()"
        type="button"
        class="btn btn-secondary btn-lg btn-block"
      >
        Supprimer
      </button>
    </div>
  </div>
</template>

<script>
import user from "../../_services/user";
import jwt_decode from "jwt-decode";

import router from "@/router";

import PhotoUser from "../../components/PhotoUser.vue";

export default {
  components: { PhotoUser },
  name: "user",
  data() {
    return {
      userProfil: [],
    };
  },

  mounted() {
    //---Récupération de l id utilisateur dans le token
    const token = localStorage.getItem("token");
    const userData = jwt_decode(token);
    console.log(userData.id);
    const id = userData.id;
    //---Récupération de l'utilisateur connecté
    user
      .getUser(id)
      .then((res) => {
        console.log(res.data.data);
        this.userProfil = res.data.data;
        jwtDecoded.decoded();
      })
      .catch((err) => console.log(err));
  },

  methods: {
    //-------------------------------------//
    //---Modification des infos utilisateur
    updateUser() {
      const id = this.userProfil.id;
      let userData = {
        pseudo: this.userProfil.pseudo,
        prenom: this.userProfil.prenom,
        nom: this.userProfil.nom,
        email: this.userProfil.email,
        image: this.userProfil.image,
      };
      user
        .updateUser(id, userData)
        .then((res) => console.log(res), router.push("/admin/profil"))
        .catch((err) => console.log(err));
    },
    //-----------------------------------//
    //---Suppréssion du compte utilisateur
    deleteUser() {
      let id = this.userProfil.id;
      user
        .deleteUser(id)
        .then((res) => console.log(res), router.push("/"))
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style>
#img-profil {
  border-radius: 50%;
}
.btn-profil {
  display: flex;
  justify-content: space-evenly;
  margin-top: 20px;
}
</style>
