<template>
  <div class="card" style="width: 60%; margin: auto; margin-top: 3em">
    <div class="card-body">
      <h5 class="card-title">Greet me</h5>
      <h6 class="card-subtitle mb-2 text-muted">
        simple check to see if the user is authenticated
      </h6>
      <div class="row mt-4">
        <div class="col-6" align="center">
          <button type="button" class="btn btn-primary" @click="getGreeting()">
            Greet me without
          </button>
        </div>
        <div class="col-6" align="center">
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
  </div>
</template>



<script>
export default {
  components: {},
  data() {
    return {
      reminder: false,
    };
  },
  methods: {
    getGreeting: function () {
      console.log("Greeting you");
      const D = JSON.stringify({ query: "{ greeting }" });
      postData("http://localhost:9000/graphql", D)
        .then((r) => r.json())
        .then((data) => {
          this.reminder = false;
          alert(data.data.greeting);
        });
    },
    getGreetingAuth: function () {
      console.log("Greeting you");
      const D = JSON.stringify({ query: "{ greetingAuth }" });
      const jwttoken = localStorage.getItem("jwtToken");
      postDataAuth("http://localhost:9000/graphql", D, jwttoken)
        .then((r) => r.json())
        .then((data) => {
          console.log(data);
          if (data.data.greetingAuth) {
            alert(data.data.greetingAuth);
            this.reminder = false;
          } else {
            this.reminder = true;
          }
        }).catch(this.reminder = true)
    },
  },
};

async function postData(url, data) {
  console.log(data);
  const response = await fetch(url, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: data,
  });
  return response;
}

async function postDataAuth(url, data, token) {
  console.log(data);
  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: "bearer " + token,
      "Content-Type": "application/json",
    },
    body: data,
  });
  return response;
}
</script>
