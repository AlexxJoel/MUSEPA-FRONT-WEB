import MuseumApi from "../service/museum.gateway";

export default {
  async findMuseumById(id) {
    try {
      const data = await MuseumApi.findMuseumById(id);
      return data;
    } catch (error) {
      return error;
    }
  },
};
