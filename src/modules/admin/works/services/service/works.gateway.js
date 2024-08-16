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
      return response.data;
    } catch (error) {
      return error;
    }
  },

  async findWorkById(workId) {
    try {
      const response = await axios.doGet(`/works/${workId}`);
      console.log(response);
      const data = response.data.data;
      const newData = {
        ...data,
        artists: data.artists.join(","),
        creationDate: data.creation_date,
      }
      return newData;
    } catch (error) {
      return error;
    }
  },

  async updateWork(work) {
    try {
      const newPayload = {
        id: work.id,
        title: work.title,
        description: work.description,
        creation_date: work.creationDate,
        technique: work.technique,
        artists: work.artists.split(","),
        id_museum: 1,
        pictures: work.pictures
      };
      const response = await axios.doPut("/works", newPayload);

      return response.data;
    } catch (error) {
      return error;
    }
  },
};
