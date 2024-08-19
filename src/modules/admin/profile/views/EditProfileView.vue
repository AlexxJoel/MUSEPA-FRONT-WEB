<template>
  <div class="px-5 py-4 m-0">
    <loading-custom :isLoading="isLoading" />

    <section>
      <b-alert show variant="info" class="mb-4">
        <div class="d-flex justify-content-between align-items-center">
          <p>
            En esta sección puedes editar la información del perfil del museo y
            del administrador.
          </p>

          <p>
            Estas editando:
            <b> {{ isMuseum ? "Museo" : "Administrador" }}</b>
            <b-icon icon="info-circle" class="ml-2"></b-icon>
          </p>
        </div>
        <hr />
        <p>
          <b>Nota:</b> Al cambiar la información del perfil, esta se verá
          reflejada en la página de inicio del museo.
        </p>
      </b-alert>
    </section>

    <section class="d-flex justify-content-center align-items-center">
      <b-button
        :variant="isMuseum ? '' : 'outline-secondary'"
        class="mr-3"
        @click="isMuseum = true"
      >
        <b-icon icon="building" class="mr-2"></b-icon>
        {{ museum.name }}
      </b-button>

      <b-button
        :variant="isMuseum ? 'outline-secondary' : ''"
        @click="isMuseum = false"
      >
        <b-icon icon="person" class="mr-2"></b-icon>
        {{ admin.name }}
      </b-button>
    </section>

    <section id="museum" v-if="isMuseum">
      <b-form @submit.prevent="changePwd">
        <b-form-group label="Nombre del museo" label-for="museum-name">
          <b-form-input
            id="museum-name"
            v-model="museum.name"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group label="Dirección" label-for="museum-address">
          <b-form-input
            id="museum-address"
            v-model="museum.location"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group label="Teléfono" label-for="museum-phone">
          <b-form-input
            id="museum-phone"
            v-model="museum.contact_number"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group label="Correo electrónico" label-for="museum-email">
          <b-form-input
            id="museum-email"
            v-model="museum.contact_email"
            required
          ></b-form-input>
        </b-form-group>

        <!-- inline -->
        <div class="px-3 pt-3">
          <div class="form-inline d-flex justify-content-around">
            <label for="inline-form-input-price-adults" class="mr-2"
              >General:</label
            >
            <b-form-input
              id="inline-form-input-price-adults"
              v-model="museum.tariffs.Adulto"
              required
            ></b-form-input>

            <label for="inline-form-input-price-students" class="mx-2"
              >Estudiantes:</label
            >
            <b-form-input
              id="inline-form-input-price-students"
              v-model="museum.tariffs.Estudiante"
              required
            ></b-form-input>

            <label for="inline-form-input-price-teenagers" class="mx-2"
              >Menores:</label
            >
            <b-form-input
              id="inline-form-input-price-teenagers"
              v-model="museum.tariffs.Niño"
              required
            ></b-form-input>
          </div>
        </div>

        <h3>Horarios</h3>
        <p>
          <small class="text-muted">(Formato de 24 horas)</small>
        </p>
        <div class="px-3 pt-3">
          <div class="">
            <div
              class="form-group row"
              v-for="(schedule, index) in Object.entries(
                this.museum.schedules
              ).map(([day, horario]) => ({
                day,
                horario,
              }))"
              :key="index"
            >
              <label
                :for="'day' + schedule.day"
                class="col-sm-2 col-form-label font-weight-bold"
                >{{ schedule.day }}</label
              >

              <div class="col">
                <input
                  type="text"
                  class="form-control"
                  :id="'day' + schedule.day"
                  v-model="schedule.horario"
                  required
                />
                <small class="form-text text-muted"
                  >Horario (ej: 8:00 AM - 5:00 PM)</small
                >
              </div>
            </div>
          </div>
        </div>
        <div class="d-flex justify-content-end">
          <b-button type="submit" variant="" @click="updateMuseum">Guardar cambios</b-button>
        </div>
      </b-form>
    </section>

    <section id="admin" v-else>
      <b-form @submit.prevent="changePwd">
        <b-form-group label="Nombre del administrador" label-for="admin-name">
          <b-form-input
            id="admin-name"
            v-model="admin.name"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group label="Correo electrónico" label-for="admin-email">
          <b-form-input
            id="admin-email"
            v-model="admin.email"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group label="Número telefónico" label-for="admin-phone">
          <b-form-input
            id="admin-phone"
            v-model="admin.phone_number"
            required
          ></b-form-input>
        </b-form-group>

        <div class="d-flex justify-content-end">
          <b-button type="submit" variant="" @click="updateMuseum">Guardar cambios</b-button>
        </div>
      </b-form>
    </section>
  </div>
</template>

<script>
import Vue from "vue";
import { jwtDecode } from "jwt-decode";
import profileController from "../services/controller/profile.controller";
import SweetAlertCustom from "../../../../kernel/SweetAlertCustom";

export default Vue.extend({
  name: "EditProfileView",
  components: {
    SectionDivider: () => import("@/components/SectionDivider.vue"),
    LoadingCustom: () =>
      import("../../../../views/components/LoadingCustom.vue"),
  },
  data() {
    return {
      isLoading: false,
      isMuseum: true,

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
        name: "Juan Pérez",
        email: "juan@example.com",
        phone: "+52 55 1234 5678",
      },
    };
  },
  mounted() {
    this.findManagerByEmail();
  },
  methods: {
    changePwd() {
      console.log("changePwd");
    },
    async findManagerByEmail() {
      try {
        console.log("findManagerByEmail ayuya");
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
        console.log("museum aquiiiii", this.museum);
      } catch (error) {
        console.log(error);
      } finally {
        this.isLoading = false;
      }
    },
    async updateMuseum() {
      try {
        this.isLoading = true;
        const newPayload = {...this.museum, tariffs: JSON.stringify(this.museum.tariffs), schedules: JSON.stringify(this.museum.schedules)};
        const response = await profileController.updateMuseum(newPayload);
        if(response.message === "Museum updated successfully") {
          this.v$.museum.$reset();
          this.museum = {

          }
        }
        console.log("response", response);
        await SweetAlertCustom.successMessage();
        await this.$router.push({ name: "admin-profile" });
      } catch (error) {
        console.log(error);
      } finally {
        this.isLoading = false;
      }
    },
  },
});
</script>
