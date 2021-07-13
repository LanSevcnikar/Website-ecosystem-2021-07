<template>
  <div class="card" style="width: 60%; margin: auto; margin-top: 3em">
    <div class="card-body">
      <h5 class="card-title">Greet me</h5>
      <h6 class="card-subtitle mb-2 text-muted">
        simple check to see if the user is authenticated
      </h6>
      <div class="row">
        <div class="col-12 col-md-6 mt-3" align="center">
          <button type="button" class="btn btn-primary" @click="getGreeting()">
            Greet me without
          </button>
        </div>
        <div class="col-12 col-md-6 mt-3" align="center">
          <button
            type="button"
            class="btn btn-primary"
            @click="getGreetingAuth()"
          >
            Greet me with auth
          </button>
        </div>
      </div>
      <div class="text-danger mt-2" v-if="reminder">
        You need to be logged in to see this
      </div>
    </div>
    <button class="btn btn-primary m-3" @click="storeCookie"> Hello </button>
  </div>
</template>



<script>
import callAPI from "../functions/callAPI";
import cookie from "js-cookie";

export default {
  components: {},
  data() {
    return {
      reminder: false,
    };
  },
  methods: {
    getGreeting: async function () {
      const data = { query: "{ greeting }" };

      await callAPI(data).then((res) => alert(res.data.data.greeting));
    },
    getGreetingAuth: async function () {
      const data = { query: "{ greetingAuth }" };

      const res = await callAPI(data);
      if(res.data.errors) alert(res.data.errors[0].message);
      else{
        if (res.status == 200) alert(res.data.data.greetingAuth);
        else alert("Response came back with status: ", res.status)
      }
    },
    storeCookie: function(){
      console.log("cookie")
      cookie.set("token", "sometasdasdhingCOool", {expires: 1/24})
    }
  },
};
</script>
