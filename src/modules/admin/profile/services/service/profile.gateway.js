import { email } from '@vuelidate/validators';
import axios from "../../../../../config/client.gateway";

export default {
  async findManagerByEmail(managerEmail) {
    try {
      const response = await axios.doPost("/managers/details", managerEmail);
      const data = response.data.data;
      const manager = {
        ...data,
        phoneNumber: data.phone_number,
        idUser: data.id_user,
        idMuseum: data.id_museum,
        user: {
          id: data.user.id,
          email: data.user.email,
          username: data.user.username,
          password: data.user.password,
          idRole: data.user.id_role,
        }
      };

      delete manager.phone_number;
      delete manager.id_user;
      delete manager.id_museum;

      return manager;
    } catch (error) {
      return error;
    }
  },


  /**
   * updateManager
   * @param {object} manager {
   *  id: number,
   *  email: string,
   *  password: string,
   *  username: string,
   *  id_role: number,
   *  name: string,
   *  surname: string,
   *  lastname: string,
   *  phone_number: string,
   *  address: string,
   *  birthdate: string,
   *  id_museum: number
   * }
   */

  async updateManager(manager) {
    console.log(email)
    try {
      const managerData = {
        id: manager.id,
        email: manager.user.email,
        password: manager.user.password,
        username: manager.user.username,
        id_role: manager.user.idRole,
        name: manager.name,
        surname: manager.surname,
        lastname: manager.lastname,
        phone_number: manager.phoneNumber,
        address: manager.address,
        birthdate: manager.birthdate,
        id_museum: manager.idMuseum + ""
      };

      const response = await axios.doPut("/managers", managerData);
      return response.data;
    } catch (error) {
      return error;
    }
  },

  async findMuseumById(museumId) {
    try {
      const response = await axios.doGet(`/museums/${museumId}`);
      const data = response.data.data;
      const museum = {
        ...data,
        contactEmail: data.contact_email,
        contactNumber: data.contact_number,
        tariffs: JSON.parse(data.tariffs),
        schedules: JSON.parse(data.schedules),
      };

      delete museum.contact_email;
      delete museum.contact_number;

      return museum;

    } catch (error) {
      return error;
    }
  },

  /**
   * 
   * @param {object} museum {
   *  id: number,
   *  name: string,
   *  location: string,
   *  tariffs: json,
   *  schedules: json,
   *  contact_email: string,
   *  contact_number: string,
   *  id_owner: number,
  *  pictures: array<string>
   * }
   * @returns any
   */

  async updateMuseum(museum) {
    try {


      const museumData = {
        id: museum.id,
        name: museum.name,
        location: museum.location,
        tariffs: JSON.stringify(JSON.stringify(museum.tariffs)),
        schedules: JSON.stringify(JSON.stringify(museum.schedules)),
        contact_email: museum.contactEmail,
        contact_number: museum.contactNumber,
        id_owner: museum.idOwner,
        pictures: museum.pictures
      };

      const response = await axios.doPut(`/museums`, museumData);
      return response
    } catch (error) {
      return error;
    }
  }
};
