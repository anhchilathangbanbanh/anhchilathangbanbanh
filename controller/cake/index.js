const express = require('express');

const controller = require('./cake.controller.js');

var router = express.Router();
router.route('/get-list-cake')
    .get(controller.getListCake);
router.route('/get-cake-by-category/:cakeCategoryId')
    .get(controller.getCakeByCategory);
router.route('/create-new-cake')
    .post(controller.checkRequiredFields, controller.checkDuplicateFields, controller.createNewCake);

module.exports = router;
