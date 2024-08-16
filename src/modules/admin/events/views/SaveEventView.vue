<template>
  <div>
    <loading-custom :isLoading="isLoading" />

    <b-row class="px-5 pt-3 m-0">
      <b-col cols="6">
        <!-- Card -->

        <b-card class="card">
          <h2>Crear Evento</h2>

          <b-form>
            <b-row>
              <b-col cols="6">
                <b-form-group label="Nombre del evento:*" label-for="name">
                  <b-form-input
                    id="name"
                    v-model.trim="v$.event.name.$model"
                    :state="v$.event.name.$dirty ? !v$.event.name.$error : null"
                    @blur="v$.event.name.$touch()"
                    required
                    placeholder="Nombre del evento"
                  ></b-form-input>
                  <b-form-invalid-feedback
                    v-for="error in v$.event.name.$errors"
                    :key="error.$uid"
                    >{{ error.$message }}</b-form-invalid-feedback
                  >
                </b-form-group>
              </b-col>
              <b-col cols="6">
                <b-form-group label="Categoria:*" label-for="category">
                  <b-form-select
                    v-model="v$.event.category.$model"
                    :state="
                      v$.event.category.$dirty
                        ? !v$.event.category.$error
                        : null
                    "
                    @blur="v$.event.category.$touch()"
                    :options="listCategories"
                  ></b-form-select>
                  <b-form-invalid-feedback
                    v-for="error in v$.event.category.$errors"
                    :key="error.$uid"
                    >{{ error.$message }}</b-form-invalid-feedback
                  >
                </b-form-group>
              </b-col>
            </b-row>

            <b-row>
              <b-col cols="6">
                <b-form-group label="Fecha de incio:*" label-for="startDate">
                  <b-form-datepicker
                    id="startDate"
                    v-model="v$.event.startDate.$model"
                    :state="
                      v$.event.startDate.$dirty
                        ? !v$.event.startDate.$error
                        : null
                    "
                    @blur="v$.event.startDate.$touch()"
                    @hide="v$.event.startDate.$touch()"
                    class="mb-2"
                    label-no-date-selected="Seleccione una fecha"
                    label-help=""
                  ></b-form-datepicker>
                  <b-form-invalid-feedback
                    v-for="error in v$.event.startDate.$errors"
                    :key="error.$uid"
                    >{{ error.$message }}</b-form-invalid-feedback
                  >
                </b-form-group>
              </b-col>
              <b-col cols="6">
                <b-form-group label="Fecha de fin:*" label-for="endDate">
                  <b-form-datepicker
                    id="endDate"
                    v-model="v$.event.endDate.$model"
                    :state="
                      v$.event.endDate.$dirty ? !v$.event.endDate.$error : null
                    "
                    @blur="v$.event.endDate.$touch()"
                    @hide="v$.event.endDate.$touch()"
                    class="mb-2"
                    label-no-date-selected="Seleccione una fecha"
                    label-help=""
                  ></b-form-datepicker>
                  <b-form-invalid-feedback
                    v-for="error in v$.event.endDate.$errors"
                    :key="error.$uid"
                    >{{ error.$message }}</b-form-invalid-feedback
                  >
                </b-form-group>
              </b-col>
            </b-row>

            <b-row>
              <b-col cols="12">
                <b-form-group label="Descripción:*" label-for="description">
                  <b-form-input
                    id="description"
                    v-model="v$.event.description.$model"
                    :state="
                      v$.event.description.$dirty
                        ? !v$.event.description.$error
                        : null
                    "
                    @blur="v$.event.description.$touch()"
                    required
                    placeholder="Descripción del evento"
                  ></b-form-input>
                  <b-form-invalid-feedback
                    v-for="error in v$.event.description.$errors"
                    :key="error.$uid"
                    >{{ error.$message }}</b-form-invalid-feedback
                  >
                </b-form-group>
              </b-col>
            </b-row>

            <div>
              <b-button variant="outline-secondary" block @click="saveEvent">
                Guardar evento
              </b-button>
            </div>
          </b-form>
        </b-card>
      </b-col>
      <b-col cols="6">
        <SectionDivider>
          <template v-slot:title> Imagenes </template>
        </SectionDivider>

        <b-alert show variant="info">
          <p class="m-0">Los campos marcados con <b>*</b> son obligatorios.</p>
        </b-alert>

        <vue-dropzone
          ref="dropZoneImg"
          id="dropZoneImg"
          :options="dropZone.options"
          :use-custom-slot="dropZone.useCustomSlot"
          :include-styling="dropZone.includeStyling"
          @vdropzone-file-added="validateFile"
          @vdropzone-removed-file="handleRemoveFile"
        >
          <slot>
            <div class="drag-area">
              <div class="icon">
                <b-icon :icon="dropZone.icons.drop" size="is-large"></b-icon>
              </div>
              {{ dropZone.labels.drop }}
            </div>
          </slot>
        </vue-dropzone>

        <small class="text-muted"
          >Solo se permiten archivos de imagen y un máximo de 4MB, asi como un
          máximo de 3 imagenes.</small
        >
      </b-col>
    </b-row>
  </div>
</template>
<script>
import Vue from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required, helpers } from "@vuelidate/validators";
import eventsController from "../services/controller/events.controller";
import { formatDate } from "../../../../kernel/moment";
import vue2Dropzone from "vue2-dropzone";
import "vue2-dropzone/dist/vue2Dropzone.min.css";
import SweetAlertCustom from "../../../../kernel/SweetAlertCustom";

export default Vue.extend({
  name: "SaveEventView",
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
      dropzoneOptions: {
        url: "https://httpbin.org/post",
        thumbnailWidth: 150,
        maxFilesize: 0.5,
        headers: { "My-Awesome-Header": "header value" },
        acceptedFiles: "image/*",
        addRemoveLinks: true,
        dictDefaultMessage: "Arrastra tus imágenes aquí o haz clic para subir",
      },
      dropZone: {
        useCustomSlot: true,
        duplicateCheck: true,
        includeStyling: true,
        options: {
          url: "https://httpbin.org/post",
          thumbnailWidth: 150,
          maxFilesize: 4,
          headers: { "My-Awesome-Header": "header value" },
          clickable: true,
          addRemoveLinks: true,
          acceptedFiles: "image/*",
        },
        labels: {
          removeFile: "Eliminar",
          downloadFile: "Descargar",
          size: "Tamaño",
          files: "Archivos",
          drop: "Haz clic aquí o arrastra y suelta los archivos",
          or: "o",
          browse: "Buscar",
        },
        icons: {
          remove: "trash",
          download: "download",
          size: "file",
          files: "file",
          drop: "image",
          browse: "image",
        },
      },
      isLoading: false,
      listEvents: [],

      slide: 0,
      componentDragArea: {
        files: [],
        isDragging: false,
      },

      listCategories: [
        { value: null, text: "Seleccione una categoria" },
        { value: "Exposición", text: "Exposición" },
        { value: "Taller", text: "Taller" },
        { value: "Conferencia", text: "Conferencia" },
      ],
      event: {
        name: null,
        category: null,
        description: null,
        startDate: null,
        endDate: null,
        pictures: [],
      },
      errorMessages: {
        required: "Campo obligatorio",
      },
    };
  },
  mounted() {
  },
  methods: {
    async saveEvent() {
      try {
        if (this.v$.event.$invalid) {
          SweetAlertCustom.invalidForm();
          return;
        }

        this.isLoading = true;
        const response = await eventsController.saveEvent(this.event);
        console.log(response);
        if (response.message === "Event created successfully") {
          this.v$.event.$reset();
          this.event = {
            name: null,
            category: null,
            description: null,
            startDate: null,
            endDate: null,
            pictures: [],
          };
          SweetAlertCustom.successMessage();
          await this.$router.replace({ name: "events-list" });
        }
      } catch (error) {
        console.log(error);
      } finally {
        this.isLoading = false;
      }
    },
    async getListEvents() {
      try {
        this.isLoading = true;
        const response = await eventsController.getEvents();
        this.listEvents = response;
      } catch (error) {
        console.error(error);
      } finally {
        this.isLoading = false;
      }
    },
    validateFile(file) {
      // validate if there are 3 files
      if (this.event.pictures.length >= 3) {
        this.$refs.dropZoneImg.removeFile(file);
        alert("Solo se permiten un máximo de 3 imagenes.");
        return;
      }

      // Verificar si el archivo ya ha sido subido
      if (this.event.pictures.find((p) => p.name === file.name)) {
        this.$refs.dropZoneImg.removeFile(file);
        alert("Este archivo ya ha sido subido.");
        return;
      }

      // Agregar el archivo a la lista de subidos
      console.log(file);
      this.event.pictures.push(file);
    },

    handleRemoveFile(file) {
      console.log('remove');
      this.event.pictures = this.event.pictures.filter((p) => p.name !== file.name);
    },

    formatDate,
  },
  validations() {
    return {
      event: {
        name: {
          required: helpers.withMessage(this.errorMessages.required, required),
        },
        category: {
          required: helpers.withMessage(this.errorMessages.required, required),
        },
        description: {
          required: helpers.withMessage(this.errorMessages.required, required),
        },
        startDate: {
          required: helpers.withMessage(this.errorMessages.required, required),
        },
        endDate: {
          required: helpers.withMessage(this.errorMessages.required, required),
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
