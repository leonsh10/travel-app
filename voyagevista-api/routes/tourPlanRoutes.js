const express = require('express');
const router = express.Router();
const tourPlanController = require('../controllers/tourPlanController');

// Get all tour plans
router.get('/', tourPlanController.getAllTourPlans);

// Get a single tour plan by ID
router.get('/:id', tourPlanController.getTourPlanById);

// Create a new tour plan
router.post('/', tourPlanController.createTourPlan);

// Update a tour plan by ID
router.put('/:id', tourPlanController.updateTourPlan);

// Delete a tour plan by ID
router.delete('/:id', tourPlanController.deleteTourPlan);

module.exports = router;
