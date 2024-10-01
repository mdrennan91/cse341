const express = require('express');
const router = express.Router();
const albumsController = require('../controllers/albums');

router.get('/', albumsController.getAllAlbums);
router.get('/:id', albumsController.getSingleAlbum);

router.post('/', albumsController.createAlbum);
router.put('/:id', albumsController.updateAlbum);
router.delete('/:id', albumsController.deleteAlbum);

module.exports = router;