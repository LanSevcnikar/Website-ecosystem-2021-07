<template>
  <div
    class="row p-3"
    @mouseover="hovering = false"
    @mouseleave="hovering = true"
  >
    <div class="col-12 col-sm-9">
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
    <div class="col-3 m-auto">
      <button
        class="btn btn-danger m-auto"
        v-if="hovering == false"
        @click="doSomething"
      >
        Delete
      </button>
    </div>
  </div>
</template>
<script>
export default {
  props: ["name", "email", "uni", "index"],
  data() {
    return {
      hovering: true,
    };
  },
  methods: {
    doSomething() {
      this.$emit("deleteMe", this.index);
    },
  },
};
</script>

<style>
.topmarginbig {
  margin-top: 3em !important;
}
</style>