import axios from "../../../../../config/client.gateway";

export default {
  async findManagerByEmail(managerEmail) {
    try {
      const response = await axios.doPost("/managers/details", managerEmail);
      return response.data.data;
    } catch (error) {
      return error;
    }
  },
  async findMuseumById(museumId) {
    try {
      const response = await axios.doGet(`/museums/${museumId}`);
      return response.data.data;
    } catch (error) {
      return error;
    }
  },
};
