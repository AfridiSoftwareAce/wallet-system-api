const express = require('express');
const router = express.Router();
const { handleCreateUser, getUserById } = require('../controllers/userController');
const userSchema = require('../validators/userValidator');
const validate = require('../middleware/validateMiddleware');


router.post('/user', validate(userSchema), handleCreateUser); 
router.get('/user/:id', getUserById); 


module.exports = router;
