import ApiUsers from "../service/users.gateway";

export default {
  async getUsers() {
    try {
      const data = await ApiUsers.getUsers();
      return data;
    } catch (error) {
      throw error;
    }
  },
  async saveUser(event) {
    try {
      const data = await ApiUsers.saveUser(event);
      return data;
    } catch (error) {
      return error;
    }
  },
  async deleteEvent(eventId) {
    try {
      const data = await ApiUsers.deleteEvent(eventId);
      return data;
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async findEventById(eventId) {
    try {
      const data = await ApiUsers.findEventById(eventId);
      return data;
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async updateEvent(event) {
    try {
      const data = await ApiUsers.updateEvent(event);
      return data;
    } catch (error) {
      return Promise.reject(error);
    }
  },
};
