<template>
  <div>


    <section>
      <div
        style="background-image: url('https://images.unsplash.com/photo-1632749695402-660ab0b1cbb8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'); height: 25vh; background-size: cover; background-position: center;"
        class="d-flex justify-content-center align-items-center">
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
                {{ museum.address }}
              </p>

              <p class="font-italic mt-3 m-0">Número telefónico:</p>
              <p class="p-0 font-weight-bold">
                {{ museum.phone }}
              </p>

              <p class="font-italic mt-3 m-0">Correo electrónico:</p>
              <p class="p-0 font-weight-bold">
                {{ museum.email }}
              </p>

            </div>
          </b-tab>
          <b-tab title="Tarifas">
            <div>
              <b-table striped hover :items="museum.tariffs" :fields="['name', 'price']">
                <template v-slot:cell(price)="data">
                  $ {{ data.value }}
                </template>
              </b-table>
            </div>
          </b-tab>
          <b-tab title="Horarios">
            <div>
              <b-table striped hover :items="museum.schedules" :fields="['day', 'open', 'close']">
                <template v-slot:cell(open)="data">
                  {{ data.value }} hrs
                </template>
                <template v-slot:cell(close)="data">
                  {{ data.value }} hrs
                </template>
              </b-table>
            </div>
          </b-tab>
          <b-tab title="Administrador">
            <div>
              <p class="font-italic mt-3 m-0">Nombre:</p>
              <p class="p-0 font-weight-bold">
                {{ admin.name }}
              </p>

              <p class="font-italic mt-3 m-0">Correo electrónico:</p>
              <p class="p-0 font-weight-bold">
                {{ admin.email }}
              </p>

              <p class="font-italic mt-3 m-0">Número telefónico:</p>
              <p class="p-0 font-weight-bold">
                {{ admin.phone }}
              </p>
            </div>
          </b-tab>
        </b-tabs>

        <div class="mt-4 d-flex justify-content-end">
          <b-button variant="primary" class="mr-2" @click="$bvModal.show('modal-change-pwd')">Cambiar contraseña</b-button>
          <b-button variant="primary" :to="{ name: 'admin-edit-profile' }">
            Actualizar información</b-button>
        </div>
      </b-card>
    </div>

    <!-- modal to change pwd -->
    <b-modal id="modal-change-pwd" title="Cambiar contraseña" hide-footer>
      <b-form @submit="changePwd">
        <b-form-group label="Contraseña actual:" label-for="currentPwd">
          <b-form-input id="currentPwd" v-model="currentPwd" type="password" required></b-form-input>
        </b-form-group>

        <b-form-group label="Nueva contraseña:" label-for="newPwd">
          <b-form-input id="newPwd" v-model="newPwd" type="password" required></b-form-input>
        </b-form-group>

        <b-form-group label="Confirmar contraseña:" label-for="confirmPwd">
          <b-form-input id="confirmPwd" v-model="confirmPwd" type="password" required></b-form-input>
        </b-form-group>

        <b-button type="submit" variant="" block>Cambiar contraseña</b-button>
      </b-form>
    </b-modal>

  </div>
</template>



<script>
export default {
  name: 'MuseoInfo',
  data() {
    return {
      museum: {
        name: 'Museo de Arte Moderno',
        address: 'Paseo de la Reforma 51, Bosque de Chapultepec, 11580 Ciudad de México, CDMX',
        phone: '+52 55 8647 5470',
        email: 'musepa@example.com',
        tariffs: [
          { name: 'General', price: 50 },
          { name: 'Estudiantes', price: 25 },
          { name: 'Maestros', price: 25 },
          { name: 'INAPAM', price: 25 },
        ],
        schedules: [
          { day: 'Lunes', open: '10:00', close: '18:00' },
          { day: 'Martes', open: '10:00', close: '18:00' },
          { day: 'Miércoles', open: '10:00', close: '18:00' },
          { day: 'Jueves', open: '10:00', close: '18:00' },
          { day: 'Viernes', open: '10:00', close: '18:00' },
          { day: 'Sábado', open: '10:00', close: '18:00' },
          { day: 'Domingo', open: '10:00', close: '18:00' },
        ]
      },
      admin: {
        name: 'Juan Pérez',
        email: 'juan@example.com',
        phone: '+52 55 1234 5678',
      },
      changePwd: {
        currentPwd: '',
        newPwd: '',
        confirmPwd: '',
      }
    };
  },
};
</script>

<style scoped>
.container {
  max-width: 600px;
}
</style>
