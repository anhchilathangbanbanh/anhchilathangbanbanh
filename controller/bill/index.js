const express = require('express');

const controller = require('./bill.controller');

var router = express.Router();
router.route('/get-list-bill')
    .get(controller.getListBill);
router.route('/create-new-bill')
    .post(controller.createNewBill);
    
module.exports = router;
