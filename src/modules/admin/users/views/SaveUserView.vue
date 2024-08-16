<template>
  <div>
    <loading-custom :isLoading="isLoading" />

    <b-row class="px-5 pt-3 m-0">
      <b-col cols="12">
        <!-- Card -->
        <b-card class="card">
          <h2>Crear Usuario</h2>

          <b-form>
            <b-row>
              <b-col cols="6">
                <h3>
                  <b-icon icon="person" class="mr-2"></b-icon>
                  Datos generales
                </h3>

                <b-row>
                  <b-col cols="12">
                    <b-form-group label="Nombre:*">
                      <b-form-input
                        id="name"
                        placeholder="Nombre"
                        type="text"
                        required
                        v-model.trim="v$.user.name.$model"
                        trim
                        :state="
                          v$.user.name.$dirty ? !v$.user.name.$error : null
                        "
                        @blur="v$.user.name.$touch()"
                      >
                      </b-form-input>
                      <b-form-invalid-feedback
                        tooltip
                        v-if="!v$.user.name.required.$response"
                        >{{ errorMessagges.required }}</b-form-invalid-feedback
                      >
                      <b-form-invalid-feedback
                        tooltip
                        v-else-if="!v$.user.name.valid.$response"
                        >{{ errorMessagges.valid }}</b-form-invalid-feedback
                      >
                      <b-form-invalid-feedback
                        tooltip
                        v-else-if="!v$.user.name.notScript.$response"
                        >{{
                          errorMessagges.noneScripts
                        }}</b-form-invalid-feedback
                      >
                      <b-form-invalid-feedback
                        tooltip
                        v-else-if="!v$.user.name.minLength.$response"
                        >{{ errorMessagges.minLength }}</b-form-invalid-feedback
                      >
                      <b-form-invalid-feedback
                        tooltip
                        v-else-if="!v$.user.name.maxLength.$response"
                        >{{ errorMessagges.maxLength }}</b-form-invalid-feedback
                      >
                    </b-form-group>
                  </b-col>

                  <b-col cols="12">
                    <b-form-group label="Primer apellido:*">
                      <b-form-input
                        id="lastname"
                        placeholder="Primer apellido"
                        type="text"
                        required
                        v-model.trim="v$.user.lastname.$model"
                        trim
                        :state="
                          v$.user.lastname.$dirty
                            ? !v$.user.lastname.$error
                            : null
                        "
                        @blur="v$.user.lastname.$touch()"
                      >
                      </b-form-input>
                      <b-form-invalid-feedback
                        tooltip
                        v-if="!v$.user.lastname.required.$response"
                        >{{ errorMessagges.required }}</b-form-invalid-feedback
                      >
                      <b-form-invalid-feedback
                        tooltip
                        v-else-if="!v$.user.lastname.valid.$response"
                        >{{ errorMessagges.valid }}</b-form-invalid-feedback
                      >
                      <b-form-invalid-feedback
                        tooltip
                        v-else-if="!v$.user.lastname.notScript.$response"
                        >{{
                          errorMessagges.noneScripts
                        }}</b-form-invalid-feedback
                      >
                      <b-form-invalid-feedback
                        tooltip
                        v-else-if="!v$.user.lastname.minLength.$response"
                        >{{ errorMessagges.minLength }}</b-form-invalid-feedback
                      >
                      <b-form-invalid-feedback
                        tooltip
                        v-else-if="!v$.user.lastname.maxLength.$response"
                        >{{ errorMessagges.maxLength }}</b-form-invalid-feedback
                      >
                    </b-form-group>
                  </b-col>

                  <b-col cols="12">
                    <b-form-group label="Segundo apellido:*">
                      <b-form-input
                        id="surname"
                        placeholder="Segundo apellido"
                        type="text"
                        required
                        v-model.trim="v$.user.surname.$model"
                        trim
                        :state="
                          v$.user.surname.$dirty
                            ? !v$.user.surname.$error
                            : null
                        "
                        @blur="v$.user.surname.$touch()"
                      >
                      </b-form-input>
                      <b-form-invalid-feedback
                        tooltip
                        v-if="!v$.user.surname.required.$response"
                        >{{ errorMessagges.required }}</b-form-invalid-feedback
                      >
                      <b-form-invalid-feedback
                        tooltip
                        v-else-if="!v$.user.surname.valid.$response"
                        >{{ errorMessagges.valid }}</b-form-invalid-feedback
                      >
                      <b-form-invalid-feedback
                        tooltip
                        v-else-if="!v$.user.surname.notScript.$response"
                        >{{
                          errorMessagges.noneScripts
                        }}</b-form-invalid-feedback
                      >
                      <b-form-invalid-feedback
                        tooltip
                        v-else-if="!v$.user.surname.minLength.$response"
                        >{{ errorMessagges.minLength }}</b-form-invalid-feedback
                      >
                      <b-form-invalid-feedback
                        tooltip
                        v-else-if="!v$.user.surname.maxLength.$response"
                        >{{ errorMessagges.maxLength }}</b-form-invalid-feedback
                      >
                    </b-form-group>
                  </b-col>
                </b-row>
              </b-col>

              <b-col cols="6">
                <h3>
                  <b-icon icon="lock" class="mr-2"></b-icon>
                  Datos de acceso
                </h3>

                <b-col cols="12">
                  <b-form-group label="Correo electrónico:*">
                    <b-form-input
                      id="email"
                      placeholder="Correo electrónico"
                      type="email"
                      required
                      v-model.trim="v$.user.email.$model"
                      trim
                      :state="
                        v$.user.email.$dirty ? !v$.user.email.$error : null
                      "
                      @blur="v$.user.email.$touch()"
                    >
                    </b-form-input>
                    <b-form-invalid-feedback
                      tooltip
                      v-if="!v$.user.email.required.$response"
                      >{{ errorMessagges.required }}</b-form-invalid-feedback
                    >
                    <b-form-invalid-feedback
                      tooltip
                      v-else-if="!v$.user.email.email.$response"
                      >{{
                        errorMessagges.invalidEmail
                      }}</b-form-invalid-feedback
                    >
                  </b-form-group>
                </b-col>

                <b-col cols="12">
                  <b-form-group label="Nombre de usuario:*">
                    <b-form-input
                      id="username"
                      placeholder="Nombre de usuario"
                      type="text"
                      required
                      v-model.trim="v$.user.username.$model"
                      trim
                      :state="
                        v$.user.username.$dirty
                          ? !v$.user.username.$error
                          : null
                      "
                      @blur="v$.user.username.$touch()"
                    >
                    </b-form-input>
                    <b-form-invalid-feedback
                      tooltip
                      v-if="!v$.user.username.required.$response"
                      >{{ errorMessagges.required }}</b-form-invalid-feedback
                    >
                    <b-form-invalid-feedback
                      tooltip
                      v-else-if="!v$.user.username.valid.$response"
                      >{{ errorMessagges.valid }}</b-form-invalid-feedback
                    >
                    <b-form-invalid-feedback
                      tooltip
                      v-else-if="!v$.user.username.notScript.$response"
                      >{{ errorMessagges.noneScripts }}</b-form-invalid-feedback
                    >
                    <b-form-invalid-feedback
                      tooltip
                      v-else-if="!v$.user.username.minLength.$response"
                      >{{ errorMessagges.minLength }}</b-form-invalid-feedback
                    >
                    <b-form-invalid-feedback
                      tooltip
                      v-else-if="!v$.user.username.maxLength.$response"
                      >{{ errorMessagges.maxLength }}</b-form-invalid-feedback
                    >
                  </b-form-group>
                </b-col>
              </b-col>
            </b-row>

            <div>
              <b-button variant="outline-secondary" block @click="saveUser">
                Guardar usuario
              </b-button>
            </div>
          </b-form>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>
<script>
import Vue from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required, helpers, email } from "@vuelidate/validators";
import { formatDate } from "../../../../kernel/moment";
import vue2Dropzone from "vue2-dropzone";
import "vue2-dropzone/dist/vue2Dropzone.min.css";
import SweetAlertCustom from "../../../../kernel/SweetAlertCustom";
import { generateRandomPassword } from "../../../../kernel/fucntions";

import usersController from "../services/controller/users.controller";

export default Vue.extend({
  name: "SaveWorkView",
  components: {
    vueDropzone: vue2Dropzone,
    SectionDivider: () => import("@/components/SectionDivider.vue"),
    LoadingCustom: () =>
      import("../../../../views/components/LoadingCustom.vue"),
  },
  setup() {
    return {
      v$: useVuelidate(),
    };
  },
  data() {
    return {
      isLoading: false,
      errorMessagges: {
        required: "Campo obligatorio",
        valid: "Caracteres no válidos",
        noneScripts: "No se permiten scripts",
        minLength: "Mínimo de caracteres no alcanzado",
        maxLength: "Máximo de caracteres excedido",
        invalidEmail: "Correo no válido",
      },

      user: {
        name: "",
        surname: "",
        lastname: "",
        email: "",
        username: "",
        password: "",
      },
    };
  },
  mounted() {},
  methods: {
    showPassword() {
      this.showPasswordState = !this.showPasswordState;
    },
    formatDate,
    async saveUser() {
      try {
        if (this.v$.user.$invalid) {
          SweetAlertCustom.invalidForm();
        } else {
          const result = await SweetAlertCustom.questionMessage();
          if (result.isConfirmed) {
            console.log("Guardando usuario");
            this.isLoading = true;

            const response = await usersController.saveUser(this.user);
            if (
              response.message ===
              "User created successfully, verification email sent."
            ) {
              // Limpiar el formulario
              this.user = {
                name: "",
                lastName: "",
                surname: "",
                email: "",
                username: "",
                // password: "",
                // confirmPassword: "",
              };
              this.v$.user.$reset();
              SweetAlertCustom.successMessage(
                "Éxito",
                "Usuario creado exitosamente, se ha enviado un correo de verificación."
              );
              // Redirigir a la página de inicio de sesión
              await this.$router.replace({ name: "users-list" });
            }
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
      user: {
        name: {
          required: helpers.withMessage(this.errorMessagges.required, required),
          valid: helpers.withMessage(this.errorMessagges.valid, (value) => {
            return /^[a-zA-Z\s]*$/.test(value);
          }),
          notScript: helpers.withMessage(
            this.errorMessagges.noneScripts,
            (value) => {
              return !/<script>/.test(value);
            }
          ),
          minLength: helpers.withMessage(
            this.errorMessagges.minLength,
            (value) => {
              return value.length >= 3;
            }
          ),
          maxLength: helpers.withMessage(
            this.errorMessagges.maxLength,
            (value) => {
              return value.length <= 50;
            }
          ),
        },
        lastname: {
          required: helpers.withMessage(this.errorMessagges.required, required),
          valid: helpers.withMessage(this.errorMessagges.valid, (value) => {
            return /^[a-zA-Z\s]*$/.test(value);
          }),
          notScript: helpers.withMessage(
            this.errorMessagges.noneScripts,
            (value) => {
              return !/<script>/.test(value);
            }
          ),
          minLength: helpers.withMessage(
            this.errorMessagges.minLength,
            (value) => {
              return value.length >= 3;
            }
          ),
          maxLength: helpers.withMessage(
            this.errorMessagges.maxLength,
            (value) => {
              return value.length <= 50;
            }
          ),
        },
        surname: {
          required: helpers.withMessage(this.errorMessagges.required, required),
          valid: helpers.withMessage(this.errorMessagges.valid, (value) => {
            return /^[a-zA-Z\s]*$/.test(value);
          }),
          notScript: helpers.withMessage(
            this.errorMessagges.noneScripts,
            (value) => {
              return !/<script>/.test(value);
            }
          ),
          minLength: helpers.withMessage(
            this.errorMessagges.minLength,
            (value) => {
              return value.length >= 3;
            }
          ),
          maxLength: helpers.withMessage(
            this.errorMessagges.maxLength,
            (value) => {
              return value.length <= 50;
            }
          ),
        },
        email: {
          required: helpers.withMessage(this.errorMessagges.required, required),
          email: helpers.withMessage(this.errorMessagges.invalidEmail, email),
        },
        username: {
          required: helpers.withMessage(this.errorMessagges.required, required),
          valid: helpers.withMessage(this.errorMessagges.valid, (value) => {
            return /^[a-zA-Z\s]*$/.test(value);
          }),
          notScript: helpers.withMessage(
            this.errorMessagges.noneScripts,
            (value) => {
              return !/<script>/.test(value);
            }
          ),
          minLength: helpers.withMessage(
            this.errorMessagges.minLength,
            (value) => {
              return value.length >= 3;
            }
          ),
          maxLength: helpers.withMessage(
            this.errorMessagges.maxLength,
            (value) => {
              return value.length <= 50;
            }
          ),
        },
      },
    };
  },
});
</script>

<style scoped>
.wallpaper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  opacity: 0.5;
}

h1 {
  color: white;
  text-align: center;
  margin-top: 10rem;
  font-size: 3rem;
}

.card {
  background-color: #f2f2f2;
}

.drag-area {
  border: 2px dashed #d3d3d3;
  border-radius: 10px;
  width: 100%;
  min-height: fit-content;
  height: 20vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  transition: background-color 0.2s ease-in-out;
}

.drag-area .icon {
  font-size: 50px;
  color: #333;
}
</style>
