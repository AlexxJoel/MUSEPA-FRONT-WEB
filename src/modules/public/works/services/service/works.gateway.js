/* TODO  implement axios */

import axios from "../../../../../config/client.gateway";
import { works } from './data';


export default {
  async getWorks() {
    try {
      const response = await axios.doGet("/works");
      return response.data.data;
    }
    catch (error) {
      return error;
    }
  },
  async saveEvent(event) {
    try {
      const response = Promise.resolve({ data: {data:event[0]} });
      return response.data.data;
    }
    catch (error) {
      return Promise.reject(error);
    }
  },

  async deleteEvent(eventId) {
    try {
      const response = Promise.resolve({ data: {data:works.filter(event => event.id !== eventId)} });
      return response.data.data;
    }
    catch (error) {
      return Promise.reject(error);
    }
  },

  async findEventById(eventId) {
    try {
      const response = Promise.resolve({ data: {data:works.find(event => event.id === eventId)} });
      return response.data.data;
    }
    catch (error) {
      return Promise.reject(error);
    }
  }, 

  async updateEvent(event) {
    try {
      const response = Promise.resolve({ data: {data:event} });
      return response.data.data;
    }
    catch (error) {
      return Promise.reject(error);
    }
  }
  


};