<template>
  <div>
    <form @submit="checkForm">
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">Email address</label>
        <input
          type="email"
          class="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          v-model="email"
        />
        <div id="emailHelp" class="form-text">
          We'll never share your email with anyone else.
        </div>
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
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
    <br />
    <button type="button" class="btn btn-primary">Greet me</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    checkForm: function (e) {
      const email = this.email;
      const password = this.password;
      const D = JSON.stringify({ email, password });
      console.log('function called')
      postData("http://localhost:9000/login", D)
        .then((r) => {
          const o = r.json();
          return o;
        })
        .then((data) => {
          if(data.token){
            alert("Login worked")
          }}).catch(() => {
            alert("Login failed")
          })
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