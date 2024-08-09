<template>
  <section class="background-image overflow-hidden">
    <div class="overlay"></div>
    <div class="container px-4 py-5 px-md-5 text-lg-start my-5">
      <div class="row gx-lg-5 align-items-center mb-5">
        <!-- Lado izquierdo de la pantalla -->
        <div class="col-lg-6 mb-5 mb-lg-0" style="z-index: 10">
          <div
            class="text-center h-100 d-flex justify-content-center align-items-center"
          >
            <b-img
              src="/src/assets/image/LogoConNombre.png"
              fluid
              alt="LOGO-MUSEPA"
              width="280"
              class="mb-1"
              style="object-fit: contain"
            ></b-img>
          </div>
        </div>

        <!-- Lado derecho de la pantalla -->
        <div class="col-lg-6 mb-5 mb-lg-0 position-relative">
          <b-card
            class="h-100 overflow-auto px-3 py-3 px-md-4 rounded-lg"
            :style="{ backgroundColor: 'rgba(255, 255, 255, .7)' }"
          >
            <div class="h-100 p-2 pb-5">
              <form class="h-100">
                <!-- 2 column grid layout with text inputs for the first and last names -->
                <div class="row">
                  <!-- Nombre -->
                  <div class="col-md-12 mb-3">
                    <div>
                      <p class="text-center mb-4 create-account-title">Crear cuenta</p>
                    </div>
                    <b-form-group>
                      <b-form-input
                        id="name"
                        placeholder="Nombre"
                        type="text"
                        required
                        v-model.trim="v$.signUp.name.$model"
                        trim
                        :state="
                          v$.signUp.name.$dirty ? !v$.signUp.name.$error : null
                        "
                        @blur="v$.signUp.name.$touch()"
                      >
                      </b-form-input>
                      <b-form-invalid-feedback
                        tooltip
                        v-if="!v$.signUp.name.required.$response"
                        >{{ errorMessagges.required }}</b-form-invalid-feedback
                      >
                      <b-form-invalid-feedback
                        tooltip
                        v-else-if="!v$.signUp.name.valid.$response"
                        >{{ errorMessagges.valid }}</b-form-invalid-feedback
                      >
                      <b-form-invalid-feedback
                        tooltip
                        v-else-if="!v$.signUp.name.notScript.$response"
                        >{{
                          errorMessagges.noneScripts
                        }}</b-form-invalid-feedback
                      >
                      <b-form-invalid-feedback
                        tooltip
                        v-else-if="!v$.signUp.name.minLength.$response"
                        >{{ errorMessagges.minLength }}</b-form-invalid-feedback
                      >
                      <b-form-invalid-feedback
                        tooltip
                        v-else-if="!v$.signUp.name.maxLength.$response"
                        >{{ errorMessagges.maxLength }}</b-form-invalid-feedback
                      >
                    </b-form-group>
                  </div>
                  <!-- Apellido paterno -->
                  <div class="col-md-6 mb-3">
                    <b-form-group>
                      <b-form-input
                        id="surname"
                        placeholder="Primer apellido"
                        type="text"
                        required
                        v-model.trim="v$.signUp.surname.$model"
                        trim
                        :state="
                          v$.signUp.surname.$dirty
                            ? !v$.signUp.surname.$error
                            : null
                        "
                        @blur="v$.signUp.surname.$touch()"
                      >
                      </b-form-input>
                      <b-form-invalid-feedback
                        tooltip
                        v-if="!v$.signUp.surname.required.$response"
                        >{{ errorMessagges.required }}</b-form-invalid-feedback
                      >
                      <b-form-invalid-feedback
                        tooltip
                        v-else-if="!v$.signUp.surname.valid.$response"
                        >{{ errorMessagges.valid }}</b-form-invalid-feedback
                      >
                      <b-form-invalid-feedback
                        tooltip
                        v-else-if="!v$.signUp.surname.notScript.$response"
                        >{{
                          errorMessagges.noneScripts
                        }}</b-form-invalid-feedback
                      >
                      <b-form-invalid-feedback
                        tooltip
                        v-else-if="!v$.signUp.surname.minLength.$response"
                        >{{ errorMessagges.minLength }}</b-form-invalid-feedback
                      >
                      <b-form-invalid-feedback
                        tooltip
                        v-else-if="!v$.signUp.surname.maxLength.$response"
                        >{{ errorMessagges.maxLength }}</b-form-invalid-feedback
                      >
                    </b-form-group>
                  </div>
                  <!-- Apellido materno -->
                  <div class="col-md-6 mb-3">
                    <b-form-group>
                      <b-form-input
                        id="lastName"
                        placeholder="Segundo apellido"
                        type="text"
                        required
                        v-model.trim="v$.signUp.lastName.$model"
                        trim
                        :state="
                          v$.signUp.lastName.$dirty
                            ? !v$.signUp.lastName.$error
                            : null
                        "
                        @blur="v$.signUp.lastName.$touch()"
                      >
                      </b-form-input>
                      <b-form-invalid-feedback
                        tooltip
                        v-if="!v$.signUp.lastName.required.$response"
                        >{{ errorMessagges.required }}</b-form-invalid-feedback
                      >
                      <b-form-invalid-feedback
                        tooltip
                        v-else-if="!v$.signUp.lastName.valid.$response"
                        >{{ errorMessagges.valid }}</b-form-invalid-feedback
                      >
                      <b-form-invalid-feedback
                        tooltip
                        v-else-if="!v$.signUp.lastName.notScript.$response"
                        >{{
                          errorMessagges.noneScripts
                        }}</b-form-invalid-feedback
                      >
                      <b-form-invalid-feedback
                        tooltip
                        v-else-if="!v$.signUp.lastName.minLength.$response"
                        >{{ errorMessagges.minLength }}</b-form-invalid-feedback
                      >
                      <b-form-invalid-feedback
                        tooltip
                        v-else-if="!v$.signUp.lastName.maxLength.$response"
                        >{{ errorMessagges.maxLength }}</b-form-invalid-feedback
                      >
                    </b-form-group>
                  </div>
                  <!-- correo -->
                  <div class="col-md-12 mb-3">
                    <b-form-group>
                      <b-form-input
                        id="email"
                        placeholder="Correo electrónico"
                        type="email"
                        required
                        v-model.trim="v$.signUp.email.$model"
                        trim
                        :state="
                          v$.signUp.email.$dirty
                            ? !v$.signUp.email.$error
                            : null
                        "
                        @blur="v$.signUp.email.$touch()"
                      >
                      </b-form-input>
                      <b-form-invalid-feedback
                        tooltip
                        v-if="!v$.signUp.email.required.$response"
                        >{{ errorMessagges.required }}</b-form-invalid-feedback
                      >
                      <b-form-invalid-feedback
                        tooltip
                        v-else-if="!v$.signUp.email.email.$response"
                        >{{ errorMessagges.invalidEmail }}</b-form-invalid-feedback
                      >
                    </b-form-group>
                  </div>
                  <!-- contraseña -->
                  <div class="col-md-12 mb-3">
                    <b-form-group>
                      <b-form-input
                        id="password"
                        placeholder="Contraseña"
                        type="password"
                        required
                        v-model.trim="v$.signUp.password.$model"
                        trim
                        :state="
                          v$.signUp.password.$dirty
                            ? !v$.signUp.password.$error
                            : null
                        "
                        @blur="v$.signUp.password.$touch()"
                      >
                      </b-form-input>
                      <b-form-invalid-feedback
                        tooltip
                        v-if="!v$.signUp.password.required.$response"
                        >{{ errorMessagges.required }}</b-form-invalid-feedback
                      >
                      <b-form-invalid-feedback
                        tooltip
                        v-else-if="!v$.signUp.password.valid.$response"
                        >{{ errorMessagges.valid }}</b-form-invalid-feedback
                      >
                    </b-form-group>
                  </div>
                  <!-- confirmar contraseña -->
                  <div class="col-md-12 mb-3">
                    <b-form-group>
                      <b-form-input
                        id="confirmPassword"
                        placeholder="Confirmar contraseña"
                        type="password"
                        required
                        v-model.trim="v$.signUp.confirmPassword.$model"
                        trim
                        :state="
                          v$.signUp.confirmPassword.$dirty
                            ? !v$.signUp.confirmPassword.$error
                            : null
                        "
                        @blur="v$.signUp.confirmPassword.$touch()"
                      >
                      </b-form-input>
                      <b-form-invalid-feedback
                        tooltip
                        v-if="!v$.signUp.confirmPassword.required.$response"
                        >{{ errorMessagges.required }}</b-form-invalid-feedback
                      >
                      <b-form-invalid-feedback
                        tooltip
                        v-else-if="!v$.signUp.confirmPassword.valid.$response"
                        >{{ errorMessagges.valid }}</b-form-invalid-feedback
                      >
                    </b-form-group>
                  </div>
                </div>

                <!-- Submit button -->
               <div class="mt-3">
                <b-button class="bg-color mb-4" block>
                  Crear cuenta
                </b-button>
               </div>
              </form>
            </div>
          </b-card>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Vue from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required, helpers, email } from "@vuelidate/validators";

export default Vue.extend({
  name: "CreateAccountView",
  setup() {
    return {
      v$: useVuelidate(),
    };
  },
  data() {
    return {
      signUp: {
        name: "",
        lastName: "",
        surname: "",
        email: "",
        password: "",
        confirmPassword: "",
      },
      errorMessagges: {
        required: "Campo obligatorio",
        valid: "Caracteres no válidos",
        noneScripts: "No se permiten scripts",
        minLength: "Mínimo de caracteres no alcanzado",
        maxLength: "Máximo de caracteres excedido",
        invalidEmail: "Correo no válido",
      },
    };
  },
  methods: {
    showPassword() {
      this.showPasswordState = !this.showPasswordState;
    },
  },
  validations() {
    return {
      signUp: {
        name: {
          required: helpers.withMessage(this.errorMessagges.required, required),
          valid: helpers.withMessage(this.errorMessagges.valid, (value) => {
            return /^[a-zA-Z\s]*$/.test(value);
          }),
          notScript: helpers.withMessage(this.errorMessagges.noneScripts, (value) => {
            return !/<script>/.test(value);
          }),
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
        lastName: {
          required: helpers.withMessage(this.errorMessagges.required, required),
          valid: helpers.withMessage(this.errorMessagges.valid, (value) => {
            return /^[a-zA-Z\s]*$/.test(value);
          }),
          notScript: helpers.withMessage(this.errorMessagges.noneScripts, (value) => {
            return !/<script>/.test(value);
          }),
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
          notScript: helpers.withMessage(this.errorMessagges.noneScripts, (value) => {
            return !/<script>/.test(value);
          }),
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
        password: {
          required: helpers.withMessage("Campo obligatorio", required),
          valid: helpers.withMessage("Caracteres no válidos", (value) => {
            return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(value);
          }),
        },
        confirmPassword: {
          required: helpers.withMessage("Campo obligatorio", required),
          valid: helpers.withMessage("Caracteres no válidos", (value) => {
            return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(value);
          }),
        },
      },
    };
  },
});
</script>

<style scoped>
.background-image {
  position: relative;
  background-image: url("/src/assets/image/museum-mac.jpg");
  background-size: cover;
  background-position: center;
  min-height: 100vh;
  height: 100vh;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.1);
  z-index: 1;
}

.container {
  position: relative;
  z-index: 2;
  height: 100%; /* Asegura que el contenedor ocupe el 100% del alto disponible */
}

.row {
  height: 100%;
}

.col-lg-6 {
  height: 100%;
}

.b-card {
  height: 100%; /* La tarjeta ocupará el 100% del alto del contenedor */
  display: flex;
  flex-direction: column; /* Asegura que el contenido se organice verticalmente */
  overflow: hidden; /* Oculta el desbordamiento */
}
.b-card form {
  flex: 1; /* Permite que el formulario ocupe el espacio restante */
  overflow-y: auto; /* Agrega scroll interno solo cuando sea necesario */
}
</style>
