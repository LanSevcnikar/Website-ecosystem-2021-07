<template>
  <div style="background-color: red">
    <p>Colleges</p>
    <router-link to="/notes/new"> Add College </router-link>
    <router-link
      v-for="(coll, index) in notes"
      :key="index"
      :to="'/notes/edit/'+coll.id"
    >
      <note
        :coll="coll"
      ></note>
    </router-link>
  </div>
</template>

<script>
import Note from "./Note.vue";

export default {
  components: {
    Note,
  },
  data() {
    return {
      notes: [
        {
          id: "col-101",
          name: "AMU",
          location: "Uttar Pradesh",
          rating: 5.0,
        },
        {
          id: "col-102",
          name: "CUSAT",
          location: "Kerala",
          rating: 4.5,
        },
        {
          id: "col-103",
          name: "Harvard",
          location: "Sometwhere",
          rating: 4.8,
        },
      ],
    };
  },
  methods: {
    edit(id) {
      console.log(id);
    },
    allNotes(){
      return this.notes;
    }
  },
};
</script>

<style>
</style>