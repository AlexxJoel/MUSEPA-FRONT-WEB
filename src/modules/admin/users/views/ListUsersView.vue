<template>
  <div>
    <loading-custom :isLoading="isLoading" />

    <!-- add iamge  -->
    <section>
      <div
        style="
          background-image: url('https://images.unsplash.com/photo-1644329771977-0a8c6e3928ae?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDF8fHxlbnwwfHx8fHw%3D');
          height: 10vh;
          background-size: cover;
          background-position: center;
        "
        class="d-flex justify-content-center align-items-center"
      >
        <!-- center text in the middle of the screen -->
        <h1 class="p-0 m-0 font-weight-bold">Lista de usuarios</h1>
      </div>
    </section>

    <!--     search and add button -->
    <section>
      <div class="d-flex justify-content-between px-5 mt-3">
        <b-form-group class="w-50">
          <b-input-group>
            <b-form-input
              id="filter-input"
              v-model="filter"
              type="search"
              placeholder="Buscar usuario"
            ></b-form-input>

            <b-input-group-append>
              <b-button :disabled="!filter" @click="filter = ''">
                <b-icon icon="x-square"></b-icon>
              </b-button>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>

        <div>
          <b-button variant="" :to="{ name: 'user-save' }"
            >Agregar usuario &nbsp;
            <b-icon icon="plus-square"></b-icon>
          </b-button>
        </div>
      </div>
    </section>

    <!--     sort and show -->
    <section>
      <div class="d-flex justify-content-between px-5">
        <b-form-group class="w-50" v-slot="{ ariaDescribedby }">
          <b-input-group size="sm">
            <b-form-select
              id="sort-by-select"
              v-model="sortBy"
              :options="sortOptions"
              :aria-describedby="ariaDescribedby"
              class="w-75"
            >
              <template #first>
                <option value="">-- Ninguno --</option>
              </template>
            </b-form-select>

            <b-form-select
              v-model="sortDesc"
              :disabled="!sortBy"
              :aria-describedby="ariaDescribedby"
              size="sm"
              class="w-25"
            >
              <option :value="false">Asc</option>
              <option :value="true">Desc</option>
            </b-form-select>
          </b-input-group>
        </b-form-group>
        <div>
          <b-form-group
            label="Mostrar"
            label-for="per-page-select"
            label-cols-sm="6"
            label-cols-md="4"
            label-cols-lg="3"
            label-align-sm="right"
            label-size="sm"
            class="mb-0"
          >
            <b-form-select
              id="per-page-select"
              v-model="perPage"
              :options="pageOptions"
              size="sm"
            ></b-form-select>
          </b-form-group>
        </div>
      </div>
    </section>

    <!--     table -->
    <section>
      <div class="px-5 mt-2">
        <b-table
          :items="userList"
          :fields="fields"
          :current-page="currentPage"
          :per-page="perPage"
          :filter="filter"
          :filter-included-fields="filterOn"
          :sort-by.sync="sortBy"
          :sort-desc.sync="sortDesc"
          :sort-direction="sortDirection"
          stacked="md"
          show-empty
          small
          @filtered="onFiltered"
        >
          <template #cell(name)="row">
            {{ row.item.name }} {{ row.item.surname }} {{ row.item.lastname }}
          </template>

          <template #cell(actions)="row">
            <!--             <b-button size="sm" @click="info(row.item, row.index, $event.target)" class="mr-1">
              Info modal
            </b-button> -->

            <!-- buttton delete -->
            <b-button
              size="sm"
              @click="deleteUser(row.item.id)"
              variant="danger"
              class="mx-1"
            >
              <b-icon icon="trash"></b-icon>
            </b-button>

            <!-- buttton edit -->
            <b-button
              size="sm"
              :to="{ name: 'user-detail', query: { email: row.item } }"
              variant="primary"
            >
              <b-icon icon="pencil"></b-icon>
            </b-button>
          </template>
        </b-table>
      </div>
    </section>

    <!--     pagination -->
    <section>
      <div class="overflow-auto px-5 mt-2">
        <div class="text-center">
          <b-pagination
            v-model="currentPage"
            :total-rows="totalRows"
            :per-page="perPage"
            size="sm"
            align="center"
            class="my-0"
          ></b-pagination>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import { users } from "../../../../mocks/data-users";
import Vue, { defineAsyncComponent } from "vue";
import { formatDate } from "../../../../kernel/moment";
import SweetAlertCustom from "../../../../kernel/SweetAlertCustom";
import usersController from "../services/controller/users.controller";

export default Vue.extend({
  name: "ListWorksView",
  components: {
    LoadingCustom: () =>
      import("../../../../views/components/LoadingCustom.vue"),
  },
  data() {
    return {
      isLoading: false,
      userList: [],
      searchTerm: "",

      fields: [
        {
          key: "user.username",
          label: "Usuario",
          sortable: true,
          sortDirection: "desc",
        },
        {
          key: "user.email",
          label: "Correo electronico",
          sortable: true,
          sortDirection: "desc",
        },
        {
          key: "name",
          label: "Nombre completo",
          sortable: true,
          sortDirection: "desc",
        },
        { key: "actions", label: "Acciones" },
      ],

      totalRows: 1,
      currentPage: 1,
      perPage: 5,
      pageOptions: [5, 10, 15, { value: 100, text: "Show a lot" }],
      sortBy: "",
      sortDesc: false,
      sortDirection: "asc",
      filter: null,
      filterOn: [],
    };
  },
  mounted() {
    this.getUserList();
  },
  computed: {
    sortOptions() {
      // Create an options list from our fields
      return this.fields
        .filter((f) => f.sortable)
        .map((f) => {
          return { text: f.label, value: f.key };
        });
    },
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
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
    formatDate,
    async getUserList() {
      try {
        this.isLoading = true;
        const response = await usersController.getUsers();
        this.userList = response;
        this.totalRows = this.userList.length;
      } catch (error) {
        console.error("error list user", error);
      } finally {
        this.isLoading = false;
      }
    },
    async deleteUser(id) {
      try {
        SweetAlertCustom.questionMessage().then(async (result) => {
          if (result.isConfirmed) {
            this.isLoading = true;
            const response = await usersController.deleteUser(id);
            if (response.message === "") {
              SweetAlertCustom.successMessage();
              await this.getUserList();
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
