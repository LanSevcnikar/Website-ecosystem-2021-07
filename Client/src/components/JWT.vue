<template>
  <div class="card">
    <div class="card-body">
      <h5 class="card-title">JWT token</h5>
      <div class="card-text">
        Access Token
      </div>
      <textarea
        type="text"
        class="form-control"
        v-model="jwttokenA"
      />
      <div class="card-text">
        Refresh Token
      </div>
      <textarea
        type="text"
        class="form-control"
        v-model="jwttokenR"
      />
    <div class="row" align="center">
      <div class="col" align="center">
        <button class="btn btn-primary mt-3" @click="updateTokens"> Update tokens </button>
      </div>
    </div>
    </div>
  </div>
</template>



<script>

export default {
  components: {},
  data() {
    return {
      jwttokenA: "",
      jwttokenR: "",
    };
  },
  created: function () {
    this.jwttokenA = localStorage.getItem("jwtAccessToken");
    this.jwttokenR = localStorage.getItem("jwtRefreshToken");
  },
  methods: {
    updateTokens: function(){
      this.jwttokenA = localStorage.getItem("jwtAccessToken");
    this.jwttokenR = localStorage.getItem("jwtRefreshToken");
    }
  },
  watch: {
    jwttoken: function () {
      localStorage.setItem("jwtToken", this.jwttoken);
    },
  },
};
</script>
