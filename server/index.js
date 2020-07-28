const express  = require('express');
const logger = require('morgan');
const path = require('path');
const cors = require('cors');
const rootRouter = require('./routes');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.NODE_PORT || 3000;
const DB_URL = process.env.DB_URL || 'mongodb://localhost/test_db1212121'

mongoose.connect(DB_URL, {useNewUrlParser: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('DB connected!');
});

app.use(logger('tiny'));
app.use(express.static(path.resolve(__dirname, '../dist')));
app.use(cors());
app.use(bodyParser.json());

// app.get('/', function (req, res) {
//   res.send('Hello World!');
// });
app.use('/api/v1', rootRouter);

app.listen(PORT, () => {
  console.log(`Server listening on port - ${PORT}`);
});
