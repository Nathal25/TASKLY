const User = require("../models/User");
const GlobalDAO = require("./GlobalDAO");

// Create a UserDAO class that extends the GlobalDAO sending the User model to the parent constructor
class UserDAO extends GlobalDAO {
    constructor() {
        super(User);
    }
}

// Export an instance of the UserDAO
module.exports = new UserDAO();
