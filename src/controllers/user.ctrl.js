import UserService from '../services/user.service';
import ResponseGenerator from '../utils/response.generator';

const response = new ResponseGenerator();

class UserController {
  /**
   * @param {object} request express request object
   * @param {object} response express request object
   * @returns {json} json
   * @memberof UserController
   */

  static async add(req, res) {
    try {
      const user = await UserService.addUser(req.body);
      if (user) {
        return response.sendSuccess(
          res,
          200,
          user,
          'User successfully added',
        );
      }
      return response.sendError(res, 500, 'Something went wrong');
    } catch (err) {
      return response.sendError(res, 400, err.message);
    }
  }
}

export default UserController;
