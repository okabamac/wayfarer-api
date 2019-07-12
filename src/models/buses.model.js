/* eslint-disable camelcase */
import Query from '../utilities/psql.util';

class Bus extends Query {
  async findBusById(id) {
    try {
      const { rows } = await this.findByOneParam('bus_id', [id]);
      return rows[0];
    } catch (err) {
      throw err;
    }
  }

  async findAllBuses() {
    try {
      const { rows } = await this.findAll('*');
      return rows;
    } catch (err) {
      throw err;
    }
  }

  async findBusByMultipleParam(req) {
    try {
      const { rows } = await this.findByMultipleParam(
        'number_plate',
        'manufacturer',
        'model',
        'capacity',
        [req.number_plate, req.manufacturer, req.model, req.capacity],
      );
      return rows[0];
    } catch (err) {
      throw err;
    }
  }

  async addANewBus(req, user_id) {
    try {
      const { rows } = await this.insertIntoDB(
        'number_plate, manufacturer, model, year, capacity, registered_by',
        '$1, $2, $3, $4, $5, $6',
        [
          req.number_plate,
          req.manufacturer,
          req.model,
          req.year,
          req.capacity,
          user_id,
        ],
      );
      return rows[0];
    } catch (err) {
      throw err;
    }
  }
}

export default Bus;
