<template>
  <div class="public">
    <AdminNav />
    <router-view />
  </div>
</template>

<script>
import AdminNav from "@/components/AdminNav.vue";

export default {
  name: "AdminNavLayout",
  components: {
    AdminNav,
  },
};
</script>

<style></style>
