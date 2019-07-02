/* eslint-disable camelcase */
import User from '../models/user.model';
import GeneralUtils from '../utils/general.utilities';
import Auth from '../middlewares/auth';

class Userservice {
  /** Add user to the db
   * @description Operate on a user and his account
   * @body {object} a new user object
   */

  static async addUser(req) {
    try {
      const foundUser = await User.filter(user => user.email === req.email)[0];
      if (foundUser) {
        throw new Error('Email is already in use');
      }
      const {
        first_name, last_name, is_admin, email,
      } = req;
      const password = await GeneralUtils.hash(req.password);
      const newUser = {
        user_id: User.length + 1,
        first_name,
        last_name,
        email,
        is_admin,
        password,
      };
      const token = await Auth.signJwt({ user_id: newUser.user_id, is_admin });
      await User.push(newUser);
      return {
        token,
        user_id: newUser.user_id,
        first_name,
        last_name,
        is_admin,
        email,
      };
    } catch (err) {
      throw err;
    }
  }

  /** Signs user into account
   * @description signs user into their account
   * @body {object} a new user object
   */

  static async login(req) {
    try {
      const foundUser = await User.filter(user => user.email === req.email)[0];
      if (foundUser) {
        const bycrptResponse = GeneralUtils.validate(
          req.password,
          foundUser.password,
        );
        if (bycrptResponse) {
          const {
            user_id, first_name, last_name, is_admin, email,
          } = foundUser;
          const token = await Auth.signJwt({
            user_id,
            is_admin,
          });
          return {
            token,
            user_id,
            first_name,
            last_name,
            email,
            admin: is_admin,
          };
        }
      }
      throw new Error('Invalid credentials');
    } catch (err) {
      throw err;
    }
  }
}

export default Userservice;
