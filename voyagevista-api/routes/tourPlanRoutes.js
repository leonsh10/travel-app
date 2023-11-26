const express = require('express');
const router = express.Router();
const tourPlanController = require('../controllers/tourPlanController');

router.get('/', tourPlanController.getAllTourPlans);

router.get('/:id', tourPlanController.getTourPlanById);

router.post('/', tourPlanController.createTourPlan);

router.put('/:id', tourPlanController.updateTourPlan);

router.delete('/:id', tourPlanController.deleteTourPlan);

module.exports = router;
