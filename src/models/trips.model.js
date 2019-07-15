/* eslint-disable camelcase */
import Query from '../utilities/psql.util';
import GeneralUtils from "../utilities/general.util";
class Trip extends Query {
  async findTripByParam(paramType, param) {
    try {
      const { rows } = await this.findByOneParam(paramType, [param]);
      return rows;
    } catch (err) {
      throw err;
    }
  }

  async findAllTrips() {
    try {
      const { rows } = await this.findAll('*');
      return rows;
    } catch (err) {
      throw err;
    }
  }

  async modifyTheTrip(req) {
    try {
      const { rows } = await this.modify([
        'cancelled',
        Number(req.params.trip_id),
      ]);
      return rows[0];
    } catch (err) {
      throw err;
    }
  }

  async findTripByMultipleParam(req) {
    try {
      const { rows } = await this.findByMultipleParam(
        'bus_id',
        'origin',
        'destination',
        'trip_date',
        [req.bus_id, req.origin, req.destination, req.trip_date],
      );
      return rows[0];
    } catch (err) {
      throw err;
    }
  }

  async createANewTrip(req, user_id) {
    try {
      const formatted_date = await GeneralUtils.dateHelper(req.trip_date);
      const { rows } = await this.insertWithSelect(
        'bus_id, origin, destination, fare, trip_date, status, created_by, bus_capacity',
        `${req.bus_id}, '${req.origin}', '${req.destination}', ${
          req.fare
        }, '${formatted_date}', '${
          req.status
        }', ${user_id}`,
        'capacity',
        'buses',
        'bus_id',
        `${req.bus_id}`,
      );
      return rows[0];
    } catch (err) {
      throw err;
    }
  }
}

export default Trip;
