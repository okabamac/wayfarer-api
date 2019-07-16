import BookingService from '../services/booking.service';
import ResponseGenerator from '../utilities/response.util';

const response = new ResponseGenerator();

class BookingController {
  /**
   * @param {object} request express request object
   * @param {object} response express request object
   * @returns {json} json
   * @memberof BookingController
   */

  static async addBooking(req, res) {
    try {
      const booking = await BookingService.addBooking(req);
      if (booking) {
        return response.sendSuccess(res, 200, booking);
      }
      return response.sendError(res, 500, 'Something went wrong');
    } catch (err) {
      return response.sendError(res, 400, err.message);
    }
  }

  static async getAll(req, res) {
    try {
      const booking = await BookingService.getBookings(req);
      if (booking) {
        return response.sendSuccess(res, 200, booking);
      }
      return response.sendError(res, 500, 'Something went wrong');
    } catch (err) {
      return response.sendError(res, 400, err.message);
    }
  }

  static async deleteABooking(req, res) {
    try {
      const deletedBooking = await BookingService.deleteBooking(req);
      if (deletedBooking) {
        return response.sendSuccess(res, 200, deletedBooking);
      }
      return response.sendError(res, 500, 'Something went wrong');
    } catch (err) {
      return response.sendError(res, 400, err.message);
    }
  }

  static async changeSeat(req, res) {
    try {
      const changedSeatBooking = await BookingService.modifyBookingSeat(req);
      if (changedSeatBooking) {
        return response.sendSuccess(res, 200, changedSeatBooking);
      }
      return response.sendError(res, 500, 'Something went wrong');
    } catch (err) {
      return response.sendError(res, 400, err.message);
    }
  }
}

export default BookingController;
