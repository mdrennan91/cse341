const express = require('express');
const router = express.Router();
const carsController = require('../controllers/cars');
const { validateCar } = require('../middleware/validate');

router.get('/', carsController.getAllCars);
router.get('/:id', carsController.getSingleCar);

router.post('/', validateCar, carsController.createCar); 
router.put('/:id', validateCar, carsController.updateCar);
router.delete('/:id', carsController.deleteCar);

module.exports = router;