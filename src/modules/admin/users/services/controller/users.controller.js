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
  async saveUser(payload) {
    try {
      const data = await ApiUsers.saveUser(payload);
      return data;
    } catch (error) {
      return error;
    }
  },
  async deleteUser(userId) {
    try {
      const data = await ApiUsers.deleteUser(userId);
      return data;
    } catch (error) {
      return error;
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
  async findUserByEmail(userEmail) {
    try {
      const data = await ApiUsers.findUserByEmail(userEmail);
      return data;
    } catch (error) {
      return error;
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
