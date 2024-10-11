const express = require('express');
const router = express.Router();
const albumsController = require('../controllers/albums');
const { validateAlbum } = require('../middleware/validate');
const { isAuthenticated } = require('../middleware/authenticate');

router.get('/', albumsController.getAllAlbums);
router.get('/:id', albumsController.getSingleAlbum);
router.post('/', isAuthenticated, validateAlbum, albumsController.createAlbum);  
router.put('/:id', isAuthenticated, validateAlbum, albumsController.updateAlbum);  
router.delete('/:id', isAuthenticated, albumsController.deleteAlbum);

module.exports = router;