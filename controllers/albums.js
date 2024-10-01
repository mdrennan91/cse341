const mongodb = require('../data/database');
const { ObjectId } = require('mongodb');

const validateAlbum = (album) => {
    const { albumName, artist, releaseDate, genre, recordLabel, numberOfTracks, duration } = album;
    if (!albumName || !artist || !releaseDate || !genre || !recordLabel || !numberOfTracks || !duration) {
        return false; // Validation failed
    }
    return true; // Validation passed
};

const getAllAlbums = async (req, res) => {
    //#swagger.tags=['Albums']
    try {
        const result = await mongodb.getDatabase().collection('albums').find();
        const albums = await result.toArray();
        
        if (albums.length === 0) {
            res.status(204).send();
        } else {
            res.status(200).json(albums);
        }
    } catch (err) {
        console.error('Error fetching albums:', err);
        res.status(500).send('Error fetching albums');
    }
};

const getSingleAlbum = async (req, res) => {
    //#swagger.tags=['Albums']
    try {
        const albumId = new ObjectId(req.params.id);
        const result = await mongodb.getDatabase().collection('albums').find({ _id: albumId });
        const album = await result.toArray();

        if (album.length === 0) {
            res.status(204).send();
        } else {
            res.status(200).json(album[0]);
        }
    } catch (err) {
        console.error('Error fetching single album:', err);
        res.status(500).send('Error fetching single album');
    }
};

const createAlbum = async (req, res) => {
    //#swagger.tags=['Albums']
    try {
        const album = {
            albumName: req.body.albumName,
            artist: req.body.artist,
            releaseDate: req.body.releaseDate,
            genre: req.body.genre,
            recordLabel: req.body.recordLabel,
            numberOfTracks: req.body.numberOfTracks,
            duration: req.body.duration
        };

        // Data validation
        if (!validateAlbum(album)) {
            return res.status(400).json({ message: 'Invalid album data' }); 
        }

        const response = await mongodb.getDatabase().collection('albums').insertOne(album);

        if (response.acknowledged) {
            res.status(201).json({
                message: 'Album created successfully',
                albumId: response.insertedId,
                album: album
            });
        } else {
            res.status(500).json({ message: 'Error creating album' });
        }
    } catch (err) {
        console.error('Error creating album:', err);
        res.status(500).json({ message: 'Server error while creating album' });
    }
};

const updateAlbum = async (req, res) => {
    //#swagger.tags=['Albums']
    try {
        const albumId = new ObjectId(req.params.id);
        const album = {
            albumName: req.body.albumName,
            artist: req.body.artist,
            releaseDate: req.body.releaseDate,
            genre: req.body.genre,
            recordLabel: req.body.recordLabel,
            numberOfTracks: req.body.numberOfTracks,
            duration: req.body.duration
        };

        // Data validation
        if (!validateAlbum(album)) {
            return res.status(400).json({ message: 'Invalid album data' }); 
        }

        const response = await mongodb.getDatabase().collection('albums').replaceOne({ _id: albumId }, album);

        if (response.modifiedCount > 0) {
            res.status(204).send(); 
        } else {
            res.status(500).json({ message: 'Error updating album or album not found' });
        }
    } catch (err) {
        console.error('Error updating album:', err);
        res.status(500).json({ message: 'Server error while updating album' });
    }
};

const deleteAlbum = async (req, res) => {
    //#swagger.tags=['Albums']
    try {
        const albumId = new ObjectId(req.params.id);
        const response = await mongodb.getDatabase().collection('albums').deleteOne({ _id: albumId });
        if (response.deletedCount > 0) {
            res.status(204).send(); 
        } else {
            res.status(500).json({ message: 'Failed to delete album or album not found' });
        }
    } catch (err) {
        console.error('Error deleting album:', err);
        res.status(500).json({ message: 'Server error while deleting album' });
    }
};

module.exports = {
    getAllAlbums,
    getSingleAlbum,
    createAlbum,
    updateAlbum,
    deleteAlbum
};