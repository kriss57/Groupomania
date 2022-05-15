<template>
  <div class="card p-3">
    <h2 v-if="userActuId == 1">Modérateur du site</h2>
    <h2 v-else>Information sur : {{ userUnique.pseudo }}</h2>
    <p>Prénom: {{ userUnique.prenom }}</p>
    <p>Nom: {{ userUnique.nom }}</p>
    <p>Pseudo: {{ userUnique.pseudo }}</p>
    <p v-if="userActuId == 1">Email: {{ userUnique.email }}</p>
    <div>
      <button v-on:click.prevent="exit" type="button">
        <i class="fa fa-arrow-left" aria-hidden="true"></i>
      </button>
    </div>
    <button
      v-if="userActuId == 1"
      v-on:click.prevent="deleteUser()"
      type="button"
      class="btn btn-secondary btn-lg btn-block"
    >
      Supprimer
    </button>
  </div>
</template>

<script>
import jwt_decode from "jwt-decode";
import user from "../_services/user";
import router from "@/router";

export default {
  name: "user",
  data() {
    return {
      id: this.$route.params.id,
      userUnique: [],
      userActuId: "",
    };
  },

  created() {
    //---Récupération de l id utilisateur dans le token
    const token = localStorage.getItem("token");
    const userData = jwt_decode(token);
    console.log(userData);
    this.userActuId = userData.id;
    //-------------------------------------------------//
    //---Récupération des info user par son id connecté
    let id = this.id;
    user
      .getUser(id)
      .then((res) => {
        console.log(res);
        console.log(res.data.data);
        this.userUnique = res.data.data;
      })
      .catch((err) => console.log(err));
  },
  methods: {
    isAdmin() {},
    exit() {
      router.push("/admin/users");
    },
    //--------------------------//
    //---Supprimer utilisateur
    deleteUser() {
      let id = this.id;
      user
        .deleteUser(id)
        .then((res) => console.log(res), router.push("/admin/users"))
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style></style>
