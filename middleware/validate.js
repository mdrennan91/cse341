// validate.js (middleware)

const validateAlbum = (req, res, next) => {
    const { albumName, artist, releaseDate, genre, recordLabel, numberOfTracks, duration } = req.body;
    if (!albumName || !artist || !releaseDate || !genre || !recordLabel || !numberOfTracks || !duration) {
        return res.status(400).json({ message: 'Invalid album data' });
    }
    next();
};

const validateCar = (req, res, next) => {
    const { modelName, manufacturer, year, engineType, fuelEfficiency, price, horsepower } = req.body;
    if (!modelName || !manufacturer || !year || !engineType || !fuelEfficiency || !price || !horsepower) {
        return res.status(400).json({ message: 'Invalid car data' });
    }
    next();
};

module.exports = {
    validateAlbum,
    validateCar
};