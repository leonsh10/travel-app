const express = require('express');
const router = express.Router();
const contactController  = require('../controllers/contactController');

router.post('/submit', contactController.submit);
router.get('/all', contactController.getAll);
router.delete('/delete/:id', contactController.deleteContact);
module.exports = router;