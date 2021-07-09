<template>
  <div>
    <div class="m-auto">
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

export default {
  components: {
    GreetingCard,
    CollegeCard,
    StudentsCard,
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style>
</style>