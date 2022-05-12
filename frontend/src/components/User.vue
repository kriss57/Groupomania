<template>
  <div class="card p-3">
    <p>ID: {{ userUnique.id }}</p>
    <p>Prénom: {{ userUnique.prenom }}</p>
    <p>Nom: {{ userUnique.nom }}</p>
    <p>Pseudo: {{ userUnique.pseudo }}</p>
    <p>Email: {{ userUnique.email }}</p>
    <button
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
    };
  },

  mounted() {
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
