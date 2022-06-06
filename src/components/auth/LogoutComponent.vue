<template>
  <a class="btn btn-block" @click.prevent="logout"></a>
</template>

<script>
  export default {
    name: "LogoutComponent",
    methods: {
      logout() {
        this.$store.dispatch("logout");
      }
    }
  };
</script>