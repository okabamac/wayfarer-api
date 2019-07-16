/* eslint-disable camelcase */
import Query from '../utilities/psql.util';

class User extends Query {
  async findUserByParam(param_type, param) {
    try {
      const { rows } = await this.findByOneParam(param_type, [param]);
      return rows;
    } catch (err) {
      throw err;
    }
  }

  async createANewUser(req, is_admin, password) {
    try {
      const { rows } = await this.insertIntoDB(
        'email, first_name, last_name, is_admin, password',
        '$1, $2, $3, $4, $5',
        [req.email, req.first_name, req.last_name, is_admin, password],
      );
      return rows[0];
    } catch (err) {
      throw err;
    }
  }
}

export default User;
