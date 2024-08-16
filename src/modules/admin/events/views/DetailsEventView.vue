<template>
  <div>

    <loading-custom :isLoading="isLoading" />


    <b-row class="px-5 pt-3 m-0">
      <b-col>
        <b-alert show :variant="isEditing ? 'warning' : 'info'" dismissible fade>
          <p class="m-0" v-if="!isEditing">Esta vista es solo de lectura, si deseas editar haz clic en el boton de
            editar.</p>
          <p class="m-0" v-else>Esta vista es de edición, si deseas guardar los cambios haz clic en el boton de guardar.
          </p>
        </b-alert>
      </b-col>
    </b-row>

    <b-row class="px-5 pt-3 m-0">
      <b-col cols="6">

        <!-- Card -->

        <b-card class="card">

          <div class="d-flex justify-content-between ">
            <h2>Información del evento</h2>
            <b-button variant="outline-secondary" @click="isEditing = !isEditing" class="m-0">
              <b-icon v-if="!isEditing" icon="lock-fill" class="mr-2"></b-icon>
              <b-icon v-else icon="unlock-fill" class="mr-2"></b-icon>
              Editar
            </b-button>
          </div>


          <b-form ref="form" @submit.prevent="updateEvent">
            <b-row>
              <b-col cols="6">

                <b-form-group label="Nombre del evento:*" label-for="title">
                  <b-form-input id="title" v-model="v$.event.name.$model"
                    :state="v$.event.name.$dirty ? !v$.event.name.$error : null" @blur="v$.event.name.$touch()" required
                    placeholder="Nombre del evento"></b-form-input>
                </b-form-group>
              </b-col>
              <b-col cols="6">
                <b-form-group label="Categoria:*" label-for="category">
                  <b-form-select  :options="listCategories" v-model="v$.event.category.$model"
                    required placeholder="Seleccione una categoria"
                  ></b-form-select>
                </b-form-group>
              </b-col>
            </b-row>

            <b-row>
              <b-col cols="6">
                <b-form-group label="Fecha de incio:*" label-for="startDate" ref="startDate">
                  <b-form-datepicker id="startDate" v-model="v$.event.startDate.$model"
                    :state="v$.event.startDate.$dirty ? !v$.event.startDate.$error : null"
                    @blur="v$.event.startDate.$touch()" class="mb-2"

                    label-no-date-selected="Seleccione una fecha" label-help=""></b-form-datepicker>
                </b-form-group>
              </b-col>
              <b-col cols="6">
                <b-form-group label="Fecha de fin:*" label-for="endDate" ref="endDate">
                  <b-form-datepicker id="endDate" v-model="v$.event.endDate.$model"
                    :state="v$.event.endDate.$dirty ? !v$.event.endDate.$error : null"
                    @blur="v$.event.endDate.$touch()" class="mb-2"
                    label-no-date-selected="Seleccione una fecha" label-help=""></b-form-datepicker>
                </b-form-group>
              </b-col>
            </b-row>


            <b-row>
              <b-col cols="12">
                <b-form-group label="Descripción:*" label-for="description">
                  <b-form-input id="description" v-model="v$.event.description.$model"
                    :state="v$.event.description.$dirty ? !v$.event.description.$error : null"
                    @blur="v$.event.description.$touch()" required
                    placeholder="Descripción del evento"></b-form-input>
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

        <section v-if="event.pictures.length > 0">
          <SectionDivider>
            <template v-slot:title> Imagenes guardadas</template>
          </SectionDivider>


          <b-row ref="pictureSaved">
            <b-col cols="4" v-for="(picture, index) in event.pictures" :key="index">
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
import eventsController from "../services/controller/events.controller";
import { formatDate } from '../../../../kernel/moment';
import vue2Dropzone from 'vue2-dropzone'
import 'vue2-dropzone/dist/vue2Dropzone.min.css'
import { useVuelidate } from "@vuelidate/core";
import { helpers, required } from '@vuelidate/validators';
import SweetAlertCustom from '../../../../kernel/SweetAlertCustom';
import { urlToBase64 } from '../../../../kernel/fucntions';



export default Vue.extend({
  name: "SaveEventView",
  components: {
    vueDropzone: vue2Dropzone,
    SectionDivider: () => import('@/components/SectionDivider.vue'),
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
      newPicture: [],
      listCategories: [
        { value: null, text: "Seleccione una categoria" },
        { value: "Concierto", text: "Concierto" },
        { value: "Obra de teatro", text: "Obra de teatro" },
        { value: "Conferencia", text: "Conferencia" },
        { value: "Exposición", text: "Exposición" },
        { value: "Fiesta", text: "Fiesta" },
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
    this.findEvent();
    this.handleDisableStatusInput();
  },
  watch: {
    isEditing() {
      this.handleDisableStatusInput();
    },
  },
  methods: {
    async findEvent() {
      try {
        this.isLoading = true;
        this.event.id = this.$route.params.id;
        const response = await eventsController.findEventById(this.event.id);


        this.event = {
          ...response,
          startDate: (response.start_date),
          endDate: (response.end_date),
        };

        // categorias

      } catch (error) {
        console.error(error);
      } finally {
        this.isLoading = false;
      }
    },
    async updateEvent() {
      this.v$.event.$touch();
      if (this.v$.event.$error) {
        SweetAlertCustom.invalidForm();
        return;
      }

      let response = null;

      try {
        
        this.isLoading = true;

        
        const newImagesBase64 = this.newPicture.map((file) => file.dataURL);
        const imagesSaved = await Promise.all(this.event.pictures.map((url) => urlToBase64(url)));
        const imagesBase64 = [...imagesSaved, ...newImagesBase64];
        
        response = await eventsController.updateEvent({
          id: this.$route.params.id,
          ...this.event,
          pictures: imagesBase64,
          start_date: this.event.startDate,
          end_date: this.event.endDate,
        });
      } catch (error) {
        console.log(error);
      } finally {
        this.isLoading = false;
      }

      if (response && response.message === 'event updated successfully') {
        await SweetAlertCustom.successMessage();
        await this.$router.replace({ name: "event-list" });
      }

    },
    validateFile(file) {

      const totalLength = this.event.pictures.length + this.newPicture.length;



      // validate if there are 3 files
      if (totalLength >= 3) {
        this.$refs.dropZoneImg.removeFile(file);
        alert('Solo se permiten un máximo de 3 imagenes, elimina una imagen para poder agregar otra.');
        return;
      }

      if (file.size > 4 * 1024 * 1024) {
        this.$refs.dropZoneImg.removeFile(file);
        alert('El archivo excede el tamaño permitido, solo se permiten archivos de 4MB.');
        return;
      }

      // Verificar si el archivo ya ha sido subido
      if (this.newPicture.find((p) => p.name === file.name)) {
        this.$refs.dropZoneImg.removeFile(file);
        alert('Este archivo ya ha sido subido.');
        return;
      }

      // Agregar el archivo a la lista de subidos
      this.newPicture.push(file);
    },
    handleRemoveFile(file) {
      this.newPicture = this.newPicture.filter((p) => p.name !== file.name);
    },
    addFile() {
      this.$refs.dropZoneImg.manuallyAddFile({ name: 'file' + this.event.pictures.length, size: 1 }, 'https://musepa-bucket.s3.us-east-2.amazonaws.com/images/0e392eb4-43eb-470c-b31b-25c1807e33b5.jpg');
    },

    handleDisableStatusInput() {
      // get form
      const form = this.$refs.form;


      // get all inputs
      const inputs = form.querySelectorAll('input, select, textarea, button');
      const alertInfo = this.$refs['alert-info-input'];
      const dropZone = this.$refs.dropZoneImg.$el;
      const helpTextImg = this.$refs.help_text_img;



      if (this.isEditing) {
        inputs.forEach((input) => {
          input.removeAttribute('disabled');
        });
        alertInfo.$el.style.display = 'block'
        helpTextImg.style.display = 'block'
        dropZone.classList.remove('disabled-dropzone');

      } else {
        inputs.forEach((input) => {
          input.setAttribute('disabled', 'disabled');
        });
        alertInfo.$el.style.display = 'none'
        helpTextImg.style.display = 'none'
        dropZone.classList.add('disabled-dropzone');

      }


      // d-none
      if (this.isEditing) {
        inputs[inputs.length - 1].classList.remove('d-none');
      } else {
        inputs[inputs.length - 1].classList.add('d-none');
      }

    },

    formatDate
  },
  validations() {
    return {
      event: {
        name: { required: helpers.withMessage(this.errorMessages.required, required), },
        category: { required: helpers.withMessage(this.errorMessages.required, required), },
        description: { required: helpers.withMessage(this.errorMessages.required, required), },
        startDate: { required: helpers.withMessage(this.errorMessages.required, required), },
        endDate: { required: helpers.withMessage(this.errorMessages.required, required), },
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
  background-color: #F2F2F2;
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
