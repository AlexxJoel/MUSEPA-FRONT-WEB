<template>
  <div>
    <div>
      <b-navbar toggleable="lg" type="light" class="navbar px-4">


        <!-- Image and text of app -->
        <div class="d-flex">
          <img src="@/assets/image/Logo.png" class="logo-nav">
          <b-navbar-brand href="#" class="text-uppercase font-weight-bold text-secondary">musepa</b-navbar-brand>
        </div>


        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <!-- TODO Active the link when the route is the same as the current route -->
            <b-nav-item v-for="link in links" :key="link.name" :to="{ name: link.route }">
              <b-icon :icon="link.icon" class="mr-2"></b-icon>
              {{ link.name }}
            </b-nav-item>

          </b-navbar-nav>

          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
            <b-nav-item-dropdown v-if="isLogged" right>

              <!-- Using 'button-content' slot -->
              <template #button-content>
                <b-icon :icon="profile.icon" class="mr-2"></b-icon>
                <em>{{ profile.name }}</em>
              </template>
              <b-dropdown-item v-for="link in profile.links" :key="link.name" :to="{ name: link.route }">
                {{ link.name }}
              </b-dropdown-item>
            </b-nav-item-dropdown>
            <div v-else>
              <b-button v-for="link in noProfile.links" :key="link.name" :to="{ name: link.route }" variant="outline-secondary" class="mr-2">
                <b-icon :icon="link.icon" class="mr-2"></b-icon>
                {{ link.name }}
              </b-button>
            </div>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
  </div>
</template>





<script>
export default {
  name: "Navbar",
  data() {
    return {
      isLogged: false,
      links: [
        { name: "Inicio", route: "landing", icon: "house-fill" },
        { name: "Eventos", route: "public-events", icon: "calendar-fill" },
        { name: "Obras", route: "public-works", icon: "grid-fill" },
        { name: "Museo" , route: "public-museum", icon: "book-fill" }

      ],
      profile: {
        name: "Administrador",
        icon: "person-circle",
        links: [
          { name: "Perfil", route: "public-profile" },
          { name: "Cerrar sesión", route: "public-logout" },
        ],
      },
      noProfile: {
        links: [
          { name: "Registrarse", route: "create-account", icon: "box-arrow-up-right" },
          { name: "Iniciar sesión", route: "login", icon: "box-arrow-in-right" },
        ],
      },

    };
  },
  created() {
    this.handleIsLogged();
  },
  methods: {
    handleIsLogged() {
      //GET THE TOKEN FROM LOCAL STORAGE
      const token = localStorage.getItem("token");
      this.isLogged = !!token;
    },
  },
}
</script>


<style scoped>
.navbar {
  background-color: #F2F2F2;
}

.logo-nav {
  width: 2rem;
  height: auto;
  margin-right: 10px;
  opacity: 0.8;
}

.active-link {
  font-weight: bold;
  color: #007bff !important;
}
</style>