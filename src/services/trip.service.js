/* eslint-disable camelcase */
import Trip from '../models/trip.model';


class Tripservice {
  /** Add Trip to the db
   * @description Operate on a Trip and his account
   * @param {object} a new Trip object
   */

  static async addTrip(req) {
    try {
      const {
        trip_date, bus_id, origin, destination, fare,
      } = req.body;
      const foundTrip = await Trip.filter(trip => trip.bus_id === bus_id
        && trip.origin === origin
        && trip.destination === destination
        && trip.trip_date === trip_date)[0];
      if (foundTrip) {
        throw new Error('This bus is already scheduled for the same trip');
      }
      const newTrip = {
        trip_id: Trip.length + 1,
        bus_id,
        origin,
        destination,
        fare,
        trip_date,
        created_by: req.user_id,
      };
      await Trip.push(newTrip);
      return {
        trip_id: newTrip.trip_id,
        bus_id,
        origin,
        destination,
        fare,
        trip_date,
        created_by: req.user_id,
      };
    } catch (err) {
      throw err;
    }
  }
}

export default Tripservice;
