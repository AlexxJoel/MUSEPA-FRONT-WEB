<template>
  <div>
    <navbar @closeSession="closeSession" />
    <router-view></router-view>
  </div>
</template>
<script>
import Vue, { defineAsyncComponent } from "vue";
export default Vue.extend({
  name: "TemplateView",
  components: {
    Navbar: defineAsyncComponent(() =>
      import("./components/Navbar.vue")
    ),
  },
  methods: {
    closeSession() {
      localStorage.clear();

      this.$nextTick(() => {
        if (this.$route.name !== 'login') {
          this.$router.replace({ name: 'login' });
        }
      });
    },
  },
});
</script>