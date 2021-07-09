<template>
  <div>
    <ul class="nav nav-fill nav-pills">
      <li class="nav-item">
        <router-link to="/home" class="nav-link" aria-current="page">
        Home
        </router-link>
      </li>
      <li class="nav-item">
        <router-link to="/login" class="nav-link" aria-current="page">
        Login
        </router-link>
      </li>
      <li class="nav-item">
        <router-link to="/collagesandstudents" class="nav-link" aria-current="page">
          Colleges and students
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
