<template>
  <div class="row p-3">
    <div class="col-7">
      <div class="row">
        <div class="h4">
          {{ name }}
        </div>
        <div class="">
          {{ location }}
        </div>
      </div>
    </div>
    <div class="col-5 display-4 text-end">
      {{ rating }}
    </div>
  </div>
</template>
<script>
export default {
  props: ["name", "location", "rating"],
};
</script>

<style>
.topmarginbig {
  margin-top: 3em !important;
}
</style>