<template>
  <div>
    <div v-if="loggedIn == false">
      <div class="row">
        <div class="col-6" align="center">
          <blockquote class="blockquote text-center mt-4">
            <p class="mb-0">{{ website }}</p>
          </blockquote>
        </div>
        <div class="col-6" align="center" style="margin: auto">
          <button
            type="submit"
            class="btn btn-primary"
            @click="switchLoginSignUp()"
          >
            {{ oppositeWebsite }}
          </button>
        </div>
      </div>

      <form @submit="checkForm">
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label"
            >Email address</label
          >
          <input
            type="email"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            v-model="email"
          />
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">Password</label>
          <input
            type="password"
            class="form-control"
            v-model="password"
            id="exampleInputPassword1"
          />
        </div>
        <div class="mb-3" v-if="website == 'Signup'">
          <label for="exampleInputEmail1" class="form-label">First name</label>
          <input
            type="text"
            class="form-control"
            id="exampleInputFirstName"
            v-model="fname"
          />
        </div>
        <div class="mb-3" v-if="website == 'Signup'">
          <label for="exampleInputEmail1" class="form-label">Last name</label>
          <input
            type="text"
            class="form-control"
            id="exampleInputSecondName"
            v-model="lname"
          />
        </div>
        <div class="row m-4">
          <button type="submit" class="btn btn-primary">{{ website }}</button>
        </div>
      </form>
      <br />
    </div>

    <div v-if="loggedIn" class="w-50 m-auto mt-4" allign="center">
      <div class="text-center">You are succesfully logged in</div>
      <div class="col mt-4" align="center">
        <button @click="logout()" class="btn btn-primary">Logout</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
      fname: "",
      lname: "",
      website: "Login",
      oppositeWebsite: "Signup",
      loggedIn: false,
    };
  },
  created: function () {
    if (localStorage.getItem("jwtToken")) {
      this.loggedIn = true;
    } else {
      this.loggedIn = false;
    }
  },
  methods: {
    switchLoginSignUp() {
      const pt = this.website;
      this.website = this.oppositeWebsite;
      this.oppositeWebsite = pt;
    },
    logout() {
      localStorage.removeItem("jwtToken");
      this.loggedIn = false;
    },
    checkForm: function (e) {
      const email = this.email;
      const password = this.password;

      this.email = this.password = "";

      if (this.website == "Signup") {
        console.log("Startting signup process");
        const fname = this.fname;
        const lname = this.lname;
        this.fname = this.lname = "";
        console.log(email, password, fname, lname);
        const D = JSON.stringify({
          query: `
            mutation signUp($input:SignUpInput) {
              signUp(input:$input)
            }
          `,
          variables: {
            input: {
              email: email,
              fname: fname,
              password: password,
              lname: lname,
            },
          },
        });
        postData("http://localhost:9000/graphql", D)
          .then((r) => r.json())
          .then((data) => {
            console.log(data);
            if (data.token) {
              localStorage.setItem("jwtToken", data.token);
              this.loggedIn = true;
            }
          })
          .catch(() => {
            alert("Signup failed");
          });
        e.preventDefault();
      }
      const D = JSON.stringify({ email, password });
      console.log("function called");
      postData("http://localhost:9000/login", D)
        .then((r) => r.json())
        .then((data) => {
          if (data.token) {
            localStorage.setItem("jwtToken", data.token);
            this.loggedIn = true;
          }
        })
        .catch(() => {
          alert("Login failed");
        });
      e.preventDefault();
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
</script>