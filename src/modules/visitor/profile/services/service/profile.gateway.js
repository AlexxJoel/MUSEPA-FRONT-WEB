import axios from "../../../../../config/client.gateway";

export default {

  /**
   * find visitor by email
   * @param {string} email 
   * @returns  any
   */

  async findVisitorByEmail(email) {
    try {
      const response = await axios.doPost("/visitors/details", {
        email: email,
      });

      const data = response.data.data;

      const visitor = {
        id: data.id,
        name: data.name,
        surname: data.surname,
        lastname: data.lastname,
        favorites: data.favorites,
        idUser: data.id_user,
        user: {
          id: data.user.id,
          email: data.user.email,
          username: data.user.username,
          idRole: data.user.id_role,
        },
      };

      return visitor;
    } catch (error) {
      return error;
    }
  },



  /**
   * update favorites records of visitor
   * @param {any} visitor {
    "id": string, 
    "favorites": array<string>
    }

   * @returns  any
   */

  async updateVisitorFavorites(visitor) {
    try {
      const response = await axios.doPut("/visitors/4/favorite", {
        id: visitor.id + "",
        favorites: visitor.favorites,
      });

      return response.data;
    } catch (error) {
      return error;
    }
  }
};
