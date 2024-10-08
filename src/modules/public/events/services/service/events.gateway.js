import axios from "../../../../../config/client.gateway";
import { events } from "./data";

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
      const response = Promise.resolve({ data: { data: event[0] } });
      return response.data.data;
    } catch (error) {
      return Promise.reject(error);
    }
  },

  async deleteEvent(eventId) {
    try {
      const response = Promise.resolve({
        data: { data: events.filter((event) => event.id !== eventId) },
      });
      return response.data.data;
    } catch (error) {
      return Promise.reject(error);
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
      const response = Promise.resolve({ data: { data: event } });
      return response.data.data;
    } catch (error) {
      return Promise.reject(error);
    }
  },
};
