<template>
  <div>
    <loading-custom :isLoading="isLoading" />
    <div class="vh-100">
      <b-form @submit.prevent="sigin" class="row w-100 h-100">
        <div class="col-7 p-0 h-100">

          <!-- Arrow to back -->
          <div
            variant="link"
            class="position-absolute mx-4 mt-2 link-landing"
            @click="$router.replace({ name: 'landing' })"
          >

            <b-icon-arrow-left-circle font-scale="2"></b-icon-arrow-left-circle>
          </div>
          <b-img style="object-fit: cover; height: 100%; width: 100%" src="https://musepa-bucket-v2.s3.us-west-1.amazonaws.com/assets/museum-mac-2.jpg" fluid
            alt="Museum"></b-img>
        </div>
        <!-- lado derecho del login -->
        <div class="col-5 d-flex flex-column justify-content-center align-items-center">
          <!-- logo y nombre de la app -->
          <div class="text-center">
            <img src="@/assets/image/Logo.png"  alt="LOGO-MUSEPA" width="100" class="mb-1 img-fluid"></img>
            <p class="musepa-font">MUSEPA</p>
          </div>
          <div class="w-75">
            <b-form-group id="username-label" label="Nombre de usuario:" label-for="username">
              <b-input-group class="mb-3">
                <b-input id="username" placeholder="MickCR" type="text" required trim
                  v-model.trim="v$.signin.username.$model" :state="v$.signin.username.$dirty
                    ? !v$.signin.username.$error
                    : null
                    " @blur="v$.signin.username.$touch()"></b-input>
                <b-form-invalid-feedback v-for="error in v$.signin.username.$errors" :key="error.$uid">
                  {{ error.$message }}
                </b-form-invalid-feedback>
              </b-input-group>
            </b-form-group>
            <b-form-group id="password-label" label="Contraseña:" label-for="password">
              <b-input-group>
                <b-form-input id="password" :type="showPasswordState ? 'text' : 'password'" placeholder="Contraseña"
                  style="border-right: none !important" required v-model.trim="v$.signin.password.$model" trim :state="v$.signin.password.$dirty
                    ? !v$.signin.password.$error
                    : null
                    " @blur="v$.signin.password.$touch()">
                </b-form-input>
                <b-input-group-prepend>
                  <span class="input-group-text" style="
                        background-color: white;
                        border-left: none !important;
                      " @click="showPassword" role="button">
                    <b-icon :icon="showPasswordState ? 'eye-slash' : 'eye'"></b-icon>
                  </span>
                </b-input-group-prepend>
                <b-form-invalid-feedback v-for="error in v$.signin.password.$errors" :key="error.$uid">
                  {{ error.$message }}
                </b-form-invalid-feedback>
              </b-input-group>
            </b-form-group>
          </div>
          <div class="w-100 d-flex justify-content-center mt-3">
            <b-col cols="12" sm="6">
              <b-button block class="custom-button" type="submit" :disabled="v$.signin.$invalid" variant="">
                Iniciar sesión
              </b-button>
              <div class="text-center mt-2 mb-0">
                <b-link  class="text-muted"
                 :to="{ name: 'create-account' }">Crear cuenta</b-link>
              </div>
            </b-col>
          </div>
        </div>
      </b-form>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required, helpers } from "@vuelidate/validators";
import { jwtDecode } from "jwt-decode";
import SweetAlertCustom from "../../../kernel/SweetAlertCustom";
import authController from "../services/controller/auth.controller";
import { ERoles } from "../../../kernel/types";

export default Vue.extend({
  name: "LoginView",
  components: {
    LoadingCustom: () => import("../../../views/components/LoadingCustom.vue"),
  },
  setup() {
    return {
      v$: useVuelidate(),
    };
  },
  data() {
    return {
      showPasswordState: false,
      signin: {
        username: "",
        password: "",
      },
      isLoading: false,
    };
  },
  methods: {
    showPassword() {
      this.showPasswordState = !this.showPasswordState;
    },
    async sigin() {
      try {
        if (this.v$.signin.$invalid) {
          SweetAlertCustom.invalidForm();
        } else {
          this.isLoading = true;
          if (this.signin.email != "" && this.signin.password != "") {
            this.isLoading = true;
            const response = await authController.login(this.signin);
            if (response.data === null) {
              this.$emit("reloadFromLogin");
            }
            console.log("response para error", response.status);
            if (!response.status) {
              localStorage.setItem("token", response.id_token);
              localStorage.setItem("refreshToken", response.refresh_token);
              localStorage.setItem("accessToken", response.access_token);
              if (await this.checkNextRedirect())
                SweetAlertCustom.welcomeMessage();
            }
          }
        }
      } catch (error) {
        if (error.message === 'Access denied. Please, change the temporary password.') {
          localStorage.setItem("username", this.signin.username);
          localStorage.setItem("tempPassword", this.signin.password);
          this.$router.push({ name: "change-temporary-password" });
        }
      } finally {
        this.isLoading = false;
      }
    },
    async checkNextRedirect() {
      if (localStorage.token) {
        console.log("decoded token", jwtDecode(localStorage.token));
        const decodedToken = jwtDecode(localStorage.token);
        if (decodedToken["cognito:groups"][0] === ERoles.MANAGER) {
          await this.$router.replace({ name: "admin" });
          return true;
        } else if (decodedToken["cognito:groups"][0] === ERoles.VISITOR) {
          await this.$router.replace({ name: "visitor-profile" });
          return true;
        }
      }
    },
  },
  validations() {
    return {
      signin: {
        username: {
          required: helpers.withMessage("Campo obligatorio", required),
        },
        password: {
          required: helpers.withMessage("Campo obligatorio", required),
        },
      },
    };
  },
});
</script>

<style scoped>
.vh-100 {
  height: 100vh;
}

.img-fluid {
  object-fit: cover;
}
.link-landing {
  top: 1rem;
  left: 1rem;
  cursor: pointer;
  z-index: 1;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.3);
  }
}


</style>
