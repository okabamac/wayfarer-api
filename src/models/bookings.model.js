/* eslint-disable camelcase */
import Query from '../utilities/psql.util';
import GeneralUtils from "../utilities/general.util";

class Booking extends Query {
  async makeABooking(req, id) {
    try {
      const formatted_date = await GeneralUtils.dateHelper(req.trip_date);
      const { rows } = await this.insertWithSelect(
        'user_id, trip_id, bus_id, trip_date, seat_number, created_on, first_name, last_name, email',
        `${id}, ${req.trip_id}, ${req.bus_id}, '${formatted_date}', ${req.seat_number}, NOW()`,
        'first_name, last_name, email',
        'users',
        'user_id',
        id,
      );
      return rows[0];
    } catch (err) {
      throw err;
    }
  }

  async findBooking(req) {
    try {
      const { rows } = await this.findTripBooking('id', 'trip_id', 'trips', [
        req.trip_id,
      ]);
      return rows;
    } catch (err) {
      throw err;
    }
  }

  async findAllBookings() {
    try {
      const { rows } = await this.findAll('*');
      return rows;
    } catch (err) {
      throw err;
    }
  }

  async findBookingByID(id) {
    try {
      const { rows } = await this.findByOneParam('user_id', [id]);
      return rows;
    } catch (err) {
      throw err;
    }
  }

  async findBookingToDelete(req) {
    try {
      const { rows } = await this.deleteByParam('id', 'user_id', [Number(req.params.booking_id), req.user_id]);
      return rows[0];
    } catch (err) {
      throw err;
    }
  }
}

export default Booking;
