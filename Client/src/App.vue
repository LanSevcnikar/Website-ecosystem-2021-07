<template>
  <div class="mainThing">
    <div class="loading" v-show="isLoading">
      <div class="loadingScreenTHingy"></div>
      <h2 class="loadingTitle" align="center">
        Loading...
      </h2>
    </div>
  <nav-tab></nav-tab>
    
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import navTab from './components/navTab.vue'

export default {
  name: "App",
  data() {
    return {};
  },
  computed: mapGetters(["isLoading"]),
  components: {
    navTab,
  },
};
</script>

<style>
.card {
  break-inside: avoid !important;
}
.card-columns {
  column-count: 4;
}

#app {
  height: 100vh;
}

.mainThing{
  
  height: 100%;
}

.loadingScreenTHingy {
  position: fixed;
  bottom: 0;
  height: 100%;
  width: 100%;
  z-index: 95;
  background-color: white;
  opacity: 0.7;
}

.loadingTitle {
  position: fixed;
  top: 50%;
  z-index: 96;
  width: 100%;
  text-align: center;
}
</style>
