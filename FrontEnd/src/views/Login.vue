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
import callAPI from "../functions/callAPI";

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
  created: async function () {
    if (localStorage.getItem("jwtToken")) {
      const data = { query: "{ checkLoginStatus }" };
      const jwttoken = localStorage.getItem("jwtToken");
      const res = await callAPI(data, jwttoken);
      console.log(res.status);
      if (res.status == 401) this.loggedIn = false;
      else this.loggedIn = res.data.data ? true : false;
    } else {
      this.loggedIn = false;
    }
  },
  methods: {
    switchLoginSignUp: function () {
      const pt = this.website;
      this.website = this.oppositeWebsite;
      this.oppositeWebsite = pt;
    },
    logout: function () {
      localStorage.removeItem("jwtToken");
      this.loggedIn = false;
    },
    checkForm: async function (e) {
      const email = this.email;
      const password = this.password;

      this.email = this.password = "";

      if (this.website == "Signup") {
        console.log("Startting signup process");
        const fname = this.fname;
        const lname = this.lname;
        this.fname = this.lname = "";
        console.log(email, password, fname, lname);
        const data = {
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
        };

        const res = await callAPI(data);
        if (res.data.errors || res.status != 200) {
          alert("something went wrong");
        } else {
          localStorage.setItem("jwtToken", res.data.data.token);
          this.loggedIn = true;
        }
        e.preventDefault();
      }
      const data = { email, password };
      const res = await callAPI(data, "", "http://localhost:9000/login");
      try{
        localStorage.setItem("jwtToken", res.data.token);
        this.loggedIn = true;
      }catch{
        alert("Login failed")
      }
      e.preventDefault();
    },
  },
};
</script>