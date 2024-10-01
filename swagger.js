const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Cars & Albums API',
        description: 'This API handles cars and albums data.'
    },
    host: 'localhost:3000', 
    schemes: ['http'], 
    definitions: {
        Car: {
            modelName: 'Model S',
            manufacturer: 'Tesla',
            year: 2021,
            engineType: 'Electric',
            fuelEfficiency: 120,
            price: 79990,
            horsepower: 1020
        },
        Album: {
            albumName: 'Nevermind',
            artist: 'Nirvana',
            releaseDate: '1991-09-24',
            genre: 'Alternative Rock',
            recordLabel: 'DGC',
            numberOfTracks: 17,
            duration: '42:36'
        }
    }
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

// Generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);