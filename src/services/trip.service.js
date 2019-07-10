/* eslint-disable camelcase */
import TripModel from '../models/trips.model';

const Trip = new TripModel('trips');
class TripService {
  /** Add Trip to the db
   * @description Operate on a Trip and his account
   * @param {object} a new Trip object
   */

  static async addTrip(req) {
    try {
      const foundTrip = await Trip.findTripByMultipleParam(req.body);
      if (foundTrip) {
        throw new Error('This bus is already scheduled for the same trip');
      }
      const newTrip = await Trip.createANewTrip(req.body, req.user_id);
      return newTrip;
    } catch (err) {
      throw err;
    }
  }

  static async getAllTrips(req) {
    try {
      const allTrips = await Trip.findAllTrips();
      return allTrips;
    } catch (err) {
      throw err;
    }
  }
}

export default TripService;
