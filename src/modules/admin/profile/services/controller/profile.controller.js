import ProfileApi from "../service/profile.gateway";

export default {
  async findManagerByEmail(managerEmail) {
    try {
      const data = await ProfileApi.findManagerByEmail(managerEmail);
      return data;
    } catch (error) {
      return error;
    }
  },
  async findMuseumById(museumId) {
    try {
      const data = await ProfileApi.findMuseumById(museumId);
      return data;
    } catch (error) {
      return error;
    }
  },
};
