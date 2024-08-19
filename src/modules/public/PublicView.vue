<template>
  <div>
    <navbar-visitor v-if="isLogged" @closeSession="closeSession" />
    <navbar-general v-else @closeSession="closeSession" />
    <div class="rest-of-the-page">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { defineAsyncComponent } from "vue";

export default {
  name: "PublicView",
  data() {
    return {
      isLogged: false,
    };
  },
  created() {
    const token = localStorage.getItem("token");
    this.isLogged = !!token;
  },
  components: {
    NavbarGeneral: defineAsyncComponent(() =>
      import("./components/Navbar.vue")
    ),
    NavbarVisitor: defineAsyncComponent(() =>
      import("../visitor/components/Navbar.vue")
    ),
  },
  methods: {
    closeSession() {
      localStorage.clear();
      this.isLogged = false;
      this.$nextTick(() => {
        if (this.$route.name !== "landing") {
          this.$router.replace({ name: "landing" });
        }
      });
    },
  },
};
</script>

<style scoped>
.rest-of-the-page {
  min-height: 91vh;
  background-color: #f2f2f2;
}
</style>
