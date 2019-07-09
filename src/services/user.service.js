/* eslint-disable camelcase */
import UserModel from '../models/users.model';
import GeneralUtils from '../utilities/general.util';
import Auth from '../middlewares/auth';

const User = new UserModel('users');
class Userservice {
  /** Add user to the db
   * @description Operate on a user and his account
   * @param {object} a new user object
   */

  static async addUser(req) {
    try {
      const foundUser = await User.findUserByEmail(req.body.email);
      if (foundUser) {
        throw new Error('Email is already in use');
      }
      const {
        is_admin,
      } = req.body;
      const password = await GeneralUtils.hash(req.body.password);
      const newUser = await User.createANewUser(req.body, is_admin || false, password);
      const token = await Auth.signJwt({ user_id: newUser.user_id, is_admin });
      return {
        token,
        user_id: newUser.user_id,
        first_name: newUser.first_name,
        last_name: newUser.last_name,
        is_admin: newUser.is_admin,
        email: newUser.email,
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
      const foundUser = await User.findUserByEmail(req.body.email);
      if (foundUser) {
        const bycrptResponse = GeneralUtils.validate(
          req.body.password,
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
            is_admin,
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
