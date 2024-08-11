<template>
  <div>
    <b-row class="px-5 pt-3 m-0">
      <b-col cols="6">

        <!-- Card -->

        <b-card class="card">

          <div class="d-flex justify-content-between">
            <h2>Información del evento</h2>
            <b-button variant="outline-secondary" @click="isEditing = !isEditing">
              <b-icon v-if="!isEditing" icon="lock-fill" class="mr-2"></b-icon>
              <b-icon v-else icon="unlock-fill" class="mr-2"></b-icon>
              Editar
            </b-button>



          </div>

          <b-form ref="form">
            <b-row>
              <b-col cols="6">
                <b-form-group label="Nombre del evento:*" label-for="name">
                  <b-form-input id="name" v-model="event.name" required placeholder="Nombre del evento"></b-form-input>
                </b-form-group>
              </b-col>
              <b-col cols="6">
                <b-form-group label="Categoria:*" label-for="category">
                  <b-form-select v-model="event.category" :options="listCategories"></b-form-select>
                </b-form-group>
              </b-col>
            </b-row>

            <b-row>
              <b-col cols="6">
                <b-form-group label="Fecha de incio:*" label-for="startDate" ref="startDate">
                  <b-form-datepicker id="startDate" v-model="event.startDate" class="mb-2"
                    label-no-date-selected="Seleccione una fecha" label-help=""></b-form-datepicker>
                </b-form-group>
              </b-col>
              <b-col cols="6">
                <b-form-group label="Fecha de fin:*" label-for="endDate" ref="endDate">
                  <b-form-datepicker id="endDate" v-model="event.endDate" class="mb-2"
                    label-no-date-selected="Seleccione una fecha" label-help=""></b-form-datepicker>
                </b-form-group>
              </b-col>
            </b-row>


            <b-row>
              <b-col cols="12">
                <b-form-group label="Descripción:*" label-for="description">
                  <b-form-input id="description" v-model="event.description" required
                    placeholder="Descripción del evento"></b-form-input>
                </b-form-group>
              </b-col>
            </b-row>

            <div>
              <b-button variant="outline-secondary" block>
                Guardar evento
              </b-button>
            </div>

          </b-form>
        </b-card>
      </b-col>
      <b-col cols="6">

        <SectionDivider>
          <template v-slot:title>
            Imagenes
          </template>
        </SectionDivider>

        <b-alert show variant="info" ref="alert-info-input">
          <p class="m-0">Los campos marcados con <b>*</b> son obligatorios.</p>
        </b-alert>


        <vue-dropzone ref="dropZoneImg" id="dropZoneImg" :options="dropZone.options"
          :use-custom-slot="dropZone.useCustomSlot" :include-styling="dropZone.includeStyling"
          @vdropzone-file-added="validateFile" @vdropzone-removed-file="handleRemoveFile" >
          <slot>
            <div class="drag-area">
              <div class="icon">
                <b-icon :icon="dropZone.icons.drop" size="is-large"></b-icon>
              </div>
              {{ dropZone.labels.drop }}
            </div>
          </slot>
        </vue-dropzone>


        <small class="text-muted" ref="help_text_img">Solo se permiten archivos de imagen y un máximo de 4MB, asi como un máximo de 3
          imagenes.</small>

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



export default Vue.extend({
  name: "SaveEventView",
  components: {
    vueDropzone: vue2Dropzone,
    SectionDivider: () => import('@/components/SectionDivider.vue')
  },
  data() {
    return {
      // status component
      isEditing: false,



      dropzoneOptions: {
        url: 'https://httpbin.org/post',
        thumbnailWidth: 150,
        maxFilesize: 0.5,
        headers: { "My-Awesome-Header": "header value" },
        acceptedFiles: 'image/*',
        addRemoveLinks: true,
        dictDefaultMessage: 'Arrastra tus imágenes aquí o haz clic para subir'
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
        { value: "1", text: "Concierto" },
        { value: "2", text: "Obra de teatro" },
        { value: "3", text: "Conferencia" },
        { value: "4", text: "Fiesta" },
      ],
      event: {
        name: null,
        category: null,
        description: null,
        startDate: null,
        endDate: null,
        pictures: [],
      },

    };
  },
  mounted() {
    this.getListEvents();
    this.handleDisableStatusInput();
    this.addFile();
  },
  watch: {
    isEditing() {
      this.handleDisableStatusInput();
    },
  },
  methods: {
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
        alert('Solo se permiten un máximo de 3 imagenes.');
        return;
      }


      // Verificar si el archivo ya ha sido subido
      if (this.event.pictures.find((p) => p.name === file.name)) {
        this.$refs.dropZoneImg.removeFile(file);
        alert('Este archivo ya ha sido subido.');
        return;
      }

      // Agregar el archivo a la lista de subidos
      console.log(file)
      this.event.pictures.push(file);
    },
    handleRemoveFile(file) {
      console.log('remove');
      this.event.pictures = this.event.pictures.filter((p) => p.name !== file.name);
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

      console.log(inputs[inputs.length - 1]);

      // d-none
      if (this.isEditing) {
        inputs[inputs.length - 1].classList.remove('d-none');
      } else {
        inputs[inputs.length - 1].classList.add('d-none');
      }

    },

    formatDate
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
