<template>
  <div>
    <loading-custom :isLoading="isLoading" />

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
            <div>
              <p class="font-italic mt-3 m-0">Lugar:</p>
              <p class="p-0 font-weight-bold">
                {{ museum.location }}
              </p>

              <p class="font-italic mt-3 m-0">Número telefónico:</p>
              <p class="p-0 font-weight-bold">
                {{ museum.contact_number }}
              </p>

              <p class="font-italic mt-3 m-0">Correo electrónico:</p>
              <p class="p-0 font-weight-bold">
                {{ museum.contact_email }}
              </p>
            </div>
          </b-tab>
          <b-tab title="Tarifas">
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
          <b-tab title="Horarios">
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
          <b-tab title="Administrador">
            <b-row>
              <b-col sm="12" md="6">
                <div>
                  <p class="font-italic mt-3 m-0">Nombre:</p>
                  <p class="p-0 font-weight-bold">
                    {{ `${admin.name} ${admin.lastname} ${admin.surname}` }}
                  </p>

                  <p class="font-italic mt-3 m-0">Correo electrónico:</p>
                  <p class="p-0 font-weight-bold">
                    {{ admin.email }}
                  </p>

                  <p class="font-italic mt-3 m-0">Número telefónico:</p>
                  <p class="p-0 font-weight-bold">
                    {{ admin.phone_number }}
                  </p>
                </div></b-col
              >
              <b-col sm="12" md="6">
                <div>
                  <p class="font-italic mt-3 m-0">Dirección:</p>
                  <p class="p-0 font-weight-bold">
                    {{ admin.address }}
                  </p>

                  <p class="font-italic mt-3 m-0">Fecha de nacimiento:</p>
                  <p class="p-0 font-weight-bold">
                    {{ admin.birthdate }}
                  </p>

                  <p class="font-italic mt-3 m-0">Nombre de usuario:</p>
                  <p class="p-0 font-weight-bold">
                    {{ admin.username }}
                  </p>
                </div></b-col
              >
            </b-row>
          </b-tab>
        </b-tabs>

        <div class="mt-4 d-flex justify-content-end">
          <b-button
            variant="primary"
            class="mr-2"
            @click="$bvModal.show('modal-change-pwd')"
            >Cambiar contraseña</b-button
          >
          <b-button variant="primary" :to="{ name: 'admin-edit-profile' }">
            Actualizar información</b-button
          >
        </div>
      </b-card>
    </div>

    <!-- modal to change pwd -->
    <b-modal id="modal-change-pwd" title="Cambiar contraseña" hide-footer>
      <b-form @submit="changePwd">
        <b-form-group label="Contraseña actual:" label-for="currentPwd">
          <b-form-input
            id="currentPwd"
            v-model="changePwd.currentPwd"
            type="password"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group label="Nueva contraseña:" label-for="newPwd">
          <b-form-input
            id="newPwd"
            v-model="changePwd.newPwd"
            type="password"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group label="Confirmar contraseña:" label-for="confirmPwd">
          <b-form-input
            id="confirmPwd"
            v-model="changePwd.confirmPwd"
            type="password"
            required
          ></b-form-input>
        </b-form-group>

        <b-button type="submit" variant="" block>Cambiar contraseña</b-button>
      </b-form>
    </b-modal>
  </div>
</template>

<script>
import Vue from "vue";
import { jwtDecode } from "jwt-decode";
import profileController from "../services/controller/profile.controller";

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
        name: "Museo de Arte Moderno",
        address:
          "Paseo de la Reforma 51, Bosque de Chapultepec, 11580 Ciudad de México, CDMX",
        phone: "+52 55 8647 5470",
        email: "musepa@example.com",
        tariffs: [
          { name: "General", price: 50 },
          { name: "Estudiantes", price: 25 },
          { name: "Maestros", price: 25 },
          { name: "INAPAM", price: 25 },
        ],
        schedules: [
          { day: "Lunes", open: "10:00", close: "18:00" },
          { day: "Martes", open: "10:00", close: "18:00" },
          { day: "Miércoles", open: "10:00", close: "18:00" },
          { day: "Jueves", open: "10:00", close: "18:00" },
          { day: "Viernes", open: "10:00", close: "18:00" },
          { day: "Sábado", open: "10:00", close: "18:00" },
          { day: "Domingo", open: "10:00", close: "18:00" },
        ],
      },
      admin: {
        address: "",
        birthdate: "",
        id: "",
        id_museum: "",
        name: "",
        lastname: "",
        surname: "",
        phone_number: "",
        email: "",
        password: "",
        username: "",
      },
      changePwd: {
        currentPwd: "",
        newPwd: "",
        confirmPwd: "",
      },
      isLoading: false,
    };
  },
  mounted() {
    this.findManagerByEmail();
  },
  methods: {
    async findManagerByEmail() {
      try {
        this.isLoading = true;
        const decodedToken = jwtDecode(localStorage.getItem("token"));
        console.log(decodedToken);
        const response = await profileController.findManagerByEmail({
          email: decodedToken.email,
        });
        (this.admin = {
          address: response.address,
          birthdate: response.birthdate,
          id: response.id,
          id_museum: response.id_museum,
          name: response.name,
          lastname: response.lastname,
          surname: response.surname,
          phone_number: response.phone_number,
          email: response.user.email,
          password: response.user.password,
          username: response.user.username,
        }),
          console.log("response", response);
        await this.findMuseumById(response.id_museum);
      } catch (error) {
        console.log(error);
      } finally {
        this.isLoading = false;
      }
    },
    async findMuseumById(idMuseum) {
      try {
        this.isLoading = true;
        const response = await profileController.findMuseumById(idMuseum);
        console.log("response museum", response);
        this.museum = {
          ...response,
          tariffs: JSON.parse(response.tariffs),
          schedules: JSON.parse(response.schedules),
        };
        console.log("museum", this.museum);
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
