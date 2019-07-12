import BusService from '../services/bus.service';
import ResponseGenerator from '../utilities/response.util';

const response = new ResponseGenerator();

class BusController {
  /**
   * @param {object} request express request object
   * @param {object} response express request object
   * @returns {json} json
   * @memberof BusController
   */

  static async addBus(req, res) {
    try {
      const bus = await BusService.addBus(req);
      if (bus) {
        return response.sendSuccess(res, 200, bus);
      }
      return response.sendError(res, 500, 'Something went wrong');
    } catch (err) {
      return response.sendError(res, 400, err.message);
    }
  }

  static async getAll(req, res) {
    try {
      const bus = await BusService.getAllBuses(req);
      if (bus) {
        return response.sendSuccess(res, 200, bus);
      }
      return response.sendError(res, 500, 'Something went wrong');
    } catch (err) {
      return response.sendError(res, 400, err.message);
    }
  }

  static async getOne(req, res) {
    try {
      const bus = await BusService.getOneBus(req);
      if (bus) {
        return response.sendSuccess(res, 200, bus);
      }
      return response.sendError(res, 500, 'Something went wrong');
    } catch (err) {
      return response.sendError(res, 400, err.message);
    }
  }
}

export default BusController;
