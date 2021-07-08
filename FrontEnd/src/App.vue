<template>
  <div class="container-fluid p-0">
    <ul class="navbar-nav">
      <li class="nav-item">
        <a
          @click="currentComponent = 'dashboard'"
          class="nav-link active"
          aria-current="page"
          href="javascript:;"
          >Dashboard</a
        >
      </li>
      <li class="nav-item">
        <a
          @click="currentComponent = 'notes'"
          class="nav-link"
          href="javascript:;"
          >Notes</a
        >
      </li>
      <li class="nav-item">
        <a
          @click="currentComponent = 'tasks'"
          class="nav-link"
          href="javascript:;"
          >Tasks</a
        >
      </li>
    </ul>
    <div class="container-fluid">
      <component :is="currentComponent" />
    </div>
  </div>
</template>

<script>
import Tasks from "./components/todos/Todos.vue";
import Dashboard from "./components/dashboard/Dashboard.vue";
import Notes from "./components/notes/Notes.vue";

export default {
  name: "App",
  data() {
    return {
      currentComponent: "dashboard",
    };
  },
  components: {
    Tasks,
    Notes,
    Dashboard,
  },
};
</script>

<style>
.card {
  break-inside: avoid !important;
}
.card-columns {
  column-count: 4;
}
</style>
