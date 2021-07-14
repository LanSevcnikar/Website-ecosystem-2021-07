<template>
  <div align="center">
   <form @submit="checkForm" class="w-75 mt-3">
      <div class="mb-3" align="left">
        <label for="exampleInputEmail1" class="form-label">Email address</label>
        <input
          type="text"
          class="form-control"
          v-model="email"
        />
      </div>
      <div class="mb-3" align="left">
        <label for="exampleInputEmail1" class="form-label">First name</label>
        <input
          type="text"
          class="form-control"
          v-model="fname"
        />
      </div>
      <div class="mb-3" align="left">
        <label for="exampleInputEmail1" class="form-label">Last name</label>
        <input
          type="text"
          class="form-control"
          v-model="lname"
        />
      </div>
     
      
    
      <div class="row m-4">
        <button type="submit" class="btn btn-primary"> Change </button>
      </div>
    </form>
    <br />
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      fname: "",
      lname: "",
      colid: "",
    }
  },
  created: function(){
    const userData = JSON.parse(localStorage.getItem("userData"))
    this.email = userData.email;
    this.fname = userData.firstName;
    this.lname = userData.lastName;
  },
};
</script>

<style>
.nav-masthead .nav-link {
  padding: 0.25rem 0;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.5);
  background-color: transparent;
  border-bottom: 0.25rem solid transparent;
}

.nav-masthead .nav-link:hover,
.nav-masthead .nav-link:focus {
  border-bottom-color: rgba(255, 255, 255, 0.25);
}

.nav-masthead .nav-link + .nav-link {
  margin-left: 1rem;
}

.nav-masthead .active {
  color: #fff;
  border-bottom-color: #fff;
}

.cover-container {
  max-width: 42em;
}
</style>
