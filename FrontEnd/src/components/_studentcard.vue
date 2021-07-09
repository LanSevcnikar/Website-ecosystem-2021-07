<template>
  <div class="row p-3">
    <div class="h4">
      {{ name }}
    </div>
    <div class="">
      {{ email }}
    </div>
    <div class="">
      {{ uni }}
    </div>
  </div>
</template>
<script>
export default {
  props: ["name", "email", "uni"],
};
</script>

<style>
.topmarginbig {
  margin-top: 3em !important;
}
</style>