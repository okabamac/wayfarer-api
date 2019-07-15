/* eslint-disable camelcase */
import bcrypt from 'bcryptjs';

const General = {

  /**
   * @description - clean date for psql
   * @param {object}
   * @returns {object}
   */
  dateHelper(date) {
    try {
      const trip_datetime = date;
      const formatted_date = `${trip_datetime.getFullYear()}-${trip_datetime.getMonth()
        + 1}-${trip_datetime.getDate()} ${trip_datetime.getHours()}:${trip_datetime.getMinutes()}:${trip_datetime.getSeconds()}`;
      return formatted_date;
    } catch (err) {
      throw err;
    }
  },
  /**
   * @description - validate password by comparing password with hash password
   * @param {string} password
   * @param {string} hashpassword
   * @returns {boolean} boolean to show if password match or not
   */
  validate(password, userPassword) {
    return bcrypt.compareSync(password, userPassword);
  },
  /**
   * @description - encypt password
   * @param {object} password
   * @returns {object} hashpassword
   */
  hash(password) {
    const salt = bcrypt.genSaltSync(10);
    try {
      return bcrypt.hashSync(password, salt);
    } catch (error) {
      throw error;
    }
  },
  /**
   * @description - remove null key from ab object
   * @param {object}
   * @returns {object}
   */
  stripNull(obj) {
    let cleanObj = {};

    Object.keys(obj).forEach((val) => {
      const newVal = obj[val];
      cleanObj = newVal ? { ...cleanObj, [val]: newVal } : cleanObj;
    });

    return cleanObj;
  },
};

export default General;
