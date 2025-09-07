const GlobalController = require("./GlobalController");
const UserDAO = require("../dao/UserDAO");

// Create a UserController class that extends the GlobalController sending the UserDAO to the parent constructor
class UserController extends GlobalController {
  constructor() {
    super(UserDAO);
  }

  async create(req, res) {
    try {
      // Additional validation for password confirmation
      if (req.body.password != req.body.confirmPassword){
        return res.status(400).json({ message: "Password and confirm password don't match" });
      }

      // Remove confirmPassword before saving
      delete req.body.confirmPassword;

      // Call the parent create method of GlobalController
      return await super.create(req, res);
      
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

// Export an instance of the UserController
module.exports = new UserController();