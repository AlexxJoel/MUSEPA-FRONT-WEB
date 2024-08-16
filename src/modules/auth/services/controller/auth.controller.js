import ApiService from "../service/auth.gateway";

export default {
  async login(payload) {
    try {
      const data = await ApiService.login(payload);
      return data;
    } catch (error) {
      throw error;
    }
  },
  async signUp(payload) {
    try {
      const data = await ApiService.signUp(payload);
      return data;
    } catch (error) {
      console.log("error controller", error);
      return error;
    }
  },
};
