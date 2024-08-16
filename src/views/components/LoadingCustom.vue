<template>
    <loading-overlay :active="isLoading" :color="color" :loader="loader" :class="className" :is-full-page="fullPage" :can-cancel="canCancel" :use-slot="useSlot" :bg-color="bgColor" :height="height" :width="width" :timeout="timeout">
      <template v-slot:after><br />Cargando...</template>
    </loading-overlay>
  </template>
  
  <script>
  import Vue from "vue";
  export default Vue.extend({
    name: "LoadingCustom",
    props: {
      isLoading: {
        type: Boolean,
        default: false,
      },
      fullPage: {
        type: Boolean,
        default: false,
      },
      canCancel: {
        type: Boolean,
        default: true,
      },
      useSlot: {
        type: Boolean,
        default: true,
      },
      loader: {
        type: String,
        default: "spinner",
      },
      color: {
        type: String,
        default: "#007bff",
      },
      bgColor: {
        type: String,
        default: "#ffffff",
      },
      height: {
        type: Number,
        default: 100,
      },
      width: {
        type: Number,
        default: 100,
      },
      timeout: {
        type: Number,
        default: 3000,
      },
      loader: {
        type: String,
        default: "dots",
      },

    },
    data () {
      return {
        className: 'custom-loading-font',
      };
    },
  });
  </script>
  