<template>
  <div class="px-5">
    <h1 class="text-center my-3">Bienvenido al panel de administración</h1>
    <b-row class="justify-content-center">
      <b-col md="6" v-for="(section, index) in sections" :key="index" class="mb-4">
        <b-card class="text-center shadow-sm">
          <b-icon :icon="section.icon" variant="" font-scale="3"></b-icon>
          <b-card-title class="mt-3">{{ section.title }}</b-card-title>
          <b-card-text>{{ section.description }}</b-card-text>
          <b-button :to="{ name: section.route }"
          variant="">Ir a {{ section.title }}</b-button>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  name: "HomeAdminView",
  components: {

  },
  data() {
    return {
      sections: [
        {
          title: 'Eventos',
          description: 'Administra los eventos de la plataforma',
          route: "admin-events",
          icon: 'calendar-fill'
        },
        {
          title: 'Obras',
          description: 'Administra las obras de la plataforma',
          route: 'admin-works',
          icon: 'grid-fill'
        },
        {
          title: 'Usuarios',
          description: 'Administra los usuarios de la plataforma',
          route: 'admin-users',
          icon: 'people-fill'
        },
        {
          title: 'Perfil',
          description: 'Administra tu perfil de usuario y museo',
          route: 'admin-profile',
          icon: 'person-circle'
        }
      ]

    };
  },
  mounted() {

  },
  methods: {

  }
}
</script>

<style scoped></style>