const express = require('express');

const controller = require('./cake-category.controller');

var router = express.Router();
router.get('/get-list-cake-category', controller.getListCakeCategory);

module.exports = router;
