const express = require('express');

const controller = require('./cake.controller');
const auth = require('../user/authentication.controller.js');

var router = express.Router();
router.route('/get-list-cake')
    .get(controller.getListCake);
router.route('/get-cake-by-category/:cakeCategoryId')
    .get(controller.getCakeByCategory);
router.route('/get-cake-show-on-slide')
    .get(controller.getCakeShowOnSlide);
router.route('/create-new-cake')
    .post(auth.authentication, controller.checkRequiredFields, controller.checkDuplicateFields, controller.createNewCake);
router.route('/update-cake-info')
    .put(controller.checkRequiredFields, controller.checkDuplicateFieldsForUpdate, controller.updateCakeInfo);
router.route('/delete-cake')
    .delete(controller.deleteCake);

module.exports = router;
