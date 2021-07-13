<template>
  <div class="card" style="width: 60%; margin: auto; margin-top: 3em">
    <div class="card-body">
      <h5 class="card-title">JWT token</h5>
      <textarea
        type="email"
        class="form-control"
        id="exampleInputEmail1"
        aria-describedby="emailHelp"
        v-model="jwttoken"
      />
    </div>
  </div>
</template>



<script>

export default {
  components: {},
  data() {
    return {
      jwttoken: "",
    };
  },
  created: function () {
    this.jwttoken = localStorage.getItem("jwtToken");
  },
  watch: {
    jwttoken: function () {
      localStorage.setItem("jwtToken", this.jwttoken);
    },
  },
};
</script>
