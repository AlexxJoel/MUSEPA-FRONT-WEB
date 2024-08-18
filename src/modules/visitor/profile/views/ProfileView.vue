<template>
  <div>

    <section>
      <div style="
          background-image: url('https://images.unsplash.com/photo-1632749695402-660ab0b1cbb8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
          height: 12vh;
          background-size: cover;
          background-position: center;
        " class="d-flex justify-content-center align-items-center">
        <!-- center text in the middle of the screen -->
        <h1 class="p-0 m-0 font-weight-bold text-white">Perfil</h1>
      </div>
    </section>

    <div class="px-5 mt-2 d-flex justify-content-center">

      <b-card class="px-4 py-2 mt-5 " style="width: 45rem;">

        <div class="position-absolute" style="top: -60px; left: 45%;">
          <b-avatar variant="secondary" size="80" class="border border-dark">
          </b-avatar>
        </div>

        <h2 class="text-center">
          Información personal
        </h2>

        <b-skeleton-wrapper :loading="isLoading.general">
          <template #loading>
            <b-row>
              <b-col sm="12" md="6">
                <div>
                  <p class="font-italic mt-3 m-0">Nombre:</p>
                  <b-skeleton height="30px" width="100%"></b-skeleton>
                  <p class="font-italic mt-3 m-0">Apellido paterno:</p>
                  <b-skeleton height="30px" width="100%"></b-skeleton>
                  <p class="font-italic mt-3 m-0">Apellido materno:</p>
                  <b-skeleton height="30px" width="100%"></b-skeleton>
                </div>

              </b-col>

              <b-col sm="12" md="6">
                <div>
                  <p class="font-italic mt-3 m-0">Nombre de usuario:</p>
                  <b-skeleton height="30px" width="100%"></b-skeleton>
                  <p class="font-italic mt-3 m-0">Correo electrónico:</p>
                  <b-skeleton height="30px" width="100%"></b-skeleton>
                  <p class="font-italic mt-3 m-0">Actualmente cuentas con:</p>
                  <b-skeleton height="30px" width="100%"></b-skeleton>
                </div>
              </b-col>
            </b-row>

          </template>

          <b-row>
            <b-col sm="12" md="6">
              <div>
                <p class="font-italic mt-3 m-0">Nombre:</p>
                <p class="p-0 h4 font-weight-bold">
                  {{ visitor.name }}
                </p>

                <p class="font-italic mt-3 m-0">Apellido paterno:</p>
                <p class="p-0 h4 font-weight-bold">
                  {{ visitor.surname }}
                </p>

                <p class="font-italic mt-3 m-0">Apellido materno:</p>
                <p class="p-0 h4 font-weight-bold">
                  {{ visitor.lastname }}
                </p>
              </div>
            </b-col>
            <b-col sm="12" md="6">
              <div>
                <p class="font-italic mt-3 m-0">Nombre de usuario:</p>
                <p class="p-0 h4 font-weight-bold">
                  {{ visitor.user.username }}
                </p>

                <p class="font-italic mt-3 m-0">Correo electrónico:</p>
                <p class="p-0 h4 font-weight-bold">
                  {{ visitor.user.email }}
                </p>

                <p class="font-italic mt-3 m-0">Actualmente cuentas con:</p>
                <p class="p-0 h4 font-weight-bold">
                  {{ visitor.favorites?.length > 0 ? visitor.favorites.length : 0
                  }} favoritos
                </p>
              </div>
            </b-col>
          </b-row>

        </b-skeleton-wrapper>

        <!-- 
        <div>
          <b-table striped hover :items="visitor.favorites" :fields="fieldsFavorites">
            <template v-slot:cell(obra)="data">
              {{ data.item.name }}
            </template>
</b-table>
</div>
-->

        <!--         <div class="mt-4 d-flex justify-content-end">
          <b-button variant="primary" :to="{ name: 'visitor-edit-profile' }">
            Actualizar información
          </b-button>
        </div> -->
      </b-card>
    </div>
  </div>
</template>

<script>
import profileController from "../services/controller/profile.controller";
import { getEmailFromAuth } from "../../../../kernel/fucntions";

export default {
  name: "ProfileView",
  components: {
  },
  mounted() {
    this.findVisitorByEmail();
  },
  data() {
    return {
      isLoading: {
        general: false,
      },

      visitor: {
        id: 0,
        name: "",
        surname: "",
        lastname: "",
        favorites: null,
        idUser: 0,
        user: {
          id: 0,
          email: "",
          username: "",
          idRole: 0,
        },
      },
    };
  },
  methods: {
    async findVisitorByEmail() {
      try {
        this.isLoading.general = true;
        const response = await profileController.findVisitorByEmail(getEmailFromAuth());
        this.visitor = response;
      } catch (error) {
        console.log(error);
      } finally {
        this.isLoading.general = false;
      }
    },
  },
};

</script>

<style scoped></style>