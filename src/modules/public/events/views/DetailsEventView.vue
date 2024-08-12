<template>
  <div>
    <b-row class="px-5 pt-3 m-0">
      <b-col cols="6">

        <!-- Card -->

        <div class="p-4">

          <div class="d-flex justify-content-between mb-2">
            <h2>Información del evento</h2>
          </div>

          <b-form ref="form">
            <b-row class="pb-3">
              <b-col cols="6">
                <b-form-group label="Nombre del evento" label-for="name" label-class="font-italic" label-size="sm">
                  <p class="font-weight-bold h5">{{ event.name }}</p>
                </b-form-group>
              </b-col>
              <b-col cols="6">
                <b-form-group label="Categoria" label-for="category" label-class="font-italic" label-size="sm">
                  <p class="font-weight-bold h5">{{ listCategories.find((c) => c.value === event.category).text }}</p>
                </b-form-group>
              </b-col>
            </b-row>

            <b-row>
              <b-col cols="6">
                <b-form-group label="Fecha de incio" label-for="startDate" ref="startDate" label-class="font-italic"
                  label-size="sm">
                  <p class="font-weight-bold h5">{{ formatDate(event.startDate) }}</p>
                </b-form-group>
              </b-col>
              <b-col cols="6">
                <b-form-group label="Fecha de fin" label-for="endDate" ref="endDate" label-class="font-italic"
                  label-size="sm">
                  <p class="font-weight-bold h5">{{ formatDate(event.endDate) }}</p>
                </b-form-group>
              </b-col>
            </b-row>


            <b-row class="pb-3">
              <b-col cols="12">
                <b-form-group label="Descripción" label-for="description" label-class="font-italic" label-size="sm">
                  <p class="font-weight-bold h5">{{ event.description }}</p>
                </b-form-group>
              </b-col>
            </b-row>

            <div>
              <b-button variant="outline-secondary" block>
                Guardar evento
              </b-button>
            </div>

          </b-form>
        </div>
      </b-col>
      <b-col cols="6">

        <SectionDivider>
          <template v-slot:title>
            Imagenes
          </template>
        </SectionDivider>

        <section class="p-4">
          <VueSlickCarousel ref="c1" :asNavFor="$refs.c2"  v-bind="settingsCarousel">
            <div
              class="d-flex justify-content-center align-items-center"
            ><img src="https://picsum.photos/300/300" /></div>

            <div><img src="https://picsum.photos/300/300" /></div>

            <div><img src="https://picsum.photos/300/300" /></div>
          </VueSlickCarousel>
        </section>

        <section>

          <VueSlickCarousel ref="c2" :asNavFor="$refs.c1" :slidesToShow="2" 
          :dots="true" 
            v-bind="settingsCarousel">
            <div><img src="https://picsum.photos/300/300"  height="100"/></div>
            <div><img src="https://picsum.photos/300/300" height="100" /></div>
            <div><img src="https://picsum.photos/300/300" height="100" /></div>


          </VueSlickCarousel>

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
import VueSlickCarousel from 'vue-slick-carousel'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
// optional style for arrows & dots
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'




export default Vue.extend({
  name: "SaveEventView",
  components: {
    VueSlickCarousel,
    vueDropzone: vue2Dropzone,
    SectionDivider: () => import('@/components/SectionDivider.vue')
  },
  data() {
    return {
      // status component
      isEditing: true,

      // carousel
      settingsCarousel: {
        focusOnSelect: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
      },


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
        { value: 1, text: "Concierto" },
        { value: 2, text: "Obra de teatro" },
        { value: 3, text: "Conferencia" },
        { value: 4, text: "Fiesta" },
      ],
      event: {
        name: 'Fiesta de la primavera',
        category: 4,
        description: 'Fiesta de la primavera en el parque central',
        startDate: '2021-10-10',
        endDate: '2021-10-11',
        pictures: [
          'https://musepa-bucket.s3.us-east-2.amazonaws.com/images/0e392eb4-43eb-470c-b31b-25c1807e33b5.jpg',
          'https://musepa-bucket.s3.us-east-2.amazonaws.com/images/0e392eb4-43eb-470c-b31b-25c1807e33b5.jpg',
          'https://musepa-bucket.s3.us-east-2.amazonaws.com/images/0e392eb4-43eb-470c-b31b-25c1807e33b5.jpg',
        ]
      },

    };
  },
  mounted() {
    this.getListEvents();

    this.addFile();
  },
  watch: {

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



      // Verificar si el archivo ya ha sido subido
      if (this.event.pictures.find((p) => p.name === file.name)) {
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


    },
    formatDate
  },
});
</script>


<style>
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


.slick-prev::before,
.slick-next::before {
  color: black;
  /* Cambia el color de las flechas a negro */
}

.slick-prev,
.slick-next {
  background-color: rgba(255, 255, 255, 0.5);
  /* Fondo semitransparente para las flechas */
  border-radius: 50%;
  /* Flechas redondeadas */
  padding: 10px;
}

</style>
