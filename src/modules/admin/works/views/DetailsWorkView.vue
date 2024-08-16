<template>
  <div>
    <loading-custom :isLoading="isLoading" />

    <b-row class="px-5 pt-3 m-0">
      <b-col>
        <b-alert show :variant="isEditing ? 'warning' : 'info'" dismissible fade>
          <p class="m-0" v-if="!isEditing">
            Esta vista es solo de lectura, si deseas editar haz clic en el boton
            de editar.
          </p>
          <p class="m-0" v-else>
            Esta vista es de edición, si deseas guardar los cambios haz clic en
            el boton de guardar.
          </p>
        </b-alert>
      </b-col>
    </b-row>

    <b-row class="px-5 pt-3 m-0">
      <b-col cols="6">
        <!-- Card -->

        <b-card class="card">
          <div class="d-flex justify-content-between">
            <h2>Información de la obra</h2>
            <b-button variant="outline-secondary" @click="isEditing = !isEditing" class="m-0">
              <b-icon v-if="!isEditing" icon="lock-fill" class="mr-2"></b-icon>
              <b-icon v-else icon="unlock-fill" class="mr-2"></b-icon>
              Editar
            </b-button>
          </div>

          <b-form ref="form" @submit.prevent="updateWork()">
            <b-row>
              <b-col cols="6">
                <b-form-group label="Titulo de la obra:*" label-for="title">
                  <b-form-input id="title" v-model="v$.work.title.$model"
                    :state="v$.work.title.$dirty ? !v$.work.title.$error : null" @blur="v$.work.title.$touch()" required
                    placeholder="Nombre de la Obra"></b-form-input>
                </b-form-group>
              </b-col>
              <b-col cols="6">
                <b-form-group label="Técnica:*" label-for="technique">
                  <b-form-input id="technique" v-model="v$.work.technique.$model" :state="v$.work.technique.$dirty
                    ? !v$.work.technique.$error
                    : null
                    " @blur="v$.work.technique.$touch()" required placeholder="Técnica"></b-form-input>
                </b-form-group>
              </b-col>
              <b-col cols="6">
                <b-form-group label="Artistas:*" label-for="artists">
                  <b-form-input id="artists" v-model="v$.work.artists.$model" :state="v$.work.artists.$dirty ? !v$.work.artists.$error : null
                    " @blur="v$.work.artists.$touch()" required
                    placeholder="Artistas separados por comas"></b-form-input>
                </b-form-group>
              </b-col>
              <b-col cols="6">
                <b-form-group label="Fecha de creación:*" label-for="creationDate">
                  <b-form-datepicker id="creationDate" v-model="v$.work.creationDate.$model" :state="v$.work.creationDate.$dirty
                    ? !v$.work.creationDate.$error
                    : null
                    " @blur="v$.work.creationDate.$touch()" class="mb-2" label-no-date-selected="Seleccione una fecha"
                    label-help=""></b-form-datepicker>
                </b-form-group>
              </b-col>
            </b-row>

            <b-row>
              <b-col cols="12">
                <b-form-group label="Descripción:*" label-for="description">
                  <b-form-input id="description" v-model="v$.work.description.$model" :state="v$.work.description.$dirty
                    ? !v$.work.description.$error
                    : null
                    " @blur="v$.work.description.$touch()" required
                    placeholder="Descripción de la obra"></b-form-input>
                </b-form-group>
              </b-col>
            </b-row>
            <div>
              <b-button variant="outline-secondary" block type="submit">
                Guardar evento
              </b-button>
            </div>
          </b-form>
        </b-card>
      </b-col>
      <b-col cols="6">

        <section>
          <SectionDivider>
            <template v-slot:title> Actualizar imagenes </template>
          </SectionDivider>

          <b-alert show variant="info" ref="alert-info-input">
            <p class="m-0">Los campos marcados con <b>*</b> son obligatorios.</p>
          </b-alert>

          <vue-dropzone ref="dropZoneImg" id="dropZoneImg" :options="dropZone.options"
            :use-custom-slot="dropZone.useCustomSlot" :include-styling="dropZone.includeStyling"
            @vdropzone-file-added="validateFile" @vdropzone-removed-file="handleRemoveFile">


            <slot>
              <div class="drag-area">
                <div class="icon">
                  <b-icon :icon="dropZone.icons.drop" size="is-large"></b-icon>
                </div>
                {{ isEditing ? dropZone.labels.drop : "Habilitado solo en modo edición" }}
              </div>
            </slot>
          </vue-dropzone>

          <small class="text-muted" ref="help_text_img">Solo se permiten archivos de imagen y un máximo de 4MB, asi como
            un
            máximo de 3 imagenes.</small>

        </section>

        <section v-if="work.pictures.length > 0">
          <SectionDivider>
            <template v-slot:title> Imagenes guardadas</template>
          </SectionDivider>


          <b-row ref="pictureSaved">
            <b-col cols="4" v-for="(picture, index) in work.pictures" :key="index">
              <b-card no-body class="mb-2">
                <!-- Across on the corder right -->
                <b-icon icon="x-circle-fill" scale="2" variant="danger" class="position-absolute bg-white"
                  style="right: 0; top: 0; z-index: 1; cursor: pointer;" v-if="isEditing"
                  @click="handleRemoveFileSaved(picture)">
                </b-icon>

                <b-img :src="picture" fluid rounded></b-img>
              </b-card>
            </b-col>

          </b-row>

        </section>
      </b-col>

    </b-row>
  </div>
</template>
<script>
import Vue from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required, helpers } from "@vuelidate/validators";
import { formatDate } from "../../../../kernel/moment";
import vue2Dropzone from "vue2-dropzone";
import "vue2-dropzone/dist/vue2Dropzone.min.css";
import worksController from "../services/controller/works.controller";
import SweetAlertCustom from '../../../../kernel/SweetAlertCustom';
import { urlToBase64 } from '../../../../kernel/fucntions';

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
      // status component
      isEditing: false,
      isLoading: false,
      newPictures: [],
      listCategories: [
        { value: null, text: "Seleccione una categoria" },
        { value: "1", text: "Concierto" },
        { value: "2", text: "Obra de teatro" },
        { value: "3", text: "Conferencia" },
        { value: "4", text: "Fiesta" },
      ],
      work: {
        title: null,
        description: null,
        creationDate: null,
        technique: null,
        artists: null,
        pictures: [],
      },

      errorMessages: {
        required: "Este campo es obligatorio",
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
          drop: "Haz clic aquí o arrastra y suelta los archivos",
        },
        icons: {
          drop: "image",
        },
      },
    };
  },
  mounted() {
    this.handleDisableStatusInput();
    this.findWorkById();
  },
  watch: {
    isEditing() {
      this.handleDisableStatusInput();
    },
  },
  methods: {
    async findWorkById() {
      try {
        this.isLoading = true;
        const response = await worksController.findWorkById(
          this.$route.params.id
        );
        this.work = response;
      } catch (error) {
        console.log(error);
      } finally {
        this.isLoading = false;
      }
    },
    async updateWork() {
      this.v$.work.$touch();
      if (this.v$.work.$error) {
        SweetAlertCustom.invalidForm();
        return;
      }

      let response = null;

      try {
        this.isLoading = true;

        const newImagesBase64 = this.newPictures.map((file) => file.dataURL);
        const imagesSaved = await Promise.all(this.work.pictures.map((url) => urlToBase64(url)));
        const imagesBase64 = [...imagesSaved, ...newImagesBase64];


        response = await worksController.updateWork({
          id: this.$route.params.id,
          ...this.work,
          pictures: imagesBase64,
        });

      } catch (error) {
        console.log(error);
      } finally {
        this.isLoading = false;
      }

      if (response && response.message === 'Work updated successfully') {
        await SweetAlertCustom.successMessage();
        await this.$router.replace({ name: "works-list" });
      }
    },


    formatDate,
    validateFile(file) {

      const totalLength = this.work.pictures.length + this.newPictures.length;

      // validate if there are 3 files
      if (totalLength >= 3) {
        this.$refs.dropZoneImg.removeFile(file);
        alert("Solo se permiten guardar un máximo de 3 imagenes, elimina una para poder agregar otra.");
        return;
      }


      if (file.size > 4 * 1024 * 1024) {
        this.$refs.dropZoneImg.removeFile(file);
        alert("El archivo excede el tamaño permitido de 4MB.");
        return;
      }


      // Verificar si el archivo ya ha sido subido
      if (this.newPictures.find((p) => p.name === file.name)) {
        this.$refs.dropZoneImg.removeFile(file);
        alert("Este archivo ya ha sido subido.");
        return;
      }

      // Agregar el archivo a la lista de subidos
      this.newPictures.push(file);
    },
    handleRemoveFile(file) {
      console.log("remove");
      this.newPictures = this.newPictures.filter(
        (p) => p.name !== file.name
      );
    },
    handleDisableStatusInput() {
      // get form
      const form = this.$refs.form;

      // get all inputs
      const inputs = form.querySelectorAll("input, select, textarea, button");
      const alertInfo = this.$refs["alert-info-input"];
      const dropZone = this.$refs.dropZoneImg.$el;
      const helpTextImg = this.$refs.help_text_img;


      if (this.isEditing) {
        inputs.forEach((input) => {
          input.removeAttribute("disabled");
        });

        alertInfo.$el.style.display = "block";
        helpTextImg.style.display = "block";
        dropZone.classList.remove("disabled-dropzone");
      } else {
        inputs.forEach((input) => {
          input.setAttribute("disabled", "disabled");
        });
        alertInfo.$el.style.display = "none";
        helpTextImg.style.display = "none";
        dropZone.classList.add("disabled-dropzone");
      }
      // d-none
      if (this.isEditing) {
        inputs[inputs.length - 1].classList.remove("d-none");
      } else {
        inputs[inputs.length - 1].classList.add("d-none");
      }
    },
    handleRemoveFileSaved(picture) {
      this.work.pictures = this.work.pictures.filter((p) => p !== picture);
    },
  },
  validations() {
    return {
      work: {
        title: {
          required: helpers.withMessage(this.errorMessages.required, required),
        },
        description: {
          required: helpers.withMessage(this.errorMessages.required, required),
        },
        creationDate: {
          required: helpers.withMessage(this.errorMessages.required, required),
        },
        technique: {
          required: helpers.withMessage(this.errorMessages.required, required),
        },
        artists: {
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

.disabled-dropzone {
  pointer-events: none;
  /* Desactiva clics y arrastres */
  opacity: 0.7;
  /* Hace que parezca deshabilitado */
}
</style>
