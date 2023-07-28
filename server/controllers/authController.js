const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../db');

const userAuth = (req, res, next) => {
    const token = req.cookies.auth_token;
    if (!token) {
        return res.sendStatus(403);
    }
    try {
        const data = jwt.verify(token, `${process.env.JWT_SECRET}`);
        //console.log(data);
        req.user = data;
        return next();
    } catch {
        return res.sendStatus(403);
    }
};

const verifyUser = async (req, res) => {
    try {
      const { user_id } = req.params;
      return res.json({ user: req.user, isValid: true });
    } catch (error) {
      console.error(error.message);
      res.sendStatus(500);
    }
  };

module.exports = {
    userAuth,
    verifyUser
}