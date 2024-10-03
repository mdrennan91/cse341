const mongodb = require('../data/database');
const { ObjectId } = require('mongodb');

const getAllCars = async (req, res) => {
    //#swagger.tags=['Cars']
    try {
        const result = await mongodb.getDatabase().collection('cars').find();
        const cars = await result.toArray();

        if (cars.length === 0) {
            return res.status(204).send(); 
        } else {
            return res.status(200).json(cars); 
        }
    } catch (err) {
        console.error('Error fetching cars:', err);
        return res.status(500).send('Error fetching cars'); 
    }
};

const getSingleCar = async (req, res) => {
    //#swagger.tags=['Cars']
    try {
        const carId = req.params.id;

        if (!ObjectId.isValid(carId)) {
            return res.status(400).json({ message: 'Invalid car ID format' }); 
        }

        const result = await mongodb.getDatabase().collection('cars').find({ _id: new ObjectId(carId) });
        const car = await result.toArray();

        if (car.length === 0) {
            return res.status(204).send(); 
        } else {
            return res.status(200).json(car[0]); 
        }
    } catch (err) {
        console.error('Error fetching single car:', err);
        return res.status(500).json({ message: 'Error fetching single car' }); 
    }
};

const createCar = async (req, res) => {
    //#swagger.tags=['Cars']
    try {
        const car = { ...req.body }; 

        const response = await mongodb.getDatabase().collection('cars').insertOne(car);

        if (response.acknowledged) {
            return res.status(201).json({ message: 'Car created successfully', carId: response.insertedId });
        } else {
            return res.status(500).json({ message: 'Error creating car' }); 
        }
    } catch (err) {
        console.error('Error creating car:', err);
        return res.status(500).json({ message: 'Server error while creating car' }); 
    }
};

const updateCar = async (req, res) => {
    //#swagger.tags=['Cars']
    try {
        const carId = req.params.id;

        if (!ObjectId.isValid(carId)) {
            return res.status(400).json({ message: 'Invalid car ID format' });
        }

        const carUpdates = {
            ...(req.body.modelName && { modelName: req.body.modelName }),
            ...(req.body.manufacturer && { manufacturer: req.body.manufacturer }),
            ...(req.body.year && { year: req.body.year }),
            ...(req.body.engineType && { engineType: req.body.engineType }),
            ...(req.body.fuelEfficiency && { fuelEfficiency: req.body.fuelEfficiency }),
            ...(req.body.price && { price: req.body.price }),
            ...(req.body.horsepower && { horsepower: req.body.horsepower })
        };

        const response = await mongodb.getDatabase().collection('cars')
            .updateOne({ _id: new ObjectId(carId) }, { $set: carUpdates });

        if (response.modifiedCount > 0) {
            return res.status(204).send(); 
        } else {
            return res.status(500).json({ message: 'Error updating car or car not found' });
        }
    } catch (err) {
        console.error('Error updating car:', err);
        return res.status(500).json({ message: 'Server error while updating car' });
    }
};

const deleteCar = async (req, res) => {
    //#swagger.tags=['Cars']
    try {
        const carId = req.params.id;

        if (!ObjectId.isValid(carId)) {
            return res.status(400).json({ message: 'Invalid car ID format' });
        }

        const response = await mongodb.getDatabase().collection('cars').deleteOne({ _id: new ObjectId(carId) });

        if (response.deletedCount > 0) {
            return res.status(204).send(); 
        } else {
            return res.status(500).json({ message: 'Failed to delete car or car not found' }); 
        }
    } catch (err) {
        console.error('Error deleting car:', err);
        return res.status(500).json({ message: 'Server error while deleting car' }); 
    }
};

module.exports = {
    getAllCars,
    getSingleCar,
    createCar,
    updateCar,
    deleteCar
};