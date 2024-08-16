<template>
  <div>


      <loading-custom :isLoading="isLoading" :fullPage="true" />



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
                  <p class="font-weight-bold h5">
                    {{
                      event.category
                    }}
                  </p>
                </b-form-group>
              </b-col>
            </b-row>

            <b-row>
              <b-col cols="6">
                <b-form-group label="Fecha de incio" label-for="startDate" ref="startDate" label-class="font-italic"
                  label-size="sm">
                  <p class="font-weight-bold h5">
                    {{ (event.startDate) }}
                  </p>
                </b-form-group>
              </b-col>
              <b-col cols="6">
                <b-form-group label="Fecha de fin" label-for="endDate" ref="endDate" label-class="font-italic"
                  label-size="sm">
                  <p class="font-weight-bold h5">
                    {{ (event.endDate) }}
                  </p>
                </b-form-group>
              </b-col>
            </b-row>

            <b-row class="pb-3">
              <b-col cols="12">
                <b-form-group label="Descripción" label-for="description" label-class="font-italic" label-size="sm">
                  <p class="font-weight-bold h5">
                    {{ event.description }}
                  </p>
                </b-form-group>
              </b-col>
            </b-row>

            <!-- <div>
              <b-button variant="outline-secondary" block>
                Guardar evento
              </b-button>
            </div> -->
          </b-form>
        </div>
      </b-col>
      <b-col cols="6">


        <div style="height: 50vh;" v-if="isLoading">
          <loading-custom :isLoading="isLoading" :fullPage="false" :message="'Cargando imagenes...'" />
        </div>


        <section v-else>
          <SectionDivider>
            <template v-slot:title> Imagenes </template>
          </SectionDivider>

          <section class="p-4">
            <VueSlickCarousel ref="c1" :asNavFor="$refs.c2" v-bind="settingsCarouselMain">
              <div v-for="(picture, index) in event.pictures" :key="index"
                class="d-flex justify-content-center align-items-center" style="width: 50%;">
                <img :src="picture" alt="Imangen del evento" height="400" style="object-fit: cover" />
              </div>
            </VueSlickCarousel>
          </section>

          <section>
            <VueSlickCarousel ref="c2" :asNavFor="$refs.c1" v-bind="settingsCarousel">
              <div v-for="(picture, index) in event.pictures" :key="index"><img :src="picture" height="100" /></div>
            </VueSlickCarousel>
          </section>
        </section>
      </b-col>
    </b-row>
  </div>
</template>
<script>
import Vue from "vue";
import eventsController from "../services/controller/events.controller";
import { formatDate } from "../../../../kernel/moment";
import vue2Dropzone from "vue2-dropzone";
import "vue2-dropzone/dist/vue2Dropzone.min.css";
import VueSlickCarousel from "vue-slick-carousel";
import "vue-slick-carousel/dist/vue-slick-carousel.css";
// optional style for arrows & dots
import "vue-slick-carousel/dist/vue-slick-carousel-theme.css";

export default Vue.extend({
  name: "SaveEventView",
  components: {
    VueSlickCarousel,
    vueDropzone: vue2Dropzone,
    SectionDivider: () => import("@/components/SectionDivider.vue"),
    LoadingCustom: () => import("../../../../views/components/LoadingCustom.vue"),
  },
  data() {
    return {
      // status component
      isEditing: true,
      isLoading: {
        save: false,
        images: true,
      },


      // carousel
      settingsCarouselMain: {
        focusOnSelect: true,
      },
      settingsCarousel: {
        dots: true,
        focusOnSelect: true,
        slidesToShow: 2,
      },
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
        id: 0,
        name: "Cargando...",
        description: "Cargando...",
        startDate: "Cargando...",
        endDate: "Cargando...",
        category: "Cargando...",
        pictures: [
        ],
      },
    };
  },
  mounted() {
    this.getDeatilEvent();

    this.addFile();
  },
  watch: {},
  methods: {
    async getDeatilEvent() {
      try {
        this.isLoading = true;
        this.event.id = this.$route.params.id;
        const response = await eventsController.findEventById(this.event.id);
        this.event = {
          ...response,
          startDate: formatDate(response.start_date),
          endDate: formatDate(response.end_date),
        }
      } catch (error) {
        console.error(error);
      } finally {
        this.isLoading = false;
      }
    },
    validateFile(file) {
      // Verificar si el archivo ya ha sido subido
      if (this.event.pictures.find((p) => p.name === file.name)) {
        alert("Este archivo ya ha sido subido.");
        return;
      }

      // Agregar el archivo a la lista de subidos
      console.log(file);
      this.event.pictures.push(file);
    },
    handleRemoveFile(file) {
      console.log("remove");
      this.event.pictures = this.event.pictures.filter(
        (p) => p.name !== file.name
      );
    },
    addFile() { },
    formatDate,
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
