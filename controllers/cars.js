const mongodb = require('../data/database');
const { ObjectId } = require('mongodb');

const validateCar = (car) => {
    const { modelName, manufacturer, year, engineType, fuelEfficiency, price, horsepower } = car;
    if (!modelName || !manufacturer || !year || !engineType || !fuelEfficiency || !price || !horsepower) {
        return false; // Validation failed
    }
    return true; // Validation passed
};

const getAllCars = async (req, res) => {
    //#swagger.tags=['Cars']
    try {
        const result = await mongodb.getDatabase().collection('cars').find();
        const cars = await result.toArray();
        
        if (cars.length === 0) {
            res.status(204).send();
        } else {
            res.status(200).json(cars);
        }
    } catch (err) {
        console.error('Error fetching cars:', err);
        res.status(500).send('Error fetching cars');
    }
};

const getSingleCar = async (req, res) => {
    //#swagger.tags=['Cars']
    try {
        const carId = new ObjectId(req.params.id);
        const result = await mongodb.getDatabase().collection('cars').find({ _id: carId });
        const car = await result.toArray();

        if (car.length === 0) {
            res.status(204).send();
        } else {
            res.status(200).json(car[0]);
        }
    } catch (err) {
        console.error('Error fetching single car:', err);
        res.status(500).send('Error fetching single car');
    }
};

const createCar = async (req, res) => {
    //#swagger.tags=['Cars']
    try {
        const car = {
            modelName: req.body.modelName,
            manufacturer: req.body.manufacturer,
            year: req.body.year,
            engineType: req.body.engineType,
            fuelEfficiency: req.body.fuelEfficiency,
            price: req.body.price,
            horsepower: req.body.horsepower
        };

        // Data validation
        if (!validateCar(car)) {
            return res.status(400).json({ message: 'Invalid car data' }); 
        }

        const response = await mongodb.getDatabase().collection('cars').insertOne(car);

        if (response.acknowledged) {
            res.status(201).json({
                message: 'Car created successfully',
                carId: response.insertedId,
                car: car
            });
        } else {
            res.status(500).json({ message: 'Error creating car' });
        }
    } catch (err) {
        console.error('Error creating car:', err);
        res.status(500).json({ message: 'Server error while creating car' });
    }
};

const updateCar = async (req, res) => {
    //#swagger.tags=['Cars']
    try {
        const carId = new ObjectId(req.params.id);
        const car = {
            modelName: req.body.modelName,
            manufacturer: req.body.manufacturer,
            year: req.body.year,
            engineType: req.body.engineType,
            fuelEfficiency: req.body.fuelEfficiency,
            price: req.body.price,
            horsepower: req.body.horsepower
        };

        // Data validation
        if (!validateCar(car)) {
            return res.status(400).json({ message: 'Invalid car data' });
        }

        const response = await mongodb.getDatabase().collection('cars').replaceOne({ _id: carId }, car);

        if (response.modifiedCount > 0) {
            res.status(204).send(); 
        } else {
            res.status(500).json({ message: 'Error updating car or car not found' });
        }
    } catch (err) {
        console.error('Error updating car:', err);
        res.status(500).json({ message: 'Server error while updating car' });
    }
};

const deleteCar = async (req, res) => {
    //#swagger.tags=['Cars']
    try {
        const carId = new ObjectId(req.params.id);
        const response = await mongodb.getDatabase().collection('cars').deleteOne({ _id: carId });

        if (response.deletedCount > 0) {
            res.status(204).send(); 
        } else {
            res.status(500).json({ message: 'Failed to delete car or car not found' });
        }
    } catch (err) {
        console.error('Error deleting car:', err);
        res.status(500).json({ message: 'Server error while deleting car' });
    }
};

module.exports = {
    getAllCars,
    getSingleCar,
    createCar,
    updateCar,
    deleteCar
};