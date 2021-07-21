<template>
  <div>
    <div class="row w-75 m-auto d-flex justify-content-around">
      <div class="col-12 col-lg-11 mt-3"><jwt></jwt></div>
      <div class="col-12 col-lg-5 mt-3"><greeting-card> </greeting-card></div>
      <div class="col-12 col-lg-5 mt-3"><students-card></students-card></div>
      <div class="col-12 col-lg-5 mt-3"><college-card> </college-card></div>
      <div class="col-12 col-lg-5 mt-3"><fav-schools></fav-schools></div>
      <div class="col-12" style="height: 200px"></div>
    </div>
  </div>
</template>

<script>
import GreetingCard from "../components/GreetingCard.vue";
import CollegeCard from "../components/CollegeCard.vue";
import StudentsCard from "../components/StudentsCard.vue";
import FavSchools from "../components/FavSchools.vue";
import jwt from "../components/JWT.vue";

export default {
  components: {
    GreetingCard,
    CollegeCard,
    StudentsCard,
    FavSchools,
    jwt,
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style>
</style>