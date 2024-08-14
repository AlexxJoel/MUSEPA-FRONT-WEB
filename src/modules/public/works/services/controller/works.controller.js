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
  async saveEvent(event){
    try {
      const data = await ApiWorks.saveEvent(event);
      return data;
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async deleteEvent(eventId){
    try {
      const data = await ApiWorks.deleteEvent(eventId);
      return data;
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async findEventById(eventId){
    try {
      const data = await ApiWorks.findEventById(eventId);
      return data;
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async updateEvent(event){
    try {
      const data = await ApiWorks.updateEvent(event);
      return data;
    } catch (error) {
      return Promise.reject(error);
    }
  }
};