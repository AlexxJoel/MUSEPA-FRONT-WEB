<template>
  <div>


      <loading-custom :isLoading="isLoading.saveFavorite" :fullPage="true" />



    <b-row class="px-5 pt-3 m-0">
      <b-col cols="6">
        <!-- Card -->

        <div class="p-4" style="height: fit-content">
          <div class="d-flex justify-content-between mb-2">
            <h2>Información del evento</h2>
          </div>


          <b-skeleton-wrapper :loading="isLoading.getDetailsEvent">
            <template #loading>
              <b-row class="pb-4">
                <b-col cols="6">
                  <b-label class="font-italicm b-1" size="sm">Nombre del evento</b-label>
                  <b-skeleton height="30px"></b-skeleton>
                </b-col>
                <b-col cols="6">
                  <b-label class="font-italicm b-1" size="sm">Categoria</b-label>
                  <b-skeleton height="30px"></b-skeleton>
                </b-col>
              </b-row>

              <b-row class="pb-3">
                <b-col cols="6">
                  <b-label class="font-italicm b-1" size="sm">Fecha de incio</b-label>
                  <b-skeleton height="30px"></b-skeleton>
                </b-col>
                <b-col cols="6">
                  <b-label class="font-italicm b-1" size="sm">Fecha de fin</b-label>
                  <b-skeleton height="30px"></b-skeleton>
                </b-col>
              </b-row>

              <b-row class="pb-3">
                <b-col cols="12">
                  <b-label class="font-italicm b-1" size="sm">Descripción</b-label>
                  <b-skeleton height="30px"></b-skeleton>
                </b-col>
              </b-row>


              <b-skeleton type="button" width="100%" height="50px"></b-skeleton>
            </template>

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

              <div>
                <div  v-if="isSaved" 
                class="bg-danger text-white p-2 rounded mb-3 text-center">
                  <b-icon icon="heart-fill" class="mr-2"></b-icon> 
                  Marcado como favorito
                </div>
                <b-button v-else 
                @click="savedRecord"
                variant="outline-secondary" block>
                  <b-icon icon="heart" class="mr-2"></b-icon> 
                  Marcar como favorito  
                </b-button>
              </div>
            </b-form>

          </b-skeleton-wrapper>
        </div>
      </b-col>
      <b-col cols="6">


        <SectionDivider>
          <template v-slot:title> Imagenes </template>
        </SectionDivider>

        <section>

          <b-skeleton-wrapper :loading="isLoading.getDetailsEvent">
            <template #loading>

              <div class="px-4 pb-3">
                <b-row>
                  <b-col cols="12">
                    <b-skeleton-img></b-skeleton-img>
                  </b-col>
                </b-row>
              </div>

              <div class="px-4">
                <b-row>
                  <b-col v-for="index in 3" :key="index" cols="4">
                    <b-skeleton-img></b-skeleton-img>
                  </b-col>
                </b-row>
              </div>
            </template>

            <b-card no-body v-if="event.pictures.length === 0" style="height: 50vh">
              <div class="d-flex  align-items-center text-center" style="height: 100%; width: 100%;">
                <h3>Upps! Al parecer no se encontraron imagenes disponibles</h3>
              </div>
            </b-card>

            <div v-else>
              <section class="px-4 pb-3">
                <VueSlickCarousel ref="c1" :asNavFor="$refs.c2" :focusOnSelect="true">
                  <div v-for="(picture, index) in event.pictures" :key="index"
                    class="d-flex justify-content-center align-items-center" style="width: 100%;">
                    <img :src="picture" alt="Imagen del evento" style="object-fit: contain; width: 100%;"
                      height="300" />
                  </div>
                </VueSlickCarousel>
              </section>

              <section>
                <VueSlickCarousel ref="c2" :asNavFor="$refs.c1" :slidesToShow="2" :focusOnSelect="true">
                  <div v-for="(picture, index) in event.pictures" :key="index">
                    <img :src="picture" alt="Imagen en miniatura" height="100"
                      style="width: 100%; object-fit: cover;" />
                  </div>
                </VueSlickCarousel>
              </section>
            </div>

          </b-skeleton-wrapper>

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
      isSaved: false,
      // status component
      isEditing: true,
      isLoading: {
        getDetailsEvent: false,
        saveFavorite: false,
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
    this.getDetailsEvent();

    this.addFile();
  },
  watch: {},
  methods: {
    async getDetailsEvent() {
      try {
        this.isLoading.getDetailsEvent = true;
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
        this.isLoading.getDetailsEvent = false;
      }
    },
    async savedRecord() {
      try {
        this.isLoading.saveFavorite = true;
        this.isSaved = true;
        // const response = await eventsController.saveEvent(this.event);
        // this.event = response;


      } catch (error) {
        console.error(error);
      }finally {
        this.isLoading.saveFavorite = false;
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

.card {
  background-color: #00000003;
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
