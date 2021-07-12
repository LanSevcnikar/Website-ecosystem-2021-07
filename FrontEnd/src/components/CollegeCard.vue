<template>
  <div class="card" style="width: 60%; margin: auto; margin-top: 3em">
    <div class="card-body">
      <div class="row">
        <div class="col-7">
          <h5 class="card-title">College card</h5>
          <h6 class="card-subtitle mb-2 text-muted">
            Get a list of all the colleges
          </h6>
        </div>
        <div class="col-5 text-center" allign="center" style="margin: auto">
          <button class="btn btn-primary" @click="getcollages">Get 'em</button>
        </div>
      </div>
      <college-item
        v-for="(coll, index) in colleges"
        :key="index"
        :rating="coll.rating"
        :name="coll.name"
        :location="coll.location"
      ></college-item>
    </div>
  </div>
</template>
<script>
import collegeItem from "./_collegeItem.vue";
import callAPI from "../functions/callAPI";

export default {
  components: {
    collegeItem,
  },
  data() {
    return {
      colleges: [],
    };
  },
  methods: {
    getcollages: async function () {
      this.colleges = [];
      const data = {
        query: `{
          getAllColleges {
            name
            location
            rating
          }
        }`,
      };
      const res = await callAPI(data);
      if (res.data.errors) alert(res.data.errors[0].message);
      else {
        if (res.status == 200) {
          res.data.data.getAllColleges.forEach((coll) => {
            this.colleges.push(coll);
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