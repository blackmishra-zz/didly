const appDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');
const morgan = require('morgan');

const Joi = require('joi');
const logger = require('./middleware/logger');
const helmet = require('helmet');
const config = require('config');

const generes = require('./routes/generes');
const home = require('./routes/home');
const express = require('express');
const app = express();

appDebugger("Application name:" + config.get('name'));
appDebugger("Mail Server:" + config.get('mail.host'));
appDebugger("Mail Password:" + config.get('mail.password'));

appDebugger("App Debugging statements...");
dbDebugger("Database Debugging statements...");

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.json());
app.use(helmet());
if (app.get('env') === 'production') {
    app.use(morgan('tiny'));
}
app.use('/api/generes/', generes);
app.use('/', home);

app.use(logger);
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening to port: ${port}...`);
});
