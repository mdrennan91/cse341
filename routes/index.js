const express = require('express');
const router = express.Router();

const albumRoutes = require('./albums');
const carRoutes = require('./cars');

router.get('/', (req, res) => {
    //#swagger.tags=['Hello World]'
    res.send('Hello World');
});

router.use('/albums', albumRoutes);
router.use('/cars', carRoutes);

module.exports = router;