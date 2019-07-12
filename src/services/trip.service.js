/* eslint-disable camelcase */
import TripModel from '../models/trips.model';
import BusModel from '../models/buses.model';

const Bus = new BusModel('buses');
const Trip = new TripModel('trips');
class TripService {
  /** Add Trip to the db
   * @description Operate on a Trip and his account
   * @param {object} a new Trip object
   */

  static async addTrip(req) {
    try {
      const bus = await Bus.findBusById(req.body.bus_id);
      if (!bus) {
        throw new Error('This bus does not exist');
      }
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
      if (req.query.origin) {
        const queryTrip = await Trip.findTripByParam('origin', req.query.origin);
        if (!queryTrip) {
          throw new Error('No available results for your search');
        }
        return queryTrip;
      }
      if (req.query.destination) {
        const queryTrip = await Trip.findTripByParam('destination', req.query.destination);
        if (!queryTrip) {
          throw new Error('No available results for your search');
        }
        return queryTrip;
      }
      const allTrips = await Trip.findAllTrips();
      return allTrips;
    } catch (err) {
      throw err;
    }
  }

  static async modifyOneTrip(req) {
    try {
      const modifiedTrip = await Trip.modifyTheTrip(req);
      if (!modifiedTrip) throw new Error('This trip doesn\'t exist');
      return modifiedTrip;
    } catch (err) {
      throw err;
    }
  }
}

export default TripService;
