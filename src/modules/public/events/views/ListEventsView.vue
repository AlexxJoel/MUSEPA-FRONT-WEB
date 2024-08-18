<template>
  <div>
    <!-- add iamge  -->

    <section>
      <div style="
          background-image: url('https://images.unsplash.com/photo-1487958449943-2429e8be8625?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
          height: 12vh;
          background-size: cover;
          background-position: center;
        " class="d-flex justify-content-center align-items-center">
        <!-- center text in the middle of the screen -->
        <h1 class="p-0 m-0 font-weight-bold text-dark">Lista de eventos</h1>
      </div>
    </section>

    <section>
      <div class="d-flex justify-content-between px-5 mt-3">
        <b-form-group class="w-50">
          <b-form-input placeholder="Buscar evento por nombre..." type="search" v-model="searchTerm"
            :disabled="isLoading"></b-form-input>
        </b-form-group>
      </div>
    </section>

    <section>
      <b-skeleton-wrapper :loading="isLoading">

        <template #loading>
          <div class="px-5 mt-2">
            <b-row style="height: 50vh">
              <b-col cols="12" md="4" v-for="index in 6" :key="index" class="mb-4">
                <b-card no-body class="overflow-hidden h-100">
                  <b-row no-gutters class="h-100">
                    <b-col lg="6">
                      <b-skeleton height="100%" width="100%" class="rounded-0"></b-skeleton>
                    </b-col>
                    <b-col lg="6">
                      <b-card-body>
                        <b-skeleton height="100%" width="100%" class="rounded-0"></b-skeleton>
                      </b-card-body>
                    </b-col>
                  </b-row>
                </b-card>
              </b-col>
            </b-row>
          </div>
        </template>
        <!-- Cards with image left and info right -->

        <div v-if="filteredEvents.length === 0" class="text-center mt-5">
          <h3>Upps! Al parecer no se encontraron eventos disponibles</h3>
        </div>

        
        <div class="px-5 mt-2">
          <b-row>
            <b-col cols="12" md="4" v-for="event in paginatedEvents" :key="event.id" class="mb-4">
              <b-card no-body class="overflow-hidden h-100">
                <b-row no-gutters class="h-100">
                  <b-col lg="6">
                    <b-card-img :src="event.pictures[0]" alt="Image" class="rounded-0"
                      style="height: 100%; object-fit: cover"></b-card-img>
                  </b-col>
                  <b-col lg="6">
                    <b-card-body>
                      <h6 class="font-weight-bold">{{ event.name }}</h6>

                      <b-card-text>
                        <div>
                          <b-icon icon="calendar" class="mr-2"></b-icon>
                          <p>Inicia el {{ formatDate(event.start_date) }}</p>
                          <p>Finaiza el {{ formatDate(event.end_date) }}</p>
                        </div>

                        <!-- category badge -->
                      </b-card-text>

                      <b-badge variant="secondary" class="mt-1 px-3">{{
                        event.category
                      }}</b-badge>

                      <!-- button left see more icon -->
                      <div>
                        <b-button :to="{
                          name: 'public-event-detail',
                          params: { id: event.id },
                        }" variant="outline-secondary" class="mt-3 btn-block" size="sm">
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




      </b-skeleton-wrapper>
    </section>

    <section v-if="filteredEvents.length > 0">
      <div class="overflow-auto px-5 mt-2">
        <div class="text-center">
          <b-pagination v-model="currentPage" :total-rows="filteredEvents.length" :per-page="perPage"
            align="center"></b-pagination>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import Vue, { defineAsyncComponent } from "vue";
import eventsController from "../services/controller/events.controller";
import { formatDate } from "../../../../kernel/moment";

export default Vue.extend({
  name: "ListWorksView",
  components: {
    LoadingCustom: () =>
      import("../../../../views/components/LoadingCustom.vue"),
  },
  data() {
    return {
      isLoading: false,
      listEvents: [],
      currentPage: 1,
      perPage: 6,
      searchTerm: "",
    };
  },
  mounted() {
    this.getListEvents();
  },
  computed: {
    filteredEvents() {
      if (this.searchTerm) {
        return this.listEvents.filter((item) =>
          item.name.toLowerCase().includes(this.searchTerm.toLowerCase())
        );
      }
      return this.listEvents;
    },
    paginatedEvents() {
      const start = (this.currentPage - 1) * this.perPage;
      const end = start + this.perPage;
      return this.filteredEvents.slice(start, end);
    },
  },
  methods: {
    formatDate,
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
