<template>
  <div class="card h-100">
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
      <div class="col" align="center">
        <div class="text-danger mt-2" v-if="reminder">
          You need to be logged in to see this
        </div>
        <div class="card-text">This is an example of a storage</div>
        <button class="btn btn-primary m-3" @click="increment">
          {{ getCounter }}
        </button>
      </div>
    </div>
  </div>
</template>



<script>
import loadAPI from "../functions/loadingScreen"
import callAPI from "../functions/callAPI";
import { mapGetters } from "vuex";
import { store } from "../store";
export default {
  components: {},
  data() {
    return {
      reminder: false,
    };
  },
  computed: mapGetters(["getCounter"]),
  methods: {
    getGreeting: async function () {
      const data = { query: "{ greeting }" };
      const res = await loadAPI(callAPI,data, '/graphql') // await callAPI(data).then((res) => alert(res.data.data.greeting));
      console.log(res)
      alert(res.data.data.greeting);
    },
    getGreetingAuth: async function () {
      const data = { query: "{ greetingAuth }" };
      const res = await loadAPI(callAPI,data, '/graphql') // const res = await callAPI(data);
      if (res.data.errors) alert(res.data.errors[0].message);
      else {
        if (res.status == 200) alert(res.data.data.greetingAuth);
        else alert("Response came back with status: ", res.status);
      }
    },
    increment: function () {
      store.commit("increment");
    },
  },
};
</script>