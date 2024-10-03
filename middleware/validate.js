const validator = require('../helpers/validate');

const validateAlbum = (req, res, next) => {
    const validationRule = {
        albumName: 'required|string',
        artist: 'required|string',
        releaseDate: 'required|string',  
        genre: 'required|string',
        recordLabel: 'required|string',
        numberOfTracks: 'required|numeric',
        duration: 'required|numeric'
    };
    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            return res.status(400).json({
                success: false,
                message: 'Validation failed',
                data: err
            });
        } else {
            next();
        }
    });
};

const validateCar = (req, res, next) => {
    const validationRule = {
        modelName: 'required|string',
        manufacturer: 'required|string',
        year: 'required|numeric',
        engineType: 'required|string',
        fuelEfficiency: 'required|numeric',
        price: 'required|numeric',
        horsepower: 'required|numeric'
    };

    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            return res.status(400).json({
                success: false,
                message: 'Validation failed',
                data: err
            });
        } else {
            next();
        }
    });
};

module.exports = {
    validateAlbum,
    validateCar
};