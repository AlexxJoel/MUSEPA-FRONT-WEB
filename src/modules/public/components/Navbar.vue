<template>
  <div>
  <b-navbar toggleable="sm" type="light" variant="light">
    <b-navbar-toggle target="nav-text-collapse"></b-navbar-toggle>

    <b-navbar-brand>BootstrapVue</b-navbar-brand>

    <b-collapse id="nav-text-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-text>Navbar text</b-nav-text>
        <b-nav-item
            :to="{ name: 'login' }"
            class="mr-4 custom-link custom-nav-font"
            >Iniciar Sesión</b-nav-item
          >
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</div>
</template>

<script>
export default {
    name: "Navbar",
    
}
</script>