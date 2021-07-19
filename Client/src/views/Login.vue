<template style="height: 100%">
  <div class="h-100 asd">
    <div align="center">
      <div style="display: table" class="h-100 w-50">
        <div class="card m-3 p-3">
          <div class="loadingornot" v-if="loading">Loading</div>
          <div class="loadingornot" v-if="loading == false">
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
                  <label for="exampleInputPassword1" class="form-label"
                    >Password</label
                  >
                  <input
                    type="password"
                    class="form-control"
                    v-model="password"
                    id="exampleInputPassword1"
                  />
                </div>
                <div class="mb-3" v-if="website == 'Signup'">
                  <label for="exampleInputEmail1" class="form-label"
                    >First name</label
                  >
                  <input
                    type="text"
                    class="form-control"
                    id="exampleInputFirstName"
                    v-model="fname"
                  />
                </div>
                <div class="mb-3" v-if="website == 'Signup'">
                  <label for="exampleInputEmail1" class="form-label"
                    >Last name</label
                  >
                  <input
                    type="text"
                    class="form-control"
                    id="exampleInputSecondName"
                    v-model="lname"
                  />
                </div>
                <div class="row m-4">
                  <button type="submit" class="btn btn-primary">
                    {{ website }}
                  </button>
                </div>
              </form>
              <br />
            </div>

            <div v-if="loggedIn" class="w-50 m-auto mt-4" allign="center">
              <div class="text-center">You are succesfully logged in</div>
              <div class="col mt-4" align="center">
                <button @click="logout()" class="btn btn-primary">
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.asd {
  height: 100%;
}
</style>

<script>
import callAPI from "../functions/callAPI";
import Hashes from "jshashes";

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
      loading: false,
    };
  },
  created: async function () {
    this.loggedIn = localStorage.getItem("jwtRefreshToken") != null;
    const data = { query: "{ students(limit: 1) { id } }" };
    const res = await callAPI(data, '/graphql');
    console.log(res);
    if (res.status != 200) this.loggedIn = false;
    if (res.data.errors) this.loggedIn = false;
    else this.loggedIn = true;
  },
  methods: {
    switchLoginSignUp: function () {
      const pt = this.website;
      this.website = this.oppositeWebsite;
      this.oppositeWebsite = pt;
    },
    logout: async function () {
      this.loading = true;
      const refreshTokenCurrent = localStorage.getItem("jwtRefreshToken");

      const data = JSON.stringify({
        query: `
        mutation MyMutation($token: String = "") {
          insert_invalid_tokens_one(object: {token: $token}) {
            token
          }
        }`,
        variables: {
          token: refreshTokenCurrent,
        },
      });

      let payload = {
        method: "POST",
        headers: {},
        body: data,
      };

      //This is the only one that must not, uner any cicumstance, go through the centeral logic
      // We do not want to create a new access token

      await fetch("https://first-testing.hasura.app/v1/graphql", payload).catch(
        (e) => console.log(e)
      );

      localStorage.setItem("jwtAccessToken", "");
      localStorage.setItem("jwtRefreshToken", "");

      this.loggedIn = false;
      this.loading = false;
    },
    checkForm: async function (e) {
      this.loading = true;
      console.log("hci");
      e.preventDefault();
      const email = this.email;
      const password = this.password;

      this.email = this.password = "";

      if (this.website == "Signup") {
        const fname = this.fname;
        const lname = this.lname;
        this.fname = this.lname = "";
        const hashesPassword = new Hashes.SHA256().b64(password);
        console.log(hashesPassword);
        console.log(email, password, fname, lname);

        const data = {
          query: `
           mutation MyMutation($password: String = "", $last_name: String = "", $first_name: String = "", $email: String = "") {
              insert_students(objects: {email: $email, first_name: $first_name, last_name: $last_name, password: $password}){
                affected_rows,
              }
            }
          `,
          variables: {
            password: hashesPassword,
            last_name: lname,
            email: email,
            first_name: fname,
          },
        };

        console.log("Sfdadf");

        const res = await callAPI(data, "/graphql");
        console.log("Sfdadf");
        if (res.data.errors || res.status != 200) {
          alert("something went wrong");
        }
        e.preventDefault();
      }

      const data = {
        email: email,
        password: password,
      };

      const res = await callAPI(data, "/login");

      if (res.data[1]) {
        alert("Login failed with error: " + res.data[1]);
      } else {
        const newAccessToken = res.data[0][0];
        const newRefreshToken = res.data[0][1];
        localStorage.setItem("jwtAccessToken", newAccessToken);
        localStorage.setItem("jwtRefreshToken", newRefreshToken);
        this.loggedIn = true;
      }

      e.preventDefault();
      this.loading = false;
    },
  },
};
</script>
