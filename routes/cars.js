const express = require('express');
const router = express.Router();
const carsController = require('../controllers/cars');
const { validateCar } = require('../middleware/validate');
const { isAuthenticated } = require('../middleware/authenticate');

router.get('/', carsController.getAllCars);
router.get('/:id', carsController.getSingleCar);
router.post('/', isAuthenticated, validateCar, carsController.createCar); 
router.put('/:id', isAuthenticated, validateCar, carsController.updateCar);
router.delete('/:id', isAuthenticated, carsController.deleteCar);

module.exports = router;