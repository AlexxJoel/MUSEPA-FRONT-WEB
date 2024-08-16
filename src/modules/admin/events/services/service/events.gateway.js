/* TODO  implement axios */

import { events } from "./data";
import axios from "../../../../../config/client.gateway";

export default {
  async getEvents() {
    try {
      const response = await axios.doGet("/events");
      return response.data.data;
    } catch (error) {
      return error;
    }
  },
  async saveEvent(event) {
    try {
      const newPayload = {
        name: event.name,
        description: event.description,
        start_date: event.startDate,
        end_date: event.endDate,
        category: event.category,
        pictures: event.pictures.map((picture) => picture.dataURL),
        id_museum: "1",
      };
      const response = await axios.doPost("/events", newPayload);
      return response.data;
    } catch (error) {
      return error;
    }
  },

  async deleteEvent(eventId) {
    try {
      const response = await axios.doDelete(`/events/${eventId}`);
      return response.data;
    } catch (error) {
      return error;
    }
  },

  async findEventById(eventId) {
    try {
      const response = await axios.doGet(`/events/${eventId}`);
      return response.data.data;
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async updateEvent(event) {
    try {
      const newPayload = {
        id: event.id,
        name: event.name,
        description: event.description,
        start_date: event.startDate,
        end_date: event.endDate,
        category: event.category,
        pictures: event.picture,
        id_museum: "1",
      };

      const response = await axios.doPut("/events", newPayload);

      return response.data;

    } catch (error) {
      return Promise.reject(error);
    }
  },
};
