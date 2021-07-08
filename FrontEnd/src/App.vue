<template>
  <div>
    <ul class="nav nav-fill nav-pills">
      <li class="nav-item">
        <router-link to="/dashboard" class="nav-link" aria-current="page">
        dashboard
        </router-link>
      </li>
      <li class="nav-item">
        <router-link to="/tasks" class="nav-link" aria-current="page">
          Todos
        </router-link>
      </li>
      <li class="nav-item">
        <router-link to="/notes" class="nav-link" aria-current="page">
          Notes
        </router-link>
      </li>
    </ul>
    <div class="container-fluid">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {};
  },
  components: {},
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
