import ApiWorks from "../service/works.gateway";

export default {
  async getWorks() {
    try {
      const data = await ApiWorks.getWorks();
      return data;
    } catch (error) {
      return error;
    }
  },
  async saveWork(event) {
    try {
      const data = await ApiWorks.saveWork(event);
      return data;
    } catch (error) {
      return errror;
    }
  },
  async deleteWork(workId) {
    try {
      const data = await ApiWorks.deleteWork(workId);
      return data;
    } catch (error) {
      return error;
    }
  },
  async findWorkById(workId) {
    try {
      const data = await ApiWorks.findWorkById(workId);
      return data;
    } catch (error) {
      return error;
    }
  },
  async updateEvent(event) {
    try {
      const data = await ApiWorks.updateEvent(event);
      return data;
    } catch (error) {
      return Promise.reject(error);
    }
  },
};
