/* TODO  implement axios */

import axios from "../../../../../config/client.gateway";
import { generateRandomPassword } from "../../../../../kernel/fucntions";

export default {
  async getUsers() {
    try {
      const response = await axios.doGet("/visitors");
      console.log("reponse visitors gateway", response);
      return response.data.data;
    } catch (error) {
      return error;
    }
  },
  async saveUser(payload) {
    try {
      const temporaryPassword = generateRandomPassword();
      console.log("temporaryPassword", payload);
      const newPayload = {
        name: payload.name,
        surname: payload.surname,
        lastname: payload.lastname,
        username: payload.username,
        email: payload.email,
        password: temporaryPassword,
      };
      const response = await axios.doPost("/visitors", newPayload);
      if (response.data === null) return response;
      return response.data;
    } catch (error) {
      return error;
    }
  },

  async deleteUser(userId) {
    try {
      const response = await axios.doDelete(`/visitors/${userId}`);
      return response.data;
    } catch (error) {
      return error;
    }
  },

  async findEventById(eventId) {
    try {
      const response = Promise.resolve({
        data: { data: users.find((event) => event.id === eventId) },
      });
      return response.data.data;
    } catch (error) {
      return Promise.reject(error);
    }
  },

  async findUserByEmail(userEmail) {
    try {
      const response = await axios.doPost("visitors/details", userEmail);
      return response.data.data;
    } catch (error) {
      return error;
    }
  },

  async updateUser(user) {
    try {
      const response = await axios.doPut('/visitors', user);
      if (response.data === null) return response;
      return response.data;
    } catch (error) {
      return error;
    }
  },
};
