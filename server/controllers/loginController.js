const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../db');

// Login 
const userLogin = async (req, res) => {
    try {
        const { username, password } = req.body;

        const findUser = await pool.query('SELECT * FROM users WHERE username = $1', [username]);

        if (findUser.rows.length > 0) {
            const hashedPassword = findUser.rows[0].password;
            const id = findUser.rows[0].id;
            bcrypt.compare(password, hashedPassword, function (err, isValid) {

                if (err) {
                    console.error(err);
                    res.status(500).json({ error: 'Internal server error' });

                } else if (isValid) {

                    const token = jwt.sign({ username }, `${process.env.JWT_SECRET}`)

                    return res.cookie('auth_token', token, {
                        httpOnly: true,
                        maxAge: 36000000,
                        path: '/',
                    }).status(200).json(
                        { isValid: true, username, id, message: 'Logged in successfully!' }
                    )


                } else {
                    res.status(200).json({ isValid: false });
                }

            })
        } else {
            res.status(200).json({ isValid: false });
        }

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const userLogout = async (req, res) => {
    res.clearCookie('auth_token', {
        httpOnly: true,
        path: '/'
    });
    return res.status(200).send({ message: 'Logout success' });
}

// 
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



module.exports = {
    userLogin,
    userLogout,
    userAuth
}