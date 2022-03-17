const express = require('express');
const conn = require("../db/dbconfig.js");
const User = require("../models/userModel");

const router = express.Router();

router.get('/', async (_, res) => {
    let result = await User.getAll(conn);
    res.render('user', { users: result });
})


module.exports = router;
