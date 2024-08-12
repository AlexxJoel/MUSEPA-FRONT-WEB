/* TODO  implement axios */

import { works } from './data';


export default {
  async getWorks() {
    try {
      const response = await Promise.resolve({ data: {data:works} });
      return response.data.data;
    }
    catch (error) {
      return Promise.reject(error);
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