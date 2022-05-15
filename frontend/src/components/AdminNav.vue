<template>
  <nav class="bloc-nav">
    <img src="../assets/icon1.png" alt="" />
    <ul class="select">
      <li><router-link to="/admin/wall">The wall</router-link></li>
      <li><router-link to="/admin/users">Utilisateurs</router-link></li>
      <li><router-link to="/admin/profil">Profil</router-link></li>
      <li>
        <router-link to="/" @click.native="disconnect"
          >Déconnexion
        </router-link>
      </li>
      <!-- <router-link to="/admin/remark">Commentaires</router-link>-->
    </ul>
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

  color: white;
}
a:hover {
  color: black;
  border-bottom: 1px solid #000;
}

.bloc-nav {
  height: 100px;
  margin: auto;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  border-bottom: 4px solid rgb(10, 3, 107);
  justify-content: space-around;
  background-color: #f05454;
}
ul {
  width: 70%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  margin-top: 30px;
  padding: 0;
}
li {
  list-style-type: none;
  padding-bottom: 15px;
}
li:hover {
  transform: scale(1.5);
}

img {
  object-fit: cover;
  margin: 15px;
  width: 200px;
  height: 30px;
}

@media screen and (max-width: 780px) {
  .bloc-nav {
    height: 150px;
  }
  ul {
    margin-top: 0;
  }
}
</style>
