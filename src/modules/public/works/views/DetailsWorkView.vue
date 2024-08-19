<template>
  <div>
    <loading-custom :isLoading="isLoading" :fullPage="true" />

    <b-row class="px-5 pt-3 m-0">
      <b-col cols="6">
        <!-- Card -->

        <div class="p-4">
          <div class="d-flex justify-content-between mb-2">
            <h2>Información de la obra</h2>
          </div>

          <b-form ref="form">
            <b-row class="pb-3">
              <b-col cols="6">
                <b-form-group label="Titulo de la obra" label-for="title" label-class="font-italic" label-size="sm">
                  <p class="font-weight-bold h5">{{ work.title }}</p>
                </b-form-group>
              </b-col>
              <b-col cols="6">
                <b-form-group label="Técnica" label-for="category" label-class="font-italic" label-size="sm">
                  <p class="font-weight-bold h5">{{ work.technique }}</p>
                </b-form-group>
              </b-col>
            </b-row>

            <b-row>
              <b-col cols="6">
                <b-form-group label="Fecha de creación" label-for="start_date" ref="start_date"
                  label-class="font-italic" label-size="sm">
                  <p class="font-weight-bold h5">
                    {{ work.creation_date }}
                  </p>
                </b-form-group>
              </b-col>
              <b-col cols="6">
                <b-form-group label="Artistas" label-for="artists" ref="artists" label-class="font-italic"
                  label-size="sm">
                  <p class="font-weight-bold h5">
                    {{ work.artists.length > 0 ? work.artists.join(", ") : "Cargando..." }}
                  </p>
                </b-form-group>
              </b-col>
            </b-row>

            <b-row class="pb-3">
              <b-col cols="12">
                <b-form-group label="Descripción" label-for="description" label-class="font-italic" label-size="sm">
                  <p class="font-weight-bold h5">{{ work.description }}</p>
                </b-form-group>
              </b-col>
            </b-row>

            <div>
                <div v-if="isSaved" class="bg-danger text-white p-2 rounded mb-3 text-center">
                  <b-icon icon="heart-fill" class="mr-2"></b-icon>
                  Marcado como favorito
                </div>
                <b-button v-else @click="savedRecord" variant="outline-secondary" block>
                  <b-icon icon="heart" class="mr-2"></b-icon>
                  Marcar como favorito
                </b-button>
              </div>

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
            <VueSlickCarousel ref="c1" :asNavFor="$refs.c2" v-bind="settingsCarousel">
              <div v-for="(image, index) in work.pictures" :key="index" >
                <div class="d-flex justify-content-center">
                  <img :src="image" height="300" />
                </div>
              </div>
              <div v-if="work.pictures.length === 0"></div>
            </VueSlickCarousel>
          </section>

          <section>
            <VueSlickCarousel ref="c2" :asNavFor="$refs.c1" :slidesToShow="2" :dots="true" v-bind="settingsCarousel">
              <div v-for="(image, index) in work.pictures" :key="index">
                <img :src="image" height="100" />
              </div>
              <div v-if="work.pictures.length === 0"></div>
            </VueSlickCarousel>
          </section>

        </section>


      </b-col>
    </b-row>
  </div>
</template>
<script>
import Vue from "vue";
import worksController from "../services/controller/works.controller";
import { formatDate } from "../../../../kernel/moment";
import VueSlickCarousel from "vue-slick-carousel";
import "vue-slick-carousel/dist/vue-slick-carousel.css";
// optional style for arrows & dots
import "vue-slick-carousel/dist/vue-slick-carousel-theme.css";
import { getIdFromAuth, getRecordFavoritesFromLocalStorage } from '../../../../kernel/fucntions';
import profileController from '../../../visitor/profile/services/controller/profile.controller';
import SweetAlertCustom from '../../../../kernel/SweetAlertCustom';

export default Vue.extend({
  name: "SaveEventView",
  components: {
    VueSlickCarousel,
    SectionDivider: () => import("@/components/SectionDivider.vue"),
    LoadingCustom: () =>
      import("../../../../views/components/LoadingCustom.vue"),
  },
  data() {
    return {
      // status component
      isEditing: true,
      isSaved: false,

      // carousel
      settingsCarousel: {
        focusOnSelect: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
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
      work: {
        title: "Cargando...",
        category: 0,
        technique: "Cargando...",
        creation_date: "'Cargando...",
        description: "'Cargando...",
        artists: [],
        pictures: [],
      },
    };
  },
  mounted() {
    this.findWorkById();
  },
  methods: {
    formatDate,
    async findWorkById() {
      try {
        this.isLoading = true;
        const response = await worksController.findWorkById(
          this.$route.params.id
        );
    
        this.work = {
          ...response,
          creation_date: formatDate(response.creation_date),
        };

        if (getRecordFavoritesFromLocalStorage().includes(this.work.id)) {
          this.isSaved = true;
        }

      } catch (error) {
        console.log(error);
      } finally {
        this.isLoading = false;
      }
    },
    async savedRecord() {
      try {

        if (getIdFromAuth() === null) {
          SweetAlertCustom.infoMessage('Oops! No has iniciado sesión', 'Al parecer te ha gustado la obra, pero debes iniciar sesión para poder guardarlo en tus favoritos', 4000);
          return;
        }

        this.isLoading = true;

        const favorites = getRecordFavoritesFromLocalStorage().split(',') || [];
        favorites.push(this.work.id);
        localStorage.setItem('favorites', favorites);

        const response = await profileController  .updateVisitorFavorites({
          id: getIdFromAuth(),
          favorites: favorites,
        });

        if (response && response.message === 'Favorites updated successfully') {
          this.isSaved = true;
          SweetAlertCustom.successMessage('¡Listo!', 'La obra ha sido guardado en tus favoritos');
        } else {
          SweetAlertCustom.errorMessage('¡Ups!', 'Algo salió mal, por favor intenta de nuevo');
        }


      } catch (error) {
        console.error(error);
      } finally {
        this.isLoading = false;
      }
    },
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
