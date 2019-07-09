/* eslint-disable camelcase */
import Query from '../utilities/psql.util';

class Trip extends Query {
  async findTripById(id_type, id) {
    try {
      const { rows } = await this.findByOneParam(id_type, id);
      return rows[0];
    } catch (err) {
      throw err;
    }
  }

  async findAllTrips() {
    try {
      const { rows } = await this.findAll();
      return rows;
    } catch (err) {
      throw err;
    }
  }

  async findTripByMultipleParam(req) {
    try {
      const { rows } = await this.findByMultipleParam('bus_id', 'origin', 'destination', 'trip_date',
        [req.bus_id, req.origin, req.destination, req.trip_date]);
      return rows[0];
    } catch (err) {
      throw err;
    }
  }

  async createANewTrip(req, user_id) {
    try {
      const { rows } = await this.insertIntoDB(
        'bus_id, origin, destination, fare, trip_date, status, created_by',
        '$1, $2, $3, $4, $5, $6, $7',
        [req.bus_id, req.origin, req.destination, req.fare, req.trip_date, req.status, user_id],
      );
      return rows[0];
    } catch (err) {
      throw err;
    }
  }
}

export default Trip;
