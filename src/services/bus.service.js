/* eslint-disable camelcase */
import BusModel from '../models/buses.model';

const Bus = new BusModel('buses');

class BusService {
  /** Add Bus to the db
   * @description Operate on a Trip and his account
   * @param {object} a new bus object
   */

  static async addBus(req) {
    try {
      const foundBus = await Bus.findBusByMultipleParam(req.body);

      if (foundBus) throw new Error('This bus is already registered');

      const newBus = await Bus.addANewBus(req.body, req.user_id);
      return newBus;
    } catch (err) {
      throw err;
    }
  }

  static async getAllBuses() {
    try {
      const allBuses = await Bus.findAllBuses();
      return allBuses;
    } catch (err) {
      throw err;
    }
  }

  static async getOneBus(req) {
    try {
      const bus = await Bus.findBusByParam('bus_id', req.params.bus_id);

      if (!bus[0]) throw new Error('This bus does not exist');

      return bus[0];
    } catch (err) {
      throw err;
    }
  }
}

export default BusService;
