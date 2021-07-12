<template>
  <div>
    <div class="m-auto">
      <jwt></jwt>
      <greeting-card> </greeting-card>
      <college-card> </college-card>
      <students-card></students-card>
    </div>
  </div>
</template>

<script>
import GreetingCard from "../components/GreetingCard.vue";
import CollegeCard from "../components/CollegeCard.vue";
import StudentsCard from "../components/StudentsCard.vue";
import jwt from "../components/JWT.vue";

export default {
  components: {
    GreetingCard,
    CollegeCard,
    StudentsCard,
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