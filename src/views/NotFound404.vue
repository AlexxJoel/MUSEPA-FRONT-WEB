<template>
  <div class="vh-100 d-flex flex-column justify-content-center align-items-center bg-light">
    <div class="d-flex justify-content-center">
      <b-img
          src="https://media.tenor.com/bmhcts3-YcsAAAAi/a-404-error-404.gif"
          style="object-fit: none; object-position: center; margin-bottom: 0; height: 40vh; "

      >
      </b-img>
    </div>
    <div class="d-flex justify-content-center ">
      <div class="text-center not-registers-font mt-0">
        <div class="d-flex justify-content-center text-center not-registers-font mt-0">
          <p class="m-0 w-75 my-4 h2">Ay no! Al parecer no encontramos la página que buscas. No te preocupes, puedes regresar a
            la página anterior
            y seguir navegando.</p>
        </div>
        <button @click="goBack" class="btn btn-outline-secondary btn-lg">Regresar</button>
      </div>

    </div>
  </div>
</template>
<script>
import Vue from "vue";

export default Vue.extend({
  name: "NotFound404",
  methods: {
    goBack() {
      this.$router.go(-1);
    },
  },
});
</script>