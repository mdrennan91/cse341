const mongodb = require('../data/database');
const { ObjectId } = require('mongodb');

const getAllAlbums = async (req, res) => {
    //#swagger.tags=['Albums']
    try {
        const result = await mongodb.getDatabase().collection('albums').find();
        const albums = await result.toArray();
        
        if (albums.length === 0) {
            return res.status(204).send(); 
        } else {
            return res.status(200).json(albums); 
        }
    } catch (err) {
        console.error('Error fetching albums:', err);
        return res.status(500).send('Error fetching albums'); 
    }
};

const getSingleAlbum = async (req, res) => {
    //#swagger.tags=['Albums']
    try {
        const albumId = req.params.id;

        if (!ObjectId.isValid(albumId)) {
            return res.status(400).json({ message: 'Invalid album ID format' }); 
        }

        const result = await mongodb.getDatabase().collection('albums').find({ _id: new ObjectId(albumId) });
        const album = await result.toArray();

        if (album.length === 0) {
            return res.status(204).send();
        } else {
            return res.status(200).json(album[0]); 
        }
    } catch (err) {
        console.error('Error fetching single album:', err);
        return res.status(500).json({ message: 'Error fetching single album' }); 
    }
};

const createAlbum = async (req, res) => {
    //#swagger.tags=['Albums']
    try {
        const album = { ...req.body };  

        const response = await mongodb.getDatabase().collection('albums').insertOne(album);

        if (response.acknowledged) {
            return res.status(201).json({ message: 'Album created successfully', albumId: response.insertedId });
        } else {
            return res.status(500).json({ message: 'Error creating album' }); 
        }
    } catch (err) {
        console.error('Error creating album:', err);
        return res.status(500).json({ message: 'Server error while creating album' }); 
    }
};

const updateAlbum = async (req, res) => {
    //#swagger.tags=['Albums']
    try {
        const albumId = req.params.id;

        if (!ObjectId.isValid(albumId)) {
            return res.status(400).json({ message: 'Invalid album ID format' });
        }

        const albumUpdates = {
            ...(req.body.albumName && { albumName: req.body.albumName }),
            ...(req.body.artist && { artist: req.body.artist }),
            ...(req.body.releaseDate && { releaseDate: req.body.releaseDate }),
            ...(req.body.genre && { genre: req.body.genre }),
            ...(req.body.recordLabel && { recordLabel: req.body.recordLabel }),
            ...(req.body.numberOfTracks && { numberOfTracks: req.body.numberOfTracks }),
            ...(req.body.duration && { duration: req.body.duration })
        };

        const response = await mongodb.getDatabase().collection('albums')
            .updateOne({ _id: new ObjectId(albumId) }, { $set: albumUpdates });

        if (response.modifiedCount > 0) {
            return res.status(204).send(); 
        } else {
            return res.status(500).json({ message: 'Error updating album or album not found' });
        }
    } catch (err) {
        console.error('Error updating album:', err);
        return res.status(500).json({ message: 'Server error while updating album' });
    }
};

const deleteAlbum = async (req, res) => {
    //#swagger.tags=['Albums']
    try {
        const albumId = req.params.id;

        if (!ObjectId.isValid(albumId)) {
            return res.status(400).json({ message: 'Invalid album ID format' }); 
        }

        const response = await mongodb.getDatabase().collection('albums').deleteOne({ _id: new ObjectId(albumId) });

        if (response.deletedCount > 0) {
            return res.status(204).send(); 
        } else {
            return res.status(500).json({ message: 'Failed to delete album or album not found' }); 
        }
    } catch (err) {
        console.error('Error deleting album:', err);
        return res.status(500).json({ message: 'Server error while deleting album' }); 
    }
};

module.exports = {
    getAllAlbums,
    getSingleAlbum,
    createAlbum,
    updateAlbum,
    deleteAlbum
};