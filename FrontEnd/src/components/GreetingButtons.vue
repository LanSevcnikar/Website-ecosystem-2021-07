<template>
  <div class="row mt-4">
    <div class="col-6" align="center">
      <button type="button" class="btn btn-primary" @click="getGreeting()">
        Greet me without
      </button>
    </div>
    <div class="col-6" align="center">
      <button type="button" class="btn btn-primary" @click="getGreetingAuth()">
        Greet me with auth
      </button>
    </div>
  </div>
</template>


<script>
export default {
  components: {},
  data() {
    return {};
  },
  methods: {
    getGreeting: function () {
      console.log("Greeting you");
      const D = JSON.stringify({ query: "{ greeting }" });
      postData("http://localhost:9000/graphql", D)
        .then((r) => r.json())
        .then((data) => {
          alert(data.data.greeting);
        });
    },
    getGreetingAuth: function () {
      console.log("Greeting you");
      const D = JSON.stringify({ query: "{ greetingAuth }" });
      //const jwttoken = localStorage.getItem("jwtToken");
      const jwttoken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJTMU1fN1lIYV8iLCJpYXQiOjE2MjU4MTc5OTF9.bsHY1vEIHhKG1mOYrkuK7HjqMk_dmJp1haTeJhQ6re8"
      postDataAuth("http://localhost:9000/graphql", D, jwttoken)
        .then((r) => r.json())
        .then((data) => {
          console.log(data);
          if (data.data.greetingAuth) {
            alert(data.data.greetingAuth);
          } else {
            alert("You are not logged in");
          }
        });
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
