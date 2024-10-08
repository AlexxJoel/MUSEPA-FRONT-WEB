import ProfileApi from "../service/profile.gateway";

export default {
  async findVisitorByEmail(email) {
    try {
      const data = await ProfileApi.findVisitorByEmail(email);
      return data;
    } catch (error) {
      return error;
    }
  },

  async updateVisitorFavorites(visitor) {
    try {
      const data = await ProfileApi.updateVisitorFavorites(visitor);
      return data;
    } catch (error) {
      return error;
    }
  },
};
