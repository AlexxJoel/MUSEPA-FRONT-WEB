/* TODO  implement axios */

import { works } from "./data";
import axios from "../../../../../config/client.gateway";

export default {
  async getWorks() {
    try {
      const response = await axios.doGet("/works");
      return response.data.data;
    } catch (error) {
      return error;
    }
  },
  async saveWork(work) {
    try {
      const newPayload = {
        title: work.title,
        description: work.description,
        creation_date: work.creationDate,
        technique: work.technique,
        artists: work.artists.split(","),
        id_museum: 1,
        pictures: work.pictures.map((picture) => picture.dataURL),
      };
      const response = await axios.doPost("/works", newPayload);

      return response.data;
    } catch (error) {
      return error;
    }
  },

  async deleteWork(workId) {
    try {
      const response = await axios.doDelete(`/works/${workId}`);
      console.log("works gateway",response);
      return response.data;
    } catch (error) {
      return error;
    }
  },

  async findEventById(eventId) {
    try {
      const response = Promise.resolve({
        data: { data: works.find((event) => event.id === eventId) },
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
