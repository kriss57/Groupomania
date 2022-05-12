<template>
  <nav class="bloc-nav">
    <img src="../assets/icon1.png" alt="" />
    <router-link to="/admin/wall">Home</router-link>
  </nav>
</template>

<script>
export default {
  name: "LoginNav",
};
</script>

<style scoped>
a {
  font-weight: 800;
  font-size: 20px;
  color: #f05454;
  text-decoration: none;
  padding-top: 35px;
}
.bloc-nav {
  padding: 0;
  display: flex;
  justify-content: space-around;
  background-color: #e8e8e8;
  width: 80%;
  border-radius: 50px;
  margin: auto;
  margin-top: 20px;
}
nav {
  height: 100px;
}
img {
  object-fit: cover;
  width: 250px;
}
</style>
