const express = require('express');
const router = express.Router();
const { register, login, getAllUsers, editUserRole,deleteUser} = require('../controllers/authController');

router.post('/register', register);
router.post('/login', login);
router.get('/users', getAllUsers);
router.put('/user/edit-role/:id', editUserRole);
router.delete('/user/:id',deleteUser);
module.exports = router;