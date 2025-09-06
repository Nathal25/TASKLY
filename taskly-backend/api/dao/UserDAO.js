const User = require('../models/User');
const GlobalDao = require('./GlobalDao');

class UserDAO extends GlobalDao {
    constructor() {
        super(User);
    }
}

module.exports = new UserDAO();
