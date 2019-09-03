const express = require('express');
const logger = require('morgan');

require('dotenv').config();

const app = express();

app.use(logger('dev'));
app.use(express.json());

app.use('/movies', require('./routes/movies'));

// catch 404 and forward to error handler
app.use((_req, _res, next) => next(res.sendStatus(404)));

// error handler
app.use((err, req, res) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
