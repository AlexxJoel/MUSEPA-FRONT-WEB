<template>

  <div style="min-height: 100vh;
              background-image: url('https://images.unsplash.com/photo-1544213456-bc37cb97df74?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
               background-size: cover;">

    <loading-custom :isLoading="isLoading" />

    <div>
      <div>
        <b-navbar toggleable="lg" type="light" class="navbar px-4">
          <!-- Image and text of app -->
          <div class="d-flex">
            <img src="@/assets/image/Logo.png" class="logo-nav">
            <b-navbar-brand href="#" class="text-uppercase font-weight-bold text-secondary">musepa</b-navbar-brand>
          </div>
        </b-navbar>
      </div>
    </div>


    <b-popover id="popover-new-password" triggers="manual" target="new-password" placement="left">
      <div>
        <h6>Requisitos:</h6>
        <p v-for="(error) in v$.form.newPassword.$errors" :key="error.$uid" class="mb-0">
          <b-icon icon="exclamation-triangle" class="text-warning"></b-icon> {{ error.$message }}
        </p>
      </div>
    </b-popover>



    <div class="d-flex justify-content-center align-items-center">
      <b-card class="p-4 mt-5" style="width: 40rem;">
        <h1 class="mb-3">Cambiar contraseña temporal</h1>
        <p class="text-muted text-center">Por favor, cambie su contraseña temporal por una nueva.</p>

        <form @submit.prevent="submit">


          <b-form-group label="Nueva contraseña:*" label-for="new-password">
            <b-input-group>
              <b-form-input id="new-password" :type="showPasswordState.newPassword ? 'text' : 'password'"
                placeholder="*******" style="border-right: none !important" required
                v-model.trim="v$.form.newPassword.$model" trim :state="v$.form.newPassword.$dirty
                  ? !v$.form.newPassword.$error
                  : null
                  " @focus="handleFocusNewPassword" @blur="handleBlurNewPassword" @input="handleInputNewPassword">
              </b-form-input>
              <b-input-group-prepend>
                <span class="input-group-text" style="
                        background-color: white;
                        border-left: none !important;
                      " @click="showPasswordState.newPassword = !showPasswordState.newPassword" role="button">
                  <b-icon :icon="showPasswordState.newPassword ? 'eye-slash' : 'eye'"></b-icon>
                </span>
              </b-input-group-prepend>

            </b-input-group>
          </b-form-group>

          <b-form-group label="Confirmar nueva contraseña:*" label-for="confirm-new-password">
            <b-input-group>
              <b-form-input id="confirm-new-password" :type="showPasswordState.confirmNewPassword ? 'text' : 'password'"
                placeholder="*******" style="border-right: none !important" required
                v-model.trim="v$.form.confirmNewPassword.$model" trim :state="v$.form.confirmNewPassword.$dirty
                  ? !v$.form.confirmNewPassword.$error
                  : null
                  " @focus="handleFocusConfirmNewPassword" @blur="handleBlurConfirmNewPassword">
              </b-form-input>
              <b-input-group-prepend>
                <span class="input-group-text" style="
                        background-color: white;
                        border-left: none !important;
                      " @click="showPasswordState.confirmNewPassword = !showPasswordState.confirmNewPassword"
                  role="button">
                  <b-icon :icon="showPasswordState.confirmNewPassword ? 'eye-slash' : 'eye'"></b-icon>
                </span>
              </b-input-group-prepend>


              <b-form-invalid-feedback v-if="v$.form.confirmNewPassword.$errors.length > 0">
                {{ v$.form.confirmNewPassword.$errors[0].$message }}
              </b-form-invalid-feedback>

            </b-input-group>
          </b-form-group>


          <b-button block class="custom-button" type="submit" :disabled="v$.form.$invalid" variant="">
            Cambiar contraseña
          </b-button>

        </form>
      </b-card>
    </div>
  </div>
</template>

<script>
import useVuelidate from '@vuelidate/core';
import { required,  helpers } from '@vuelidate/validators';
import SweetAlertCustom from "../../../kernel/SweetAlertCustom";
import authController from "../services/controller/auth.controller";



export default {
  name: 'ChangeTemporaryView',
  components: {
    LoadingCustom: () => import("../../../views/components/LoadingCustom.vue"),
  },
  setup() {
    return {
      v$: useVuelidate(),
    };
  },  
  beforeRouteEnter(to, from, next) {
    if(localStorage.getItem('username') === null || localStorage.getItem('tempPassword') === null) {
      SweetAlertCustom.errorMessage('No se ha detectado un usuario o contraseña temporal');
      next({ name: "login" });
    }
    next();
  },
  data() {
    return {
      showPasswordState: {
        newPassword: false,
        confirmNewPassword: false
      },
      form: {
        newPassword: '',
        confirmNewPassword: ''
      },
      tooltipVisible: false,
      isLoading: false,

    };
  },
  validations() {
    return {
      form: {
        newPassword: {
          required: helpers.withMessage('La nueva contraseña es requerida', required),
          minLength: helpers.withMessage('La nueva contraseña debe tener al menos 8 caracteres', value => value.length >= 8),
          hasNumber: helpers.withMessage('La nueva contraseña debe contener al menos un número', value => /\d/.test(value)),
          hasLowercase: helpers.withMessage('La nueva contraseña debe contener al menos una letra minúscula', value => /[a-z]/.test(value)),
          hasUppercase: helpers.withMessage('La nueva contraseña debe contener al menos una letra mayúscula', value => /[A-Z]/.test(value)),
          hasSpecialChar: helpers.withMessage('La nueva contraseña debe contener al menos un carácter especial', value => /[^A-Za-z0-9]/.test(value))
        },
        confirmNewPassword: {
          checkIfNewPasswordIsFilled: helpers.withMessage('La nueva contraseña es requerida', value => this.form.newPassword !== ''),
          required: helpers.withMessage('La confirmación de la nueva contraseña es requerida', required),
          sameAsNewPassword: helpers.withMessage('Las contraseñas no coinciden', value => value === this.form.newPassword)
        }
      }
    };
  },
  methods: {
    handleFocusNewPassword() {
      this.v$.form.newPassword.$touch();
      if (this.v$.form.newPassword.$invalid) {
        this.$root.$emit('bv::show::popover', 'popover-new-password');
      }
    },
    handleBlurNewPassword() {
      this.$root.$emit('bv::hide::popover', 'popover-new-password');
      this.showPasswordState.newPassword = false;
    },
    handleInputNewPassword() {
      if (this.v$.form.newPassword.$invalid) {
        this.$root.$emit('bv::show::popover', 'popover-new-password');
      } else {
        this.$root.$emit('bv::hide::popover', 'popover-new-password');
      }
    },
    handleFocusConfirmNewPassword() {
      this.v$.form.confirmNewPassword.$touch();
    },
    handleBlurConfirmNewPassword() {
      this.showPasswordState.confirmNewPassword = false;
    },
    async submit() {
      this.v$.form.$touch();
      if (this.v$.form.$invalid) {
        SweetAlertCustom.invalidForm();
        return;
      }

      try {
        const payload = {
          username: localStorage.getItem('username'),
          temporaryPassword: localStorage.getItem('tempPassword'),
          newPassword: this.form.newPassword
        };

        const responseChangePwd = await this.requestChangePassword(payload);
        if (responseChangePwd) {
          SweetAlertCustom.successMessage("Contraseña cambiada correctamente", "Por favor, inicie sesión con su nueva contraseña");
          localStorage.clear();
          this.$router.push({ name: "login" });
        }else {
          SweetAlertCustom.errorMessage("No se ha podido cambiar la contraseña", "Por favor, intente nuevamente");
        }
      } catch (error) {
        SweetAlertCustom.error(error.response.data.message);
      }

    },
    async requestChangePassword(payload) {
      this.isLoading = true;
      let response;
      try {
        response = await authController.changePasswordTemporary(payload);
        console.log("response change pwd", response);
        return response.message === 'Password changed successfully.';
      } catch (error) {
        console.log("error", error);
        throw error;
      } finally {
        this.isLoading = false;
      }
    }
  }
};
</script>

<style scoped>
.navbar {
  background-color: #F2F2F2;
}

.logo-nav {
  width: 2rem;
  height: auto;
  margin-right: 10px;
  opacity: 0.8;
}

.tooltip-validation {
  background-color: #2c2c2c;
  color: white;
  max-width: 300px;
}

.tooltip-validation h6 {
  font-weight: bold;
  margin-bottom: 10px;
}

.tooltip-validation ul {
  padding-left: 15px;
}

.tooltip-validation li {
  margin-bottom: 5px;
}

.text-success {
  color: #28a745 !important;
}

.active-link {
  font-weight: bold;
  color: #007bff !important;
}

.is-invalid {
  border-color: #dc3545;
}
</style>
