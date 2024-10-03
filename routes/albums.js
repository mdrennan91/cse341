const express = require('express');
const router = express.Router();
const albumsController = require('../controllers/albums');
const { validateAlbum } = require('../middleware/validate');

router.get('/', albumsController.getAllAlbums);
router.get('/:id', albumsController.getSingleAlbum);

router.post('/', validateAlbum, albumsController.createAlbum);  
router.put('/:id', validateAlbum, albumsController.updateAlbum);  
router.delete('/:id', albumsController.deleteAlbum);

module.exports = router;