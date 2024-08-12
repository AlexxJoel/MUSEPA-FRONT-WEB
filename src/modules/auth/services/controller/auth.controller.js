import ApiService from "../service/auth.gateway";

export default {
  async login(payload) {
    try {
      const data = await ApiService.login(payload);
      console.log("controller", data);
      return data;
    } catch (error) {
      console.log("error controller", error);
      return error;
      //   return {
      //     code: error.status,
      //     error: true,
      //     message: error.message,
      //   };
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
