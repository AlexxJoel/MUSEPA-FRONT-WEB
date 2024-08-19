import axios from "../../../../../config/client.gateway";

export default {

  /**
   * findMuseumById
   * @param {number} id 
   * @returns any
   */

  async findMuseumById(id) {
    try {
      const response = await axios.doGet(`/museums/${id}`);
      const data = response.data.data;
      const museum = {
        ...data,
        tariffs: JSON.parse(data.tariffs),
        schedules: JSON.parse(data.schedules),
      }
      return museum;
    } catch (error) {
      return error;
    }
  },
};
