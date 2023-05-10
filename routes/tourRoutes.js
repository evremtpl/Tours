
const express= require('express');
const tourController = require('./../controllers/tourController');

const router = express.Router();

//router.param('id',tourController.checkId);




// ROUTE TOURS
router
.route('/top-5-cheap')
.get(tourController.aliasTopTours,tourController.getAllTours)

router
.route('/tour-stats').get(tourController.getTourStats);
router
.route('/monthly-plan/:year').get(tourController.getMonthlyPlan);
router
.route('/')
.get(tourController.getAllTours)
.post(tourController.addTour)

router
.route('/:id')
.get(tourController.getById)
.patch(tourController.updateTour)
.delete(tourController.deleteTour);

module.exports=router;