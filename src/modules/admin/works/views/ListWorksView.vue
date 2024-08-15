<template>
  <div>
    <loading-custom :isLoading="isLoading" />

    <!-- add iamge  -->
    <section>
      <div
        style="
          background-image: url('https://images.unsplash.com/photo-1514905552197-0610a4d8fd73?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
          height: 25vh;
          background-size: cover;
          background-position: center;
        "
        class="d-flex justify-content-center align-items-center"
      >
        <!-- center text in the middle of the screen -->
        <h1 class="p-0 m-0 font-weight-bold">Lista de Obras</h1>
      </div>
    </section>

    <!-- search and add button -->
    <section>
      <div class="d-flex justify-content-between px-5 mt-3">
        <b-form-group class="w-50">
          <!-- Search and icon right -->
          <b-input-group>
            <b-form-input placeholder="Buscar obra..." v-model="searchTerm" />
            <b-input-group-append>
              <b-button variant="outline-secondary">
                <b-icon icon="search"></b-icon>
              </b-button>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
        <div>
          <b-button variant="" :to="{ name: 'work-save' }"
            >Agregar obra &nbsp;
            <b-icon icon="plus-square"></b-icon>
          </b-button>
        </div>
      </div>
    </section>

    <section>
      <!-- Cards with image left and info right -->
      <div class="px-5 mt-2">
        <b-row>
          <b-col
            cols="12"
            md="4"
            v-for="work in paginatedWorks"
            :key="work.id"
            class="mb-4"
          >
            <b-card no-body class="overflow-hidden h-100">
              <!-- delete  -->

              <div>
                <b-button
                  @click="deleteWork(work.id)"
                  variant="outline-danger"
                  class="btn-delete-event"
                  size="sm"
                >
                  <b-icon icon="trash"></b-icon>
                </b-button>
              </div>

              <b-row no-gutters class="h-100">
                <b-col lg="6">
                  <b-card-img
                    :src="
                      work.pictures
                        ? work.pictures[0]
                        : 'https://images.unsplash.com/photo-1574514120529-364d014b9a0a?q=80&w=1335&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                    "
                    alt="Image"
                    class="rounded-0"
                    style="height: 100%; object-fit: cover"
                  ></b-card-img>
                </b-col>
                <b-col lg="6">
                  <b-card-body>
                    <h6 class="font-weight-bold">{{ work.title }}</h6>

                    <b-card-text>
                      <div>
                        <p>{{ work.description }}</p>
                        <span class="font-weight-bold text-secondary"
                          >Artistas:
                        </span>
                        <p>{{ work.artists.join(", ") }}</p>
                        <b-icon icon="calendar" class="mr-2"></b-icon>
                        <p>
                          <span class="font-weight-bold text-secondary"
                            >Fecha de creación:</span
                          >
                          {{ formatDate(work.creation_date) }}
                        </p>
                      </div>

                      <!-- category badge -->
                    </b-card-text>

                    <!-- TODO: limit the text to the content -->
                    <b-badge variant="secondary" class="mt-1 px-3">
                      <span>{{ work.technique }}</span>
                    </b-badge>

                    <!-- button left see more icon -->
                    <div>
                      <b-button
                      :to="{ name: 'work-detail', params: { id: work.id } }"
                        variant="outline-secondary"
                        class="mt-3 btn-block"
                        size="sm"
                      >
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

    <section>
      <div class="overflow-auto px-5 mt-2">
        <div class="text-center">
          <b-pagination
            v-model="currentPage"
            :total-rows="filteredWorks.length"
            :per-page="perPage"
            align="center"
          ></b-pagination>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import Vue, { defineAsyncComponent } from "vue";
import worksController from "../services/controller/works.controller";
import { formatDate } from "../../../../kernel/moment";
import SweetAlertCustom from "../../../../kernel/SweetAlertCustom";

export default Vue.extend({
  name: "ListWorksView",
  components: {
    LoadingCustom: () =>
      import("../../../../views/components/LoadingCustom.vue"),
  },
  data() {
    return {
      isLoading: false,
      listWorks: [],
      currentPage: 1,
      perPage: 6,
      searchTerm: "",
    };
  },
  mounted() {
    this.getListWorks();
  },
  computed: {
    filteredWorks() {
      if (this.searchTerm) {
        return this.listWorks.filter((work) => {
          return work.title
            .toLowerCase()
            .includes(this.searchTerm.toLowerCase());
        });
      }
      return this.listWorks;
    },
    paginatedWorks() {
      const start = (this.currentPage - 1) * this.perPage;
      const end = start + this.perPage;
      return this.filteredWorks.slice(start, end);
    },
  },
  methods: {
    formatDate,
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
    async deleteWork(id) {
      try {
        SweetAlertCustom.questionMessage().then(async (result) => {
          if (result.isConfirmed) {
            this.isLoading = true;
            const response = await worksController.deleteWork(id);
            if (response.message === "Work deleted successfully") {
              SweetAlertCustom.successMessage();
              await this.getListWorks();
            }
          }
        });
      } catch (error) {
        console.log(error);
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

.btn-delete-event {
  position: absolute;
  top: 0;
  right: 0;
  z-index: 1;
}
</style>
