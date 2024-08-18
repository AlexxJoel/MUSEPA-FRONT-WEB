<template>
  <div>
    <section>
      <div
        style="
          background-image: url('https://images.unsplash.com/photo-1632749695402-660ab0b1cbb8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
          height: 25vh;
          background-size: cover;
          background-position: center;
        "
        class="d-flex justify-content-center align-items-center"
      >
        <!-- center text in the middle of the screen -->
        <h1 class="p-0 m-0 font-weight-bold text-white">Perfil</h1>
      </div>
    </section>

    <div class="px-5 mt-2">
      <h1 class="my-3">
        <b-icon icon="building" class="mr-2"></b-icon>
        {{ museum.name }}
      </h1>

      <b-card class="mx-5">
        <b-tabs fill>
          <b-tab title="Datos generales" active>

            <b-skeleton-wrapper :loading="isLoading">
              <template #loading>
                <div>
                  <p class="font-italic mt-3 m-0">Nombre:</p>
                  <b-skeleton height="30px" width="100%"></b-skeleton>
                  <p class="font-italic mt-3 m-0">Dirección:</p>
                  <b-skeleton height="30px" width="100%"></b-skeleton>
                  <p class="font-italic mt-3 m-0">Número telefónico:</p>
                  <b-skeleton height="30px" width="100%"></b-skeleton>
                  <p class="font-italic mt-3 m-0">Correo electrónico:</p>
                  <b-skeleton height="30px" width="100%"></b-skeleton>
                </div>
              </template>

              <div>
              <p class="font-italic mt-3 m-0">Lugar:</p>
              <p class="p-0 h4 font-weight-bold">
                {{ museum.location }}
              </p>

              <p class="font-italic mt-3 m-0">Número telefónico:</p>
              <p class="p-0 h4 font-weight-bold">
                {{ museum.contact_number }}
              </p>

              <p class="font-italic mt-3 m-0">Correo electrónico:</p>
              <p class="p-0 h4 font-weight-bold">
                {{ museum.contact_email }}
              </p>
            </div>

            </b-skeleton-wrapper>
  
          </b-tab>
          <b-tab title="Tarifas" :disabled="isLoading">
            <div>
              <b-table
                striped
                hover
                :items="
                  Object.entries(this.museum.tariffs).map(([name, price]) => ({
                    name,
                    price,
                  }))
                "
                :fields="fieldsTariffs"
              >
                <template v-slot:cell(price)="data">
                  $ {{ data.item.price }}
                </template>
              </b-table>
            </div>
          </b-tab>
          <b-tab title="Horarios" :disabled="isLoading">
            <div>
              <b-table
                striped
                hover
                :items="
                  Object.entries(this.museum.schedules).map(
                    ([day, schedule]) => ({
                      day,
                      schedule,
                    })
                  )
                "
                :fields="fieldsSchedules"
              >
                <template v-slot:cell(horario)="data">
                  {{ data.item.schedule }}
                </template>
              </b-table>
            </div>
          </b-tab>
        </b-tabs>

      </b-card>
    </div>

  </div>
</template>

<script>
import Vue from "vue";
import { jwtDecode } from "jwt-decode";
import museumController from "../services/controller/museum.controller";

export default Vue.extend({
  name: "MuseoInfo",
  components: {
    LoadingCustom: () =>
      import("../../../../views/components/LoadingCustom.vue"),
  },
  data() {
    return {
      fieldsTariffs: [
        { key: "name", label: "Nombre" },
        { key: "price", label: "Precio" },
      ],
      fieldsSchedules: [
        { key: "day", label: "Día" },
        { key: "schedule", label: "Horario" },
      ],
      museum: {
        name: "",
        address:"",
        phone: "",
        email: "",
        tariffs: [],
        schedules: [],
      },
      isLoading: false,
    };
  },
  mounted() {
    this.findMuseumById(1);
  },
  methods: {
    async findMuseumById(id) {
      try {
        this.isLoading = true;
        const response = await museumController.findMuseumById(id);
        this.museum = response;
      } catch (error) {
        console.log(error);
      } finally {
        this.isLoading = false;
      }
    },
  },
});
</script>

<style scoped>
.container {
  max-width: 600px;
}
</style>
