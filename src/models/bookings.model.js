/* eslint-disable camelcase */
import Query from '../utilities/psql.util';
import General from '../utilities/general.util';

class Booking extends Query {
  async makeABooking(req, id) {
    const formatted_date = General.dateHelper(req.trip_date);
    try {
      const { rows } = await this.insertWithSelect(
        'user_id, trip_id, bus_id, trip_date, seat_number, created_on, first_name, last_name, email',
        `${id}, ${req.trip_id}, ${req.bus_id}, '${formatted_date}', ${
          req.seat_number
        }, NOW()`,
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

  async findBooking(param) {
    try {
      const { rows } = await this.findTripBooking('id', 'trip_id', 'trips', [
        param,
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

  async findBookingByParam(param_type, param) {
    try {
      const { rows } = await this.findByOneParam(param_type, [param]);
      return rows;
    } catch (err) {
      throw err;
    }
  }

  async findUserBooking(req) {
    try {
      const { rows } = await this.findByTwoParam('id', 'user_id', [
        req.params.booking_id,
        req.user_id,
      ]);
      return rows;
    } catch (err) {
      throw err;
    }
  }

  async findBookingToDelete(req) {
    try {
      const { rows } = await this.deleteByParam('id', 'user_id', [
        req.params.booking_id,
        req.user_id,
      ]);
      return rows[0];
    } catch (err) {
      throw err;
    }
  }

  async updateSeat(id, user, seat) {
    try {
      const { rows } = await this.updateSeatNumber([
        id,
        user,
        seat,
      ]);
      return rows[0];
    } catch (err) {
      throw err;
    }
  }
}

export default Booking;
