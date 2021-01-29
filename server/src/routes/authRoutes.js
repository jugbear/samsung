const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = mongoose.model('User');

const router = express.Router();

router.get('/users', async (req, res) => {
  const userslist = await User.find()
  res.send(userslist)
});


router.post('/signin', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.send({ error: 'ایمیل و یا رمز عبور را وارد کنید' });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.send({ error: 'ایمیل و رمز عبور وارد شده اشتباه می باشد' });
  }

  try {
    await user.comparePassword(password);
    const token = jwt.sign({ userId: user._id }, 'MY_SECRET_KEY');
    res.send({ token,user });
  } catch (err) {
    return res.send({ error: 'ایمیل و رمز عبور وارد شده اشتباه می باشد' });
  }
});

router.post('/signup', async (req, res) => {
  const { email, password, firstname, lastname, age, gender } = req.body;
  if (!email || !password || !age || !gender || !firstname || !lastname) {
    return res.status(422).send('یکی از فیلد ها خالی می باشد');
  }
  if(password.length < 5){
    return res.status(422).send('پسورد باید بیشتر از ۵ کاراکتر باشد');
  }
  try {
    const user = new User({ email, password, firstname, lastname, age, gender });
    await user.save();

    const token = jwt.sign({ userId: user._id }, 'MY_SECRET_KEY');
    res.send({ token,user });
  } catch (err) {
    return res.status(422).send(err.message);
  }
});

module.exports = router;
