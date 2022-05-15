<template>
  <div class="image-profil">
    <form id="form-img" @submit.prevent="submit">
      <input
        @change="onChange"
        type="file"
        name="avatar"
        class="d-none"
        id="input-avatar"
      />
      <img
        @click="onClick"
        id="img-profil"
        src="../assets/image-profil.jpg"
        alt="photo de profil"
      />
    </form>
  </div>
</template>

<script>
export default {
  name: "photo",
  data() {
    return {
      image: null,
    };
  },
  methods: {
    onClick() {
      const inputAvatar = document.querySelector("#input-avatar");
      inputAvatar.click();
      console.log("click");
    },
    onChange(e) {
      console.log("change");
      const file = e.target.files[0];
      console.log(file);
    },
  },
};
</script>

<style scoped>
#form-img {
  text-align: center;
}
</style>
