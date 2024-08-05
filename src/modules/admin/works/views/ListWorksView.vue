<template>
  <div>
    <!-- add iamge  -->
    <section>
      <div
        style="background-image: url('https://images.unsplash.com/photo-1514905552197-0610a4d8fd73?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'); height: 25vh; background-size: cover; background-position: center;"
        class="d-flex justify-content-center align-items-center">
        <!-- center text in the middle of the screen -->
        <h1 class="p-0 m-0 font-weight-bold">Lista de Obras</h1>
      </div>
    </section>

    <!-- search and add button -->
    <section>
      <div class="d-flex justify-content-between px-5 mt-3">
        <b-form-group class="w-50">
          <b-form-input placeholder="Buscar obra" v-model="search" @input="searchWorks" />
        </b-form-group>
        <div>
          <b-button variant="primary" @click="goToAddWork">Agregar obra
          <b-icon icon="plus" class="ml-2"></b-icon>
          </b-button>
        </div>
    
      </div>
    </section>


    <section>
      <!-- Cards with image left and info right -->
      <div class="px-5 mt-2">
        <b-row>
          <b-col cols="12" md="4" v-for="work in listWorks" :key="work.id" class="mb-4">
            <b-card no-body class="overflow-hidden h-100">
              <b-row no-gutters class="h-100">
                <b-col lg="6">
                  <b-card-img
                    src="https://images.unsplash.com/photo-1574514120529-364d014b9a0a?q=80&w=1335&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Image" class="rounded-0" style="height: 100%;
                      object-fit: cover;
                      "></b-card-img>
                </b-col>
                <b-col lg="6">
                  <b-card-body>

                    <h6 class="font-weight-bold">{{ work.title }}</h6>

                    <b-card-text>
                      <div>
                        <b-icon icon="calendar" class="mr-2"></b-icon>
                        <p>Inicia el {{ formatDate(work.startDate) }}</p>
                        <p>Finaiza el {{ formatDate(work.endDate) }}</p>
                      </div>

                      <!-- category badge -->
                    </b-card-text>


                    <!-- TODO: limit the text to the content -->
                    <b-badge variant="secondary" class="mt-1 px-3">

                      <span>{{ work.technique }}</span>
                    </b-badge>

                    <!-- button left see more icon -->
                    <div>
                      <b-button variant="outline-secondary" class="mt-3 btn-block" size="sm">
                        Ver más
                        <b-icon icon="box-arrow-up-right" class="mr-2"></b-icon>
                      </b-button>
                    </div>

                  </b-card-body>
                </b-col>
              </b-row>
            </b-card>
          </b-col>
        </b-row>
      </div>
    </section>
  </div>



</template>
<script>
import Vue, { defineAsyncComponent } from "vue";
import worksController from "../services/controller/works.controller";
import { formatDate } from '../../../../kernel/moment';

export default Vue.extend({
  name: "ListWorksView",
  components: {


  },
  data() {
    return {
      isLoading: false,
      listWorks: [],

    };
  },
  mounted() {
    this.getListWorks();
  },
  methods: {
    async getListWorks() {
      try {
        this.isLoading = true;
        const response = await worksController.getWorks();
        this.listWorks = response;
      } catch (error) {
        console.error(error);
      } finally {
        this.isLoading = false;
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
</style>
