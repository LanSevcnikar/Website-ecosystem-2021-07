<template>
  <div class="card" style="width: 60%; margin: auto; margin-top: 3em">
    <div class="card-body">
      <div class="row">
        <div class="col-7">
          <h5 class="card-title">Students card</h5>
          <h6 class="card-subtitle mb-2 text-muted">
            Get a list of all the Students <br />
            This is only for teachers
          </h6>
        </div>
        <div class="col-5 text-center" allign="center" style="margin: auto">
          <button class="btn btn-primary" @click="getstudents">Get 'em</button>
        </div>
      </div>
      <student-item
        v-for="(coll, index) in students"
        :key="index"
        :index="index"
        :name="coll.fullName"
        :email="coll.email"
        :uni="coll.college"
        @deleteMe="deleteMe"
      ></student-item>
    <div class="text-danger mt-2" v-if="reminder">
      You need to be logged in to see this
    </div>
    </div>
  </div>
</template>
<script>
import StudentItem from "./_studentcard.vue";

export default {
  components: {
    StudentItem,
  },
  data() {
    return {
      students: [],
      reminder: false,
    };
  },
  methods: {
    deleteMe(index) {
      console.log(index)
      console.log(this.students[index].id)
      
      const jwttoken = localStorage.getItem("jwtToken");
      const D = JSON.stringify({
          query: `
            mutation deleteStudent($id:ID!){
              deleteStudent(id:$id)
            }
          `,
          variables: {
            id: this.students[index].id,
          },
        });

      console.log(D)

      callAPI("http://localhost:9000/graphql", D, jwttoken)
        .then((r) => {
          console.log("Hi")
          r.json()
        }).then((data) => {
           console.log(data);
        }).then(this.getstudents())
    },






    getstudents() {
      this.students = [];
      const jwttoken = localStorage.getItem("jwtToken");
      const DD = JSON.stringify({
        query: `{
          getAllStudents {
            fullName
            email
            id
            college {
              name
            }
          }
        }`,
      });



      callAPI("http://localhost:9000/graphql", DD, jwttoken)
        .then((r) => r.json())
        .then((data) => {
          console.log(data, data.data, data.data.getAllStudents);
          data.data.getAllStudents.forEach((coll) => {
            const fullName = coll.fullName;
            const uni = coll.college ? coll.college.name : "";
            this.students.push({
              fullName: fullName,
              college: uni,
              email: coll.email,
              id: coll.id,
            });
            this.reminder = false;
          });
        })
        .catch((this.reminder = true));
    },
  },
};

async function callAPI(url, data, token) {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: token ? "bearer " + token : "",
      "Content-Type": "application/json",
    },
    body: data,
  });
  return response;
}
</script>

<style>
.topmarginbig {
  margin-top: 3em !important;
}
</style>