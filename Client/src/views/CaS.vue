<template>
  <div>
    <div class="m-auto">
      <jwt></jwt>
      <college-card> </college-card>
      <students-card></students-card>
    </div>
  </div>
</template>

<script>
import CollegeCard from "../components/CollegeCard.vue";
import StudentsCard from "../components/StudentsCard.vue";
import jwt from "../components/JWT.vue";

export default {
  components: {
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