const express = require('express');

const controller = require('./cake.controller');

var router = express.Router();
router.route('/get-list-cake')
    .get(controller.getListCake);
router.route('/get-cake-by-category/:cakeCategoryId')
    .get(controller.getCakeByCategory);
router.route('/create-new-cake')
    .post(controller.checkRequiredFields, controller.checkDuplicateFields, controller.createNewCake);
router.route('/update-cake-info')
    .put(controller.checkRequiredFields, controller.checkDuplicateFieldsForUpdate, controller.updateCakeInfo);
router.route('/delete-cake')
    .delete(controller.deleteCake);

module.exports = router;
