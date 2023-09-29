const express = require('express');
//const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const passport = require('./passport');
const config = require('./config');
const indexRouter = require('./routers/index');
const app = express();

passport(app);

// app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());
app.use(morgan('tiny'));

app.use(indexRouter);

app.listen(config.host.port, () => {
  console.log('Server is listening...');
});
