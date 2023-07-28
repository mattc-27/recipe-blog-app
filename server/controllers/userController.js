const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../db');

// Register
const createUser = async (req, res) => {
    try {
        const { username } = req.body;

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const newUser = await pool.query(
            'INSERT INTO users (username, password) VALUES($1, $2) RETURNING *',
            [username, hash]
        );
        res.status(200).send({ message: 'Login created successfully!' });
        console.log(newUser.rows[0])
    } catch (err) {
        return res.status(500).json(err);
    }
};


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

// get user 
const fetchUser = async (req, res) => {
    try {
        const { user_id } = req.params;
        const results = await pool.query('SELECT * FROM users WHERE user_id = $1', [user_id]);
        if (results.rows.length > 0) {
            const { username, location, user_id } = results.rows[0]
            res.json({ username, location, user_id });
            console.log(results.rows[0])
        }
        if (results.rows.length <= 0) {
            // User not found
            return res.status(404).send({ message: 'User not found.' });
        }
    } catch (err) {
        console.error(err.message)
    }
};

// update profile
const updateUser = async (req, res) => {
    try {
        const { user_id } = req.params;
        const { username, location } = req.body;
      
        const updateProfile = await pool.query(
            "UPDATE users SET (username, location) = ($1, $2) WHERE user_id = $3 RETURNING *",
            [username, location, user_id]
        );
        console.log(updateProfile.rows[0])
        res.status(200).send({ message: 'Profile updated' });
       
    } catch (err) {

        console.error(err.message)
    }
};


module.exports = {
    createUser,
    userAuth,
    fetchUser,
    updateUser
}