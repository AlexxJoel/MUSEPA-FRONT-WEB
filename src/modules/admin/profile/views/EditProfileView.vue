<template>
  <div class="px-5 py-4 m-0">

    <section>
      <b-alert show variant="info" class="mb-4">
        <div class="d-flex justify-content-between align-items-center">
          <p class="m-0">
            En esta sección puedes editar la información del perfil del museo y
            del administrador.
          </p>

          <p class="m-0">
            Estas editando:
            <b> {{ isMuseum ? "Museo" : "Administrador" }}</b>
            <b-icon icon="info-circle" class="ml-2"></b-icon>
          </p>
        </div>
        <hr />
        <p class="m-0">
          <b>Nota:</b> Al cambiar la información del perfil, esta se verá
          reflejada en la página de inicio del museo.
        </p>
      </b-alert>
    </section>

    <section class="d-flex justify-content-center align-items-center">
      <b-button :variant="isMuseum ? '' : 'outline-secondary'" class="mr-3" @click="isMuseum = true">
        <b-icon icon="building" class="mr-2"></b-icon> Museo
      </b-button>

      <b-button :variant="isMuseum ? 'outline-secondary' : ''" @click="isMuseum = false">
        <b-icon icon="person" class="mr-2"></b-icon> Administrador
      </b-button>
    </section>

    <h4 class="border-bottom border-top py-2 mt-4 bg-light">
      {{ isMuseum ? "Información del museo" : "Información del administrador" }}
    </h4>

    <div>
      <loading-custom :isLoading="isLoading" :fullPage="false" />

      <section id="museum" v-if="isMuseum">
        <b-form @submit.prevent="updateMuseum">

          <b-row>
            <b-col cols="12" md="6">
              <b-form-group label="Nombre del museo:*" label-for="museum-name"
                label-class="font-italic font-weight-bold" label-align="left">
                <b-form-input size="sm" id="museum-name" placeholder="Nombre del museo" trim
                  :state="v$.museum.name.$dirty ? !v$.museum.name.$error : null" @blur="v$.museum.name.$touch()"
                  v-model="v$.museum.name.$model" required></b-form-input>

                <b-form-invalid-feedback v-for="error in v$.museum.name.$errors" :key="error.$uid">
                  {{ error.$message }}
                </b-form-invalid-feedback>

              </b-form-group>
            </b-col>

            <b-col cols="12" md="6">
              <b-form-group label="Dirección" label-for="museum-address" label-class="font-italic font-weight-bold"
                label-align="left">
                <b-form-input size="sm" id="museum-address" placeholder="Dirección del museo" trim
                  :state="v$.museum.location.$dirty ? !v$.museum.location.$error : null"
                  @blur="v$.museum.location.$touch()" v-model="v$.museum.location.$model" required></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>

          <b-row>
            <b-col cols="12" md="6">
              <b-form-group label="Teléfono" label-for="museum-phone" label-class="font-italic font-weight-bold"
                label-align="left">
                <b-form-input size="sm" id="museum-phone" placeholder="Teléfono del museo" trim
                  :state="v$.museum.contactNumber.$dirty ? !v$.museum.contactNumber.$error : null"
                  @blur="v$.museum.contactNumber.$touch()" v-model="v$.museum.contactNumber.$model"
                  required></b-form-input>
              </b-form-group>
            </b-col>

            <b-col cols="12" md="6">
              <b-form-group label="Correo electrónico" label-for="museum-email"
                label-class="font-italic font-weight-bold" label-align="left">
                <b-form-input size="sm" id="museum-email" placeholder="Correo electrónico del museo" trim
                  :state="v$.museum.contactEmail.$dirty ? !v$.museum.contactEmail.$error : null"
                  @blur="v$.museum.contactEmail.$touch()" v-model="v$.museum.contactEmail.$model"
                  required></b-form-input>

                <b-form-invalid-feedback v-for="error in v$.museum.contactEmail.$errors" :key="error.$uid">
                  {{ error.$message }}
                </b-form-invalid-feedback>
              </b-form-group>
            </b-col>
          </b-row>


          <h4 class="border-bottom border-top py-2 bg-light">

            Tarifas</h4>
          <p>
            <small class="text-muted">Precios en pesos mexicanos</small>
          </p>
          <!-- inline -->
          <div class="px-3 pt-3 mb-4">
            <div class="form-inline d-flex justify-content-around align-items-start">
              <div class="d-flex align-items-start">

                <label for="inline-form-input-price-adults" class="mr-2 font-weight-bold font-italic">General:</label>

                <div class="d-flex flex-column">
                  <b-form-input id="inline-form-input-price-adults" size="sm" placeholder="$0.00" trim
                    :state="v$.museum.tariffs.Adulto.$dirty ? !v$.museum.tariffs.Adulto.$error : null"
                    @blur="v$.museum.tariffs.Adulto.$touch()" v-model="v$.museum.tariffs.Adulto.$model"
                    required></b-form-input>

                  <b-form-invalid-feedback v-for="error in v$.museum.tariffs.Adulto.$errors" :key="error.$uid">
                    {{ error.$message }}
                  </b-form-invalid-feedback>
                </div>

              </div>

              <div class="d-flex align-items-start" style="height: 100%">
                <label for="inline-form-input-price-students"
                  class="mr-2 font-weight-bold font-italic">Estudiantes:</label>

                <div class="d-flex flex-column">
                  <b-form-input id="inline-form-input-price-students" size="sm" placeholder="$0.00" trim
                    :state="v$.museum.tariffs.Estudiante.$dirty ? !v$.museum.tariffs.Estudiante.$error : null"
                    @blur="v$.museum.tariffs.Estudiante.$touch()" v-model="v$.museum.tariffs.Estudiante.$model"
                    required></b-form-input>

                  <b-form-invalid-feedback v-for="error in v$.museum.tariffs.Estudiante.$errors" :key="error.$uid">
                    {{ error.$message }}
                  </b-form-invalid-feedback>
                </div>

              </div>

              <div class="d-flex align-items-start h-100">
                <label for="inline-form-input-price-children" class="mr-2 font-weight-bold font-italic">Niños:</label>

                <div class="d-flex flex-column">
                  <b-form-input id="inline-form-input-price-children" size="sm" placeholder="$0.00" trim
                    :state="v$.museum.tariffs.Niño.$dirty ? !v$.museum.tariffs.Niño.$error : null"
                    @blur="v$.museum.tariffs.Niño.$touch()" v-model="v$.museum.tariffs.Niño.$model"
                    required></b-form-input>

                  <b-form-invalid-feedback v-for="error in v$.museum.tariffs.Niño.$errors" :key="error.$uid">
                    {{ error.$message }}
                  </b-form-invalid-feedback>
                </div>
              </div>

            </div>
          </div>


          <h3 class="border-bottom border-top py-2 bg-light">
            Horarios</h3>
          <p>
            <small class="text-muted">(Formato de 24 horas)</small>
          </p>
          <div class="px-3 pt-3">
            <div class="row">
              <div class="col-4 mb-4  " v-for="(schedule, index) in Object.entries(
                this.museum.schedules
              ).map(([day, horario]) => ({
                day,
                horario,
              }))" :key="index">


                <label :for="'day' + schedule.day" class="font-weight-bold">{{ schedule.day
                  }}:*</label>

                <div class="col">
                  <b-form-input type="text" class="form-control" :id="'day' + schedule.day" v-model="schedule.horario"
                    @input="museum.schedules[schedule.day] = schedule.horario" :state="!schedule.horario ? false : null"
                    required />
                  <small class="form-text text-muted">Horario (ej: 8:00 AM - 5:00 PM)</small>

                  <!-- required -->
                  <p class="text-danger" v-if="!schedule.horario">
                    Campo obligatorio
                  </p>
                </div>
              </div>


            </div>
          </div>
          <div class="d-flex justify-content-end">
            <b-button type="submit" variant="">Guardar cambios</b-button>
          </div>
        </b-form>
      </section>

      <section id="admin" v-else>
        <b-form @submit.prevent="updateAdmin">
          <b-row>
            <b-col cols="12" md="6">
              <b-form-group label="Nombre del administrador:*" label-for="admin-name"
                label-class="font-italic font-weight-bold" label-align="left">
                <b-form-input size="sm" id="admin-name" placeholder="Nombre del administrador" trim
                  :state="v$.admin.name.$dirty ? !v$.admin.name.$error : null" @blur="v$.admin.name.$touch()"
                  v-model="v$.admin.name.$model" required></b-form-input>

                <b-form-invalid-feedback v-for="error in v$.admin.name.$errors" :key="error.$uid">
                  {{ error.$message }}
                </b-form-invalid-feedback>
              </b-form-group>
            </b-col>

            <b-col cols="12" md="6">
              <b-form-group label="Apellido paterno:*" label-for="admin-lastname"
                label-class="font-italic font-weight-bold" label-align="left">
                <b-form-input size="sm" id="admin-lastname" placeholder="Apellido paterno" trim
                  :state="v$.admin.lastname.$dirty ? !v$.admin.lastname.$error : null"
                  @blur="v$.admin.lastname.$touch()" v-model="v$.admin.lastname.$model" required></b-form-input>

                <b-form-invalid-feedback v-for="error in v$.admin.lastname.$errors" :key="error.$uid">
                  {{ error.$message }}
                </b-form-invalid-feedback>
              </b-form-group>

            </b-col>
          </b-row>

          <b-row>
            <b-col cols="12" md="6">
              <b-form-group label="Apellido materno:*" label-for="admin-surname"
                label-class="font-italic font-weight-bold" label-align="left">
                <b-form-input size="sm" id="admin-surname" placeholder="Apellido materno" trim
                  :state="v$.admin.surname.$dirty ? !v$.admin.surname.$error : null" @blur="v$.admin.surname.$touch()"
                  v-model="v$.admin.surname.$model" required></b-form-input>

                <b-form-invalid-feedback v-for="error in v$.admin.surname.$errors" :key="error.$uid">
                  {{ error.$message }}
                </b-form-invalid-feedback>
              </b-form-group>
            </b-col>

            <b-col cols="12" md="6">
              <b-form-group label="Teléfono:*" label-for="admin-phone" label-class="font-italic font-weight-bold"
                label-align="left">
                <b-form-input size="sm" id="admin-phone" placeholder="Teléfono del administrador" trim
                  :state="v$.admin.phoneNumber.$dirty ? !v$.admin.phoneNumber.$error : null"
                  @blur="v$.admin.phoneNumber.$touch()" v-model="v$.admin.phoneNumber.$model" required></b-form-input>

                <b-form-invalid-feedback v-for="error in v$.admin.phoneNumber.$errors" :key="error.$uid">
                  {{ error.$message }}
                </b-form-invalid-feedback>
              </b-form-group>
            </b-col>

          </b-row>

          <b-row>
            <b-col cols="12" md="6">
              <b-form-group label="Dirección:*" label-for="admin-address" label-class="font-italic font-weight-bold"
                label-align="left">
                <b-form-input size="sm" id="admin-address" placeholder="Dirección del administrador" trim
                  :state="v$.admin.address.$dirty ? !v$.admin.address.$error : null" @blur="v$.admin.address.$touch()"
                  v-model="v$.admin.address.$model" required></b-form-input>

                <b-form-invalid-feedback v-for="error in v$.admin.address.$errors" :key="error.$uid">
                  {{ error.$message }}
                </b-form-invalid-feedback>
              </b-form-group>
            </b-col>

            <b-col cols="12" md="6">
              <b-form-group label="Fecha de nacimiento:*" label-for="admin-birthdate"
                label-class="font-italic font-weight-bold" label-align="left">
                <b-form-input size="sm" id="admin-birthdate" placeholder="Fecha de nacimiento" trim
                  :state="v$.admin.birthdate.$dirty ? !v$.admin.birthdate.$error : null"
                  @blur="v$.admin.birthdate.$touch()" v-model="v$.admin.birthdate.$model" required></b-form-input>

                <b-form-invalid-feedback v-for="error in v$.admin.birthdate.$errors" :key="error.$uid">
                  {{ error.$message }}
                </b-form-invalid-feedback>
              </b-form-group>
            </b-col>

          </b-row>

          <b-row>
            <b-col cols="12">
              <b-form-group label="Correo electrónico:*" label-for="admin-email"
                label-class="font-italic font-weight-bold" label-align="left">
                <b-form-input size="sm" id="admin-email" placeholder="Correo electrónico del administrador" trim
                  :state="v$.admin.user.email.$dirty ? !v$.admin.user.email.$error : null"
                  @blur="v$.admin.user.email.$touch()" v-model="v$.admin.user.email.$model" required></b-form-input>

                <b-form-invalid-feedback v-for="error in v$.admin.user.email.$errors" :key="error.$uid">
                  {{ error.$message }}
                </b-form-invalid-feedback>
              </b-form-group>
            </b-col>

          </b-row>

          <div class="d-flex justify-content-end">
            <b-button type="submit" variant="">Guardar cambios</b-button>
          </div>



        </b-form>
      </section>
    </div>


  </div>
</template>

<script>
import Vue from "vue";
import profileController from "../services/controller/profile.controller";
import useVuelidate from '@vuelidate/core';
import { decimal, email, helpers, required } from '@vuelidate/validators';
import SweetAlertCustom from '../../../../kernel/SweetAlertCustom';
import { getEmailFromAuth } from '../../../../kernel/fucntions';

export default Vue.extend({
  name: "EditProfileView",
  components: {
    SectionDivider: () => import("@/components/SectionDivider.vue"),
    LoadingCustom: () =>
      import("../../../../views/components/LoadingCustom.vue"),
  },
  setup() {
    return {
      v$: useVuelidate(),
    };
  },
  mounted() {
    this.findMuseumById();
  },
  watch: {
    isMuseum() {
      if (this.isMuseum) {
        this.findMuseumById();
      } else {
        this.findManagerByEmail();
      }
      this.v$.museum.$reset();
      this.v$.admin.$reset();
    },
  },
  data() {
    return {
      isLoading: false,
      isMuseum: true,

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
    };
  },

  methods: {
    async findMuseumById() {
      try {
        this.isLoading = true;
        const response = await profileController.findMuseumById(1);
        this.museum = response
      } catch (error) {
        console.log(error);
      } finally {
        this.isLoading = false;
      }
    },
    async updateMuseum() {
      try {
        if (this.v$.museum.$invalid) {
          SweetAlertCustom.invalidForm();
        } else {
          this.isLoading = true;
          const response = await profileController.updateMuseum(this.museum);

          if (response === 'Museum updated successfully') {
            SweetAlertCustom.successMessage("Museo actualizado correctamente");
            this.findMuseumById();
          } else {
            SweetAlertCustom.errorMessage("Error al actualizar el museo");
          }
        }
      } catch (error) {
        console.log(error);
      } finally {
        this.isLoading = false;
      }
    },
    async findManagerByEmail() {
      try {
        this.isLoading = true;
        const response = await profileController.findManagerByEmail({ email: getEmailFromAuth() });
        this.admin = response;
      } catch (error) {
        console.log(error);
      } finally {
        this.isLoading = false;
      }
    },
    async updateAdmin() {
      try {
        if (this.v$.admin.$invalid) {
          SweetAlertCustom.invalidForm();
        } else {
          this.isLoading = true;
          const response = await profileController.updateManager(this.admin);


          if (response && response.message === 'Manager updated successfully.') {
            SweetAlertCustom.successMessage("Administrador actualizado correctamente");
          } else {
            SweetAlertCustom.errorMessage("Error al actualizar el administrador");
          }
        }
      } catch (error) {
        console.log(error);
      } finally {
        this.isLoading = false;
      }
    },

  },

  validations() {
    return {
      museum: {
        name: { required: helpers.withMessage("Campo Obligatorio", required) },
        location: { required: helpers.withMessage("Campo Obligatorio", required) },
        contactNumber: { required: helpers.withMessage("Campo Obligatorio", required) },
        contactEmail: {
          required: helpers.withMessage("Campo Obligatorio", required),
          email: helpers.withMessage("Correo no valido", email),
        },
        tariffs: {
          Adulto: {
            required: helpers.withMessage("Campo Obligatorio", required),
            decimal: helpers.withMessage("Datos incorrecto, solo se aceptan números", decimal),

          },
          Estudiante: {
            required: helpers.withMessage("Campo Obligatorio", required),
            decimal: helpers.withMessage("Datos incorrecto, solo se aceptan números", decimal),
          },
          Niño: {
            required: helpers.withMessage("Campo Obligatorio", required),
            decimal: helpers.withMessage("Datos incorrecto, solo se aceptan números", decimal),
          }
        },
        schedules: {
          required: helpers.withMessage("Campo Obligatorio", required),
        },
      },
      admin: {
        name: { required: helpers.withMessage("Campo Obligatorio", required) },
        lastname: { required: helpers.withMessage("Campo Obligatorio", required) },
        surname: { required: helpers.withMessage("Campo Obligatorio", required) },
        phoneNumber: { required: helpers.withMessage("Campo Obligatorio", required) },
        address: { required: helpers.withMessage("Campo Obligatorio", required) },
        birthdate: { required: helpers.withMessage("Campo Obligatorio", required) },
        user: {
          email: {
            required: helpers.withMessage("Campo Obligatorio", required),
            email: helpers.withMessage("Correo no valido", email),
          }
        }
      },
    };
  },
});
</script>
