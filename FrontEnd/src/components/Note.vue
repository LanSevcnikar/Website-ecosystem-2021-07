<template>
  <div style="background-color: lightblue">
    <div class="row g-0">
      <div class="col-4">
        {{ coll.name }}
      </div>
      <div class="col-4">
        {{ coll.location }}
      </div>
      <div class="col-4">
        {{ coll.rating }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["coll"],
};
</script>

<style>
</style>