const GlobalController = require("./GlobalController");
const UserDAO = require("../dao/UserDAO");
const bcrypt = require("bcrypt");

// Create a UserController class that extends the GlobalController sending the UserDAO to the parent constructor
class UserController extends GlobalController {
  constructor() {
    super(UserDAO);
  }

  // Override the create method to add custom logic for user creation
  async create(req, res) {
    try {
      // Validate password and confirmPassword match
      const passwordError = this.passwordValidation(req);
      if(passwordError){
        return res.status(400).json({message: passwordError});
      }
      
      // Check if the email already exists
      const existingUser = await UserDAO.readByEmail(req.body.email);
      if (existingUser) {
        return res.status(409).json({message: "Email already in use"});
      }

      await this.hashPassword(req);

      // Call the parent create method of GlobalController
      return await super.create(req, res);

    } catch (error) {
      res.status(500).json({message: error.message});
    }
  }

  // Additional validation for password confirmation
  passwordValidation(req) {
    if (req.body.password != req.body.confirmPassword) {
      return "Password and confirm password don't match";
    }

    // Remove confirmPassword before saving
    delete req.body.confirmPassword;
    return null;
  }

  // Hash the password before saving using bycrypt
  async hashPassword(req) {
    const newPassword = await bcrypt.hash(req.body.password, 10);
    req.body.password = newPassword;
    return newPassword;
  }
}

// Export an instance of the UserController
module.exports = new UserController();