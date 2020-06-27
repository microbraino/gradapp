const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const swaggerUi = require('swagger-ui-express');



// Bring in the database object
const config = require('./api/config/cors');

// Mongodb Config
mongoose.set('useCreateIndex', true);

// Connect with the database
mongoose.connect(config.database, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log('Databse connected successfully ' + config.database);
    }).catch(err => {
        console.log(err);
    });

// Initialize the app
const app = express();

// Defining the PORT
const PORT = process.env.PORT || 5000;
//app.set('port', (process.env.PORT || 500))

// Defining the Middlewares
app.use(cors());

// Set the static folder
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/documents', express.static(path.join(__dirname, 'documents')));

// BodyParser Middleware
app.use(bodyParser.json());

// Bring in the routes
const swaggerDocument = require('./swagger.json');//swagger route is on index page
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const accounts = require('./api/routes/accounts');
app.use('/accounts', accounts);


const programs = require('./api/routes/programs');
app.use('/programs', programs);

const notifications = require('./api/routes/notifications');
app.use('/notifications', notifications);

const documents = require('./api/routes/documents');
app.use('/documents', documents);

const applications = require('./api/routes/applications');
app.use('/applications', applications);

const interviews = require('./api/routes/interviews');
app.use('/interviews', interviews);



// Catch undefined routes
app.use((req, res, next) => {
    console.log("Undefined root attempt")
    const error = new Error("Not found");
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});


app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
});