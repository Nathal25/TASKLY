const GlobalController = require("./GlobalController");
const UserDAO = require("../dao/UserDAO");

/* UserController 
** @description Controller for user-related operations
** Extends GlobalController to inherit common CRUD functionalities
*/
class UserController extends GlobalController {
  constructor() {
    super(UserDAO);
  }
}
module.exports = new UserController();