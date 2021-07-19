<template style="height: 100%">
  <div class="h-100 asd">
    <div align="center">
      <div style="display: table" class="h-100 w-50">
        <div class="card m-3 p-3">
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
              <button @click="logout()" class="btn btn-primary">Logout</button>
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
    this.loggedIn = (localStorage.getItem('jwtRefreshToken') != null);
    const data = { query: "{ students(limit: 1) { id } }" };
    const res = await callAPI(data);
    console.log(res)
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
      const data = {
        query: `
            mutation InvalidateTokenMutation {
              invalidateToken
            }
          `,
      };
      await callAPI(data);

      // THis makes more sense but makes the app look less advanced than it actually is

      localStorage.setItem("jwtAccessToken", "");
      localStorage.setItem("jwtRefreshToken", "");

      this.loggedIn = false;
    },
    checkForm: async function (e) {
      console.log("hi");
      e.preventDefault();
      const email = this.email;
      const password = this.password;

      this.email = this.password = "";

      if (this.website == "Signup") {
        const fname = this.fname;
        const lname = this.lname;
        this.fname = this.lname = "";
        console.log(email, password, fname, lname);
        const data = {
          query: `
            mutation signUp($signUpUserInput: SignUpInput!){
              signUpUser(input: $signUpUserInput)
            }
          `,
          variables: {
            signUpUserInput: {
              email: email,
              fname: fname,
              password: password,
              lname: lname,
            },
          },
        };

        const res = await callAPI(data, "http://95.179.206.119:4000/api");
        if (res.data.errors || res.status != 200) {
          alert("something went wrong");
        }
        e.preventDefault();
      }

      const data = {
        query: `
            mutation MyMutation($email: String = "", $password: String = "") {
              loginUser(inputData: {email: $email, password: $password}) {
                accessToken
                refreshToken
                error
                success
              }
            }
          `,
        variables: {
          email: email,
          password: password,
        },
      };

      console.log("hi");

      const res = await callAPI(data);

      try {
        if (res.data.data.loginUser.success == false) {
          alert("Login failed with error: " + res.data.data.loginUser.error);
        } else {
          const newAccessToken = res.data.data.loginUser.accessToken || "";
          const newRefreshToken = res.data.data.loginUser.refreshToken || "";
          localStorage.setItem("jwtAccessToken", newAccessToken);
          localStorage.setItem("jwtRefreshToken", newRefreshToken);
          this.loggedIn = true;
        }
      } catch {
        const error = res.data.errors[0].message;
        alert("Login failed with error: " + error);
      }
      e.preventDefault();
    },
  },
};
</script>
