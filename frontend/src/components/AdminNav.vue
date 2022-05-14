<template>
  <nav class="bloc-nav">
    <img src="../assets/icon1.png" alt="" />
    <router-link to="/admin/wall">The wall</router-link>
    <router-link to="/admin/users">Utilisateurs</router-link>
    <router-link to="/admin/remark">Commentaires</router-link>
    <router-link to="/admin/profil">Profil</router-link>
    <router-link to="/" @click.native="disconnect">Déconnexion</router-link>
  </nav>
</template>

<script>
import tokenService from "../_services/tokenService";

export default {
  name: "AdminNav",
  methods: {
    disconnect: function () {
      tokenService.logout();
    },
  },
};
</script>

<style scoped>
a {
  text-decoration: none;
  padding-top: 30px;
  color: white;
}
a:hover {
  color: black;
  transform: scale(1.5);
  border-bottom: 1px solid #000;
}

.bloc-nav {
  padding: 10px;
  height: 110px;
  margin: auto;
  display: flex;
  border-bottom: 4px solid rgb(10, 3, 107);
  justify-content: space-around;
  background-color: #f05454;
}

nav {
  height: 90px;
}

img {
  object-fit: cover;
  width: 150px;
  height: 100px;
  padding-bottom: 20px;
}
</style>
