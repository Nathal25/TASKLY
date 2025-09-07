const GlobalController = require("./GlobalController");
const UserDAO = require("../dao/UserDAO");

// Create a UserController class that extends the GlobalController sending the UserDAO to the parent constructor
class UserController extends GlobalController {
  constructor() {
    super(UserDAO);
  }
}

// Export an instance of the UserController
module.exports = new UserController();