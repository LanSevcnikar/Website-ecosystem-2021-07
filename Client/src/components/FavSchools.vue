<template>
  <div class="card">
    <div class="card-body">
      <h5 class="card-title">Students favourite schools</h5>
      <div class="row justify-content-around">
        <div class="col-12 col-sm-7">
          <select class="form-control" id="exampleFormControlSelect1">
            <option disabled value="">Please select one</option>
            <option v-for="school in schools" :key="school.id" :value="school.id">
              {{ school.name }}
            </option>
          </select>
        </div>
        <div class="col-4 d-sm-none"></div>
        <div class="col-6 col-sm-5 justify-content-center" align="center">
          <button class="btn btn-primary m-auto" @click="addSchool">Add school</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import loadAPI from '../functions/loadingScreen'
import callAPI from '../functions/callAPI'

export default {
  data() {
    return {
      schools: [],
    };
  },
  methods: {
    addSchool(){
      var e = document.getElementById("exampleFormControlSelect1");
      console.log(e.value);
    }
  },
  created: async function () {
    const data = {
        query: `
            query MyQuery {
              colleges {
                name
                id
              }
            }
          `,
      };
      console.log("Hi")
    const res = await loadAPI(callAPI, data, '/graphql');
    res.data.data.colleges.forEach(school => {
      this.schools.push(school)
    });
  }
};
</script>