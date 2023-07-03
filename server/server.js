// Setup express
const express = require('express');
const pool = require('./db');
// Import middleware
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const dotenv = require('dotenv');
dotenv.config();

const cors = require('cors');
const corsOptions = {
    origin: 'http://localhost:5000',
    methods: 'GET,POST,PUT',
    allowedHeaders: 'Content-Type,Authorization',
};


// Create express app
const app = express();


// Implement middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'dist')));

app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use(cookieParser());

const loginRoutes = require('./routes/login');
const userRoutes = require('./routes/user');
const authRoutes = require('./routes/auth');
const recipeRoutes = require('./routes/recipes');
const blogRoutes = require('./routes/blog');

app.use(`/api`, loginRoutes);
app.use(`/api/user`, userRoutes);
app.use(`/api/auth`, authRoutes);
app.use(`/api/recipes`, recipeRoutes);
app.use(`/api/blog`, blogRoutes);

app.use((req, res, next) => {
    res.status(404).send("Sorry can't find that!")
  })

// Setup default port
app.set('port', process.env.PORT || 5000);

// Start express app
app.listen(app.get('port'), () => {
    console.log(`Server running at port: ${app.get('port')}`)
});