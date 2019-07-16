/* eslint-disable camelcase */
import BookingModel from '../models/bookings.model';
import TripModel from '../models/trips.model';

const Booking = new BookingModel('bookings');
const Trip = new TripModel('trips');

class Bookingservice {
  /** Add booking to the db
   * @description Operate on a Booking and his account
   * @param {object} a new booking object
   */

  static async addBooking(req) {
    try {
      const foundBooking = await Booking.findBooking(req.body.trip_id);
      await Bookingservice.runBookingCheck(foundBooking);
      // If no booking exist
      if (!foundBooking[0].trip_date) {
        const findTrip = await Trip.findTripByParam('id', req.body.trip_id);
        req.body.trip_date = findTrip[0].trip_date;
        req.body.bus_id = findTrip[0].bus_id;
        req.body.seat_number = 2;
        const newBooking = await Booking.makeABooking(req.body, req.user_id);
        return newBooking;
      }
      // If booking exist
      req.body.trip_date = foundBooking[0].trip_date;
      req.body.bus_id = foundBooking[0].bus_id;
      const seats = await Bookingservice.checkSeat(foundBooking);

      const [assignedSeat] = seats;
      req.body.seat_number = assignedSeat;
      const newBooking = await Booking.makeABooking(req.body, req.user_id);
      return newBooking;
    } catch (err) {
      throw err;
    }
  }

  static async getBookings(req) {
    try {
      if (req.is_admin) {
        const allBookings = await Booking.findAllBookings();
        return allBookings;
      }
      const userBookings = await Booking.findBookingByParam('user_id', req.user_id);
      return userBookings;
    } catch (err) {
      throw err;
    }
  }

  static async deleteBooking(req) {
    try {
      const booking = await Booking.findBookingToDelete(req);
      if (!booking) throw new Error("You don't seem to have access to this booking");

      booking.message = 'Booking deleted successfully';
      return booking;
    } catch (err) {
      throw err;
    }
  }

  static async runBookingCheck(foundBooking) {
    if (!foundBooking[0]) throw new Error('This trip is not available');

    if (foundBooking[0].status === 'cancelled') throw new Error('This trip has been cancelled');

    if (foundBooking.length === foundBooking[0].bus_capacity - 1) throw new Error('No more available seats on this trip');
  }

  static async checkSeat(bookings) {
    try {
      const seats = [];
      const bookedSeats = [];
      // eslint-disable-next-line no-plusplus
      for (let i = 2; i <= bookings[0].bus_capacity; i++) {
        seats.push(i);
      }
      bookings.map((booking) => {
        bookedSeats.push(booking.seat_number);
      });
      const availableSeats = seats.filter(seat => !bookedSeats.includes(seat));
      return availableSeats;
    } catch (err) {
      throw err;
    }
  }

  static async modifyBookingSeat(req) {
    try {
      const booking = await Booking.findUserBooking(req);
      if (!booking[0]) throw new Error("You don't seem to have made any booking with that ID");

      const foundBooking = await Booking.findBooking(booking[0].trip_id);
      const seats = await Bookingservice.checkSeat(foundBooking);

      if (seats.length === 0) throw new Error('Sorry, all the seats are filled');
      if (req.body.seat_number > foundBooking[0].bus_capacity) throw new Error('Invalid seat number');
      if (!seats.includes(req.body.seat_number)) throw new Error(`Select from this available seats: [${seats}]`);

      const changedSeat = await Booking.updateSeat(
        booking[0].id, req.user_id, req.body.seat_number,
      );
      changedSeat.message = 'Seat changed successfully';
      return changedSeat;
    } catch (err) {
      throw err;
    }
  }
}

export default Bookingservice;
