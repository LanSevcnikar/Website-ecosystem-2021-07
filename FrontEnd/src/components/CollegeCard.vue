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
    getcollages() {
      this.colleges = [];
      const DD = JSON.stringify({
        query: `{
          getAllColleges {
            name
            location
            rating
          }
        }`,
      });
      callAPI("http://localhost:9000/graphql", DD, "")
        .then((r) => r.json())
        .then((data) => {
          data.data.getAllColleges.forEach((coll) => {
            this.colleges.push(coll);
          });
        });
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