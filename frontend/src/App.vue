<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
};
</script>

<style>
body {
  background: rgb(105, 114, 221);
  background: linear-gradient(
    90deg,
    rgba(163, 165, 188, 0.516) 0%,
    rgba(10, 81, 166, 1) 100%
  );
}
</style>
