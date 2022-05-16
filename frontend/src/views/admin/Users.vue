<template>
  <div class="container mt-5">
    <div class="card w-80 mt-5" v-bind:key="id" v-for="(user, id) in allUsers">
      <router-link v-bind:to="`/user/${user.id}`">
        <div class="card-user">
          <img
            id="img-user"
            class="card-img-top"
            src="../../assets/image-profil.jpg"
            alt=""
          />
          <h3>{{ user.pseudo }}</h3>
          <p>Compte actif depuis le {{ dateFormat[id] }}</p>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import jwtInterceptor from "../../_helpers/jwtInterceptor";
import user from "../../_services/user";
import jwt_decode from "jwt-decode";

export default {
  name: "users",
  data() {
    return {
      allUsers: [],
      userActuId: "",
    };
  },
  mounted() {
    //---Récupération de l id utilisateur dans le token
    const token = localStorage.getItem("token");
    const userData = jwt_decode(token);
    console.log(userData);
    this.userActuId = userData.id;
  },
  created() {
    //--------------------------------------------------------------/
    //---Récupération de tout les utilisateurs et stockage dans data
    user.getAllUsers().then((res) => {
      for (const infoUser of res.data.data) {
        console.log(infoUser);
        this.allUsers.push(infoUser);
      }
    });
  },
  computed: {
    //---Date création commentaire
    dateFormat(id) {
      return this.allUsers.map(
        (u) =>
          u.createdAt.slice(0, 10).split("-").reverse().join(".") +
          " à " +
          u.createdAt.split("T")[1].split(".")[0]
      );
    },
  },

  methods: {},
};
</script>

<style scoped>
#img-user {
  width: 100px;
  height: 100px;
  border-radius: 50%;
}
.card {
  border-radius: 50%;
  width: 420px;
}

a {
  text-decoration: none;
}
h3 {
  color: black;
}
p {
  color: black;
  font-weight: 600;
  font-size: 18px;
}
@media screen and (max-width: 992px) {
  .card {
    margin: auto;
    width: 200px;
  }
}
</style>
