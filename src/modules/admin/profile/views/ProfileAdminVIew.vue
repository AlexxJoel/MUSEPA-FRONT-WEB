<template>
  <div>

    <section>
      <div style="
          background-image: url('https://images.unsplash.com/photo-1632749695402-660ab0b1cbb8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
          height: 25vh;
          background-size: cover;
          background-position: center;
        " class="d-flex justify-content-center align-items-center">
        <!-- center text in the middle of the screen -->
        <h1 class="p-0 m-0 font-weight-bold text-white">Perfil</h1>
      </div>
    </section>

    <div class="px-5 mt-2">
      <h1 class="my-3">
        <b-icon icon="building" class="mr-2"></b-icon>
        {{ museum.name ? museum.name : 'Museo' }}
      </h1>

      <b-card class="mx-5">
        <b-tabs fill>
          <b-tab title="Datos generales" active>

            <b-skeleton-wrapper :loading="isLoading">
              <template #loading>
                <div>
                  <p class="font-italic mt-3 m-0">Lugar:</p>
                  <b-skeleton height="30px" width="50%" class="rounded-0"></b-skeleton>

                  <p class="font-italic mt-3 m-0">Número telefónico:</p>
                  <b-skeleton height="30px" width="50%" class="rounded-0"></b-skeleton>

                  <p class="font-italic mt-3 m-0">Correo electrónico:</p>
                  <b-skeleton height="30px" width="50%" class="rounded-0"></b-skeleton>

                </div>
              </template>

              <div>
                <p class="font-italic mt-3 m-0">Lugar:</p>
                <p class="p-0 h4 font-weight-bold">
                  {{ museum.location }}
                </p>

                <p class="font-italic mt-3 m-0">Número telefónico:</p>
                <p class="p-0 h4 font-weight-bold">
                  {{ museum.contactNumber }}
                </p>

                <p class="font-italic mt-3 m-0">Correo electrónico:</p>
                <p class="p-0 h4 font-weight-bold">
                  {{ museum.contactEmail }}
                </p>
              </div>
            </b-skeleton-wrapper>
          </b-tab>
          <b-tab title="Tarifas"  :disabled="isLoading">
            <div>
              <b-table striped hover :items="Object.entries(this.museum.tariffs).map(([name, price]) => ({
                name,
                price,
              }))
                " :fields="fieldsTariffs">
                <template v-slot:cell(price)="data">
                  $ {{ data.item.price }}
                </template>
              </b-table>
            </div>
          </b-tab>
          <b-tab title="Horarios" :disabled="isLoading">
            <div>
              <b-table striped hover :items="Object.entries(this.museum.schedules).map(
                ([day, schedule]) => ({
                  day,
                  schedule,
                })
              )
                " :fields="fieldsSchedules">
                <template v-slot:cell(horario)="data">
                  {{ data.item.schedule }}
                </template>
              </b-table>
            </div>
          </b-tab>
          <b-tab title="Administrador" :disabled="isLoading">
            <b-row>
              <b-col sm="12" md="6">
                <div>
                  <p class="font-italic mt-3 m-0">Nombre:</p>
                  <p class="p-0 font-weight-bold h4">
                    {{ `${admin.name} ${admin.lastname} ${admin.surname}` }}
                  </p>

                  <p class="font-italic mt-3 m-0">Correo electrónico:</p>
                  <p class="p-0 font-weight-bold h4">
                    {{ admin.user.email }}
                  </p>

                  <p class="font-italic mt-3 m-0">Número telefónico:</p>
                  <p class="p-0 font-weight-bold h4">
                    {{ admin.phoneNumber }}
                  </p>
                </div>
              </b-col>
              <b-col sm="12" md="6">
                <div>
                  <p class="font-italic mt-3 m-0">Dirección:</p>
                  <p class="p-0 font-weight-bold h4">
                    {{ admin.address }}
                  </p>

                  <p class="font-italic mt-3 m-0">Fecha de nacimiento:</p>
                  <p class="p-0 font-weight-bold h4">
                    {{ admin.birthdate }}
                  </p>

                  <p class="font-italic mt-3 m-0">Nombre de usuario:</p>
                  <p class="p-0 font-weight-bold h4">
                    {{ admin.user.username }}
                  </p>
                </div>
              </b-col>
            </b-row>
          </b-tab>
        </b-tabs>

        <div class="mt-4 d-flex justify-content-end">
          <!--     <b-button
            variant=""
            class="mr-2"
            @click="$bvModal.show('modal-change-pwd')"
            >Cambiar contraseña</b-button
          > -->
          <b-button variant="" :to="{ name: 'admin-edit-profile' }">
            Actualizar información</b-button>
        </div>
      </b-card>
    </div>

    <!-- modal to change pwd -->
    <b-modal id="modal-change-pwd" title="Cambiar contraseña" hide-footer>
      <b-form @submit="changePwd">
        <b-form-group label="Contraseña actual:" label-for="currentPwd">
          <b-form-input id="currentPwd" v-model="changePwd.currentPwd" type="password" required></b-form-input>
        </b-form-group>

        <b-form-group label="Nueva contraseña:" label-for="newPwd">
          <b-form-input id="newPwd" v-model="changePwd.newPwd" type="password" required></b-form-input>
        </b-form-group>

        <b-form-group label="Confirmar contraseña:" label-for="confirmPwd">
          <b-form-input id="confirmPwd" v-model="changePwd.confirmPwd" type="password" required></b-form-input>
        </b-form-group>

        <b-button type="submit" variant="" block>Cambiar contraseña</b-button>
      </b-form>
    </b-modal>
  </div>
</template>

<script>
import Vue from "vue";
import profileController from "../services/controller/profile.controller";
import { getEmailFromAuth } from '../../../../kernel/fucntions';

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
        id: 0,
        name: "",
        location: '',
        contactEmail: '',
        contactNumber: '',
        tariffs: {
          Adulto: 0,
          Estudiante: 0,
          Niño: 0,
        },
        schedules: {},
      },
      admin: {
        id: 0,
        name: "",
        lastname: "",
        surname: "",
        phoneNumber: "",
        address: "",
        birthdate: "",
        idUser: 0,
        idMuseum: 1,
        user: {
          id: 0,
          email: "",
          password: "",
          username: "",
          idRole: 0,
        },
      },
      isLoading: false,
    };
  },
  mounted() {
    this.findManagerByEmail();
    this.findMuseumById();
  },
  methods: {
    async findManagerByEmail() {
      try {
        this.isLoading = true;
        const response = await profileController.findManagerByEmail({
          email: getEmailFromAuth()
        });
        this.admin = response;
      } catch (error) {
        console.log(error);
      } finally {
        this.isLoading = false;
      }
    },
    async findMuseumById() {
      try {
        this.isLoading = true;
        const response = await profileController.findMuseumById(1);
        this.museum = response;
      } catch (error) {
        console.log(error);
      } finally {
        this.isLoading = false;
      }
    },
    changePwd() {
      console.log(this.changePwd);
    },
  },
});
</script>

<style scoped>
.container {
  max-width: 600px;
}
</style>
