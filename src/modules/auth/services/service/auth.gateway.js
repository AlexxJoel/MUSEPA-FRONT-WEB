import { email } from "@vuelidate/validators";
import axios from "../../../../config/client.gateway";
import { generateRandomPassword } from "../../../../kernel/fucntions";
import CustomError from '../../../../kernel/ErrorCustom';



export default {
  async login(payload) {
    try {
      const response = await axios.doPost("/auth/login", {
        username: payload.username,
        password: payload.password,
      });
      if (response.data === null) return response;
      return response.data;
    } catch (error) {
      throw new CustomError(error.status, error.data.error);
    }
  },
  async signUp(payload) {
    try {
      const temporaryPassword = generateRandomPassword();
      const newPayload = {
        name: payload.name,
        surname: payload.surname,
        lastname: payload.lastName,
        username: payload.username,
        email: payload.email,
        password: temporaryPassword,
      };
      const response = await axios.doPost("/visitors", newPayload);
      if (response.data === null) return response;
      return response.data;
    } catch (error) {
      console.log(error);
      return error;
    }
  },
};
