<template>
  <div>
    <b-row class="px-5 pt-3 m-0">
      <b-col cols="8">

        <!-- Card -->

        <b-card class="card">
          <h2>Crear Evento</h2>

          <b-form>
            <b-row>
              <b-col cols="6">
                <b-form-group label="Nombre del evento" label-for="name">
                  <b-form-input id="name" v-model="event.name" required placeholder="Nombre del evento"></b-form-input>
                </b-form-group>
              </b-col>
              <b-col cols="6">
                <b-form-group label="Categoria" label-for="category">
                  <b-form-select v-model="event.category" :options="listCategories"></b-form-select>
                </b-form-group>
              </b-col>
            </b-row>

            <b-row>
              <b-col cols="6">
                <b-form-group label="Fecha de incio:" label-for="startDate">
                  <b-form-datepicker id="startDate" v-model="event.startDate" class="mb-2"
                    label-no-date-selected="Seleccione una fecha" label-help=""></b-form-datepicker>
                </b-form-group>
              </b-col>
              <b-col cols="6">
                <b-form-group label="Fecha de fin:" label-for="endDate">
                  <b-form-datepicker id="endDate" v-model="event.endDate" class="mb-2"
                    label-no-date-selected="Seleccione una fecha" label-help=""></b-form-datepicker>
                </b-form-group>
              </b-col>
            </b-row>


            <b-row>
              <b-col cols="12">
                <b-form-group label="Descripción" label-for="description">
                  <b-form-input id="description" v-model="event.description" required
                    placeholder="Descripción del evento"></b-form-input>
                </b-form-group>
              </b-col>
            </b-row>

          </b-form>
        </b-card>
      </b-col>
      <b-col cols="4">
        <h2>
          Imagenes
        </h2>


        <div class="drag-area" @dragover.prevent @drop.prevent="handleDrop"
          @dragenter="componentDragArea.isDragging = true" @dragleave="componentDragArea.isDragging = false">

          <div class="icon">
            <b-icon v-if="componentDragArea.isDragging" icon="upload" size="is-large"></b-icon>
            <b-icon v-else icon="image" size="is-large"></b-icon>
          </div>

          <header v-if="componentDragArea.isDragging">
            Suelta los archivos
          </header>
          <header v-else>
            Arrastra y suelta los archivos aquí
          </header>

          <span>o</span>
          <b-button variant="primary" class="file-select-button" @click="triggerFileInput">
            Selecciona archivos
          </b-button>
          <input type="file" multiple hidden class="file-select-input" ref="fileInput" @change="handleFiles" />


        </div>


        <!-- Carrousel images event -->
       
        
        





      </b-col>
    </b-row>
  </div>
</template>
<script>
import Vue, { defineAsyncComponent } from "vue";
import eventsController from "../services/controller/events.controller";
import { formatDate } from '../../../../kernel/moment';




export default Vue.extend({
  name: "SaveEventView",
  components: {


  },
  data() {
    return {
      isLoading: false,
      listEvents: [],

      slide : 0,
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
      }

    };
  },
  mounted() {
    this.getListEvents();
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
    triggerFileInput() {
      this.$refs.fileInput.click();
    },
    handleFiles(event) {
      const files = event.target.files;
      // Lógica para manejar los archivos
      this.event.pictures = files;
    },
    handleDrop(event) {
      const files = event.dataTransfer.files;
      this.event.pictures = files;
    },
    uploadFiles(files) {
      // Lógica para manejar los archivos
      console.log(files);
      // Aquí puedes implementar la lógica para subir los archivos al servidor
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
  height: 40vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-top: 20px;
  padding: 20px;
  transition: background-color 0.2s ease-in-out;
}

.drag-area .icon {
  font-size: 50px;
  color: #333;
}
</style>
