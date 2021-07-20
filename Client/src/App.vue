<template>
  <div class="mainThing">
    <div class="loading" v-show="isLoading">
      <div class="loadingScreenTHingy"></div>
      <h2 class="loadingTitle" align="center">
        Loading...
      </h2>
    </div>

    <div style="height: 100%">
      <ul class="nav nav-fill nav-pills">
        <li class="nav-item">
          <router-link to="/home" class="nav-link" aria-current="page">
            Home
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/login" class="nav-link" aria-current="page">
            Login
          </router-link>
        </li>
        <li class="nav-item">
          <router-link
            to="/collagesandstudents"
            class="nav-link"
            aria-current="page"
          >
            Colleges and students
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/aboutme" class="nav-link" aria-current="page">
            About me
          </router-link>
        </li>
      </ul>
      <div class="container-fluid" style="height: 100%">
        <router-view style="height: 100%"></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "App",
  data() {
    return {};
  },
  computed: mapGetters(["isLoading"]),
  components: {},
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

.loadingScreenTHingy {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: white;
  z-index: 90;
  opacity: 0.5;
  pointer-events: none;
  text-align: center;
}

.loadingTitle {
  position: fixed;
  top: 50%;
  z-index: 96;
  width: 100%;
  text-align: center;
}
</style>
