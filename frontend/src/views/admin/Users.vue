<template>
  <div class="card-container">
    <div class="card">
      <ul>
        <li v-bind:key="id" v-for="(user, id) in allUsers">
          <router-link v-bind:to="`/user/${user.id}`">
            <div class="card m-2">
              <img
                id="img-user"
                class="card-img-top"
                src="../../assets/image-profil.jpg"
                alt=""
              />
              <h3>{{ user.pseudo }}</h3>
            </div>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import jwtInterceptor from "../../_helpers/jwtInterceptor";
import user from "../../_services/user";

export default {
  name: "users",
  data() {
    return {
      allUsers: [],
    };
  },
  created() {
    user.getAllUsers().then((res) => {
      for (const infoUser of res.data.data) {
        console.log(infoUser);
        this.allUsers.push(infoUser);
      }
    });
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
</style>
