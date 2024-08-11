import ApiEvents from '../service/events.gateway';

export default {
  async getEvents(){
    try {
      const data = await ApiEvents.getEvents();
      return data;
    } catch (error) {
      return Promise.reject(error);
    }
  }, 
  async saveEvent(event){
    try {
      const data = await ApiEvents.saveEvent(event);
      return data;
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async deleteEvent(eventId){
    try {
      const data = await ApiEvents.deleteEvent(eventId);
      return data;
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async findEventById(eventId){
    try {
      const data = await ApiEvents.findEventById(eventId);
      return data;
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async updateEvent(event){
    try {
      const data = await ApiEvents.updateEvent(event);
      return data;
    } catch (error) {
      return Promise.reject(error);
    }
  }
};