
<template>
  <div>
    <p>New collefge</p>
    name
    <input type="text" /> <br />
    place
    <input type="text" /><br />
    rating
    <input type="number" /><br />
    <router-link to="/notes"> Never mind </router-link><br />
    <router-link to="/notes"> Submit </router-link>
  </div>
</template>

<script>
export default {
  created() {
    const noteId = this.$route.params.id;
    //Here, add comunication with the OG server
    console.log("omething", noteId);
  },
};
</script>

<style>
</style>