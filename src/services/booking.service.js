/* eslint-disable camelcase */
import BookingModel from '../models/bookings.model';

const Booking = new BookingModel('bookings');

class Bookingservice {
  /** Add booking to the db
   * @description Operate on a Booking and his account
   * @param {object} a new booking object
   */

  static async addBooking(req) {
    try {
      const foundBooking = await Booking.findBooking(req.body);
      if (!foundBooking[0]) {
        throw new Error('This trip is not available');
      }
      if (foundBooking[0].status === 'cancelled') {
        throw new Error('This trip has been cancelled');
      }
      if (foundBooking.length === foundBooking[0].bus_capacity) {
        throw new Error('No more available seats on this trip');
      }
      if (req.body.seat_number > foundBooking[0].bus_capacity) {
        throw new Error(
          `This seat number doesn't exist, choose between 1-${
            foundBooking[0].bus_capacity
          }`,
        );
      }
      foundBooking.map((booking) => {
        if (booking.seat_number === req.body.seat_number) {
          throw new Error('This seat has been booked');
        }
      });
      req.body.trip_date = foundBooking[0].trip_date;
      req.body.bus_id = foundBooking[0].bus_id;
      const newBooking = await Booking.makeABooking(req.body, req.user_id);
      return newBooking;
    } catch (err) {
      if (err.constraint === 'pk_booking_id') throw new Error("Sorry, you can't book more than once on the same trip");
      throw err;
    }
  }
}

export default Bookingservice;
