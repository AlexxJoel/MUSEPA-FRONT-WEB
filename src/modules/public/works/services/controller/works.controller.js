import ApiWorks from '../service/works.gateway';

export default {
  async getWorks(){
    try {
      const data = await ApiWorks.getWorks();
      return data;
    } catch (error) {
      return error;
    }
  }, 
  async saveWors(event){
    try {
      const data = await ApiWorks.saveEvent(event);
      return data;
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async deleteWork(eventId){
    try {
      const data = await ApiWorks.deleteEvent(eventId);
      return data;
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async findWorkById(eventId){
    try {
      const data = await ApiWorks.findWorkById(eventId);
      return data;
    } catch (error) {
      return error;
    }
  },
  async updateWork(event){
    try {
      const data = await ApiWorks.updateEvent(event);
      return data;
    } catch (error) {
      return Promise.reject(error);
    }
  }
};