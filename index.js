const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const DB = require('./Db');

const PORT = process.env.PORT || 4000;

const app = express();

const url = 'mongodb+srv://crud:crud@cluster0.4h3wm.mongodb.net/prototypeform?retryWrites=true&w=majority';
mongoose.connect(url, { useNewUrlParser: true });
app.use(express.json());
app.use(cors());

app.use(express.static(path.join(__dirname, './client/build')));

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, './client/build/index.html'));
});

app.post('/', async (req, res) => {
  const {
    id,
    firstname,
    lastname,
    phone,
    useremail,
    userpassword,
  } = req.body;
  console.log(req.body, 'data');
  const userData = new DB({
    key: id,
    firstName: firstname,
    lastName: lastname,
    Phone: phone,
    email: useremail,
    password: userpassword,
  });
  try {
    await userData.save();
    res.send('inserted');
  } catch (error) {
    console.log(error);
  }
});
app.get('/thank/:id', async (req, res) => {
  const obtid = req.params.id;
  const user = await DB.findOne({ key: obtid });
  if (!user) {
    res.status(500).json({ success: false });
    return;
  }
  res.send({ user });
});
// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static('client/build'));
// }
app.listen(PORT, () => console.log(`App listening ${PORT}`));
