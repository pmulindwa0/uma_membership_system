const mongoose = require('mongoose');
const path = require('path');
const multer = require('multer');
const users = require('./routes/users');
const auth = require('./routes/auth');
const dashboard = require('./routes/dashboard');
const membership = require('./routes/membership');
const application = require('./routes/application');
const capacity = require('./routes/capacity');
const wsaip = require('./routes/wsaip');
const mails = require('./routes/mails');
const events = require('./routes/events');
const express = require('express');
const hbs = require('express-handlebars');
const Handlebars = require('handlebars');
const HandlebarsIntl = require('handlebars-intl');
const bodyParser = require('body-parser');
const flash = require('express-flash');
const session = require('express-session');
const fileUpload = require('express-fileupload');
const app = express();
const authenticate = require('./middleware/auth');
require('./startup/prod')(app);
 
HandlebarsIntl.registerWith(Handlebars);
Handlebars.registerHelper('ternary', require('handlebars-helper-ternary'));
Handlebars.registerHelper('if_eq', function(a, b, opts) {
  if (a == b) {
      return opts.fn(this);
  } else {
      return opts.inverse(this);
  }
});
Handlebars.registerHelper("xif", function (expression, options) {
  return Handlebars.helpers["x"].apply(this, [expression, options]) ? options.fn(this) : options.inverse(this);
});

Handlebars.registerHelper('json', function(context) {
  return JSON.stringify(context);
});

// view engine setup
app.engine('hbs', hbs({extname: 'hbs', defaultLayout: 'layout', layoutsDir: __dirname + '/views/layouts/'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// static file path setup
app.use(express.static(path.join(__dirname, 'public')));

// initialise session middleware - flash-express depends on it
app.use(session({
  secret : "djhxcvxfgshajfgjhgsjhfgsakjeauytsdfy",
  resave: true,
  saveUninitialized: true,
  cookie: {
    maxAge: (30 * 24 * 60 * 60 * 1000)
  }
}));

// initialise the flash middleware
app.use(flash());
// Remote connection
// Mongodb atlas

mongoose.connect('mongodb+srv://pecode:BMg9uiLo@umadatabase-q9z2l.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true })
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...'));

  //MLab
  /*
  mongoose.connect('mongodb://pecode:BMg9uiLo@ds064718.mlab.com:64718/uma', { useNewUrlParser: true })
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...'));
  */
// local connection
/*
mongoose.connect('mongodb://localhost/umadb', { useNewUrlParser: true })
.then(() => console.log('Connected to MongoDB...'))
.catch(err => console.error('Could not connect to MongoDB...'));
*/
mongoose.set('useCreateIndex', true);

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/', auth);
app.use('/application', application);
app.use('/capacity', capacity);
app.use(authenticate);
app.use('/dashboard', dashboard);
app.use('/users', users);
app.use('/events', events);
app.use(fileUpload());
app.use('/wsaip', wsaip);
app.use('/membership', membership);
app.use('/notification', mails);

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}...`));