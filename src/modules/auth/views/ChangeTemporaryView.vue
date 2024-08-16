<template>

  <div style="height: 100vh; 
              background-image: url('https://images.unsplash.com/photo-1544213456-bc37cb97df74?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
               background-size: cover;">
    <div>
      <div>
        <b-navbar toggleable="lg" type="light" class="navbar px-4">
          <!-- Image and text of app -->
          <div class="d-flex">
            <img src="@/assets/image/Logo.png" class="logo-nav">
            <b-navbar-brand href="#" class="text-uppercase font-weight-bold text-secondary">musepa</b-navbar-brand>
          </div>


        </b-navbar>
      </div>
    </div>
    <div class="d-flex justify-content-center align-items-center" style="height: 70vh;">
      <div class="text-center">
        <b-card>

          <h1 class="mb-3">Cambiar contraseña temporal</h1>
          <p class="text-muted">Por favor, cambie su contraseña temporal por una nueva.</p>

          <form @submit.prevent="submit">
            <div class="form-group">
              <input type="password" class="form-control" placeholder="Contraseña temporal">
            </div>
            <div class="form-group">
              <input type="password" class="form-control" placeholder="Nueva contraseña">
            </div>
            <div class="form-group">
              <input type="password" class="form-control" placeholder="Confirmar nueva contraseña">
            </div>
            <b-button variant="secondary" block :disabled="false" type="submit">Cambiar contraseña</b-button>
          </form>
        </b-card>

      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'ChangeTemporaryView',
  data() {
    return {
      form: {
        password: '',
        newPassword: '',
        confirmNewPassword: ''
      }
    }
  },
  methods: {
    submit() {
      console.log('submit')
    }
  }

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