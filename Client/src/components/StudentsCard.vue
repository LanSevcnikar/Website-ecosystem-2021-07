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
import callAPI from "../functions/callAPI";

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
    deleteMe: async function (index) {
      const data = {
        query: `
            mutation deleteStudent($id:ID!){
              deleteStudent(id:$id)
            }
          `,
        variables: {
          id: this.students[index].id,
        },
      };

      await callAPI(data);
      await this.getstudents();
    },

    getstudents: async function () {
      this.students = [];
      const data = {
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
      };
      const res = await callAPI(data);
      if (res.data.errors) alert(res.data.errors[0].message);
      else {
        if (res.status == 200) {
          res.data.data.getAllStudents.forEach((coll) => {
            const fullName = coll.fullName;
            const uni = coll.college ? coll.college.name : "";
            this.students.push({
              fullName: fullName,
              college: uni,
              email: coll.email,
              id: coll.id,
            });
          });
        } else alert("Response came back with status: ", res.status);
      }
    },
  },
};
</script>

<style>
.topmarginbig {
  margin-top: 3em !important;
}
</style>