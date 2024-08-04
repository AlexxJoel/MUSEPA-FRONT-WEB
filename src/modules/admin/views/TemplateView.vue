<template>
    <div>
      <navbar/>
      <router-view></router-view>
    </div>
  </template>
  <script>
  import Vue, { defineAsyncComponent } from "vue";
  export default Vue.extend({
    name: "TemplateView",
    components: {
      Navbar: defineAsyncComponent(() =>
        import("../components/Navbar.vue")
      ),
    },
  });
  </script>
   