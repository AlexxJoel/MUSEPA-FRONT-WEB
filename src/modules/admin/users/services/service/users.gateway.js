/* TODO  implement axios */

import axios from "../../../../../config/client.gateway";

export default {
  async getUsers() {
    try {
      const response = await axios.doGet("/visitors");
      return response.data.data;
    } catch (error) {
      throw error;
    }
  },
  async saveUser(user) {
    try {
      const newPayload = {
        title: user.title,
        description: user.description,
        creation_date: user.creationDate,
        technique: user.technique,
        artists: user.artists.split(","),
        id_museum: 1,
        pictures: user.pictures.map((picture) => picture.dataURL),
      };
      const response = await axios.doPost("/visitors", newPayload);

      return response.data;
    } catch (error) {
      return error;
    }
  },

  async deleteEvent(eventId) {
    try {
      const response = Promise.resolve({
        data: { data: users.filter((event) => event.id !== eventId) },
      });
      return response.data.data;
    } catch (error) {
      return Promise.reject(error);
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

  async updateEvent(event) {
    try {
      const response = Promise.resolve({ data: { data: event } });
      return response.data.data;
    } catch (error) {
      return Promise.reject(error);
    }
  },
};
