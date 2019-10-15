const mongoose = require('mongoose');
const path = require('path');
const multer = require('multer');
const materials = require('./routes/materials');
const stocks = require('./routes/stocks');
const jobs = require('./routes/jobs');
const orders = require('./routes/orders');
const users = require('./routes/users');
const auth = require('./routes/auth');
const dashboard = require('./routes/dashboard');
const membership = require('./routes/membership');
const application = require('./routes/application');
const wsaip = require('./routes/wsaip');
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
  resave: false,
  saveUninitialized: false
}));

// initialise the flash middleware
app.use(flash());
// Remote connection
/*
mongoose.connect('mongodb://shoeapp:BMg9uiLo@ds016718.mlab.com:16718/shoeapp', { useNewUrlParser: true })
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...'));
*/

// local connection

mongoose.connect('mongodb://localhost/umadb', { useNewUrlParser: true })
.then(() => console.log('Connected to MongoDB...'))
.catch(err => console.error('Could not connect to MongoDB...'));

mongoose.set('useCreateIndex', true);

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/', auth);
app.use('/application', application);
app.use(authenticate);
app.use('/membership', membership);
app.use('/dashboard', dashboard);
app.use('/materials', materials);
app.use('/stock-take', stocks);
app.use('/job-order', jobs);
app.use('/material-order', orders);
app.use('/users', users);
app.use(fileUpload());
app.use('/wsaip', wsaip);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));