// mvc: model, view, controller
const { v4: uuidv4 } = require('uuid'); 
const { validationResult } = require('express-validator'); 

const HttpError = require('../models/http-error'); 
const getCoordsForAddress = require('../util/location');

let DUMMY_PLACES = [
    {
        id: 'p1', 
        title: 'Empire State Building', 
        description: 'One of the most famous sky scrapers in the world!',
        location: {
            lat: 40.7484405,
            lng: -73.9856644
        }, 
        address: '20 W 34th St., New York, NY 10001', 
        creator: 'u1'
    }
]; 

const getPlaceById = (req, res, next) => {  // pid is the dynamic segment
    const placeId = req.params.pid;        // { pid: 'p1' }  dynamic segment is the key
    console.log("GET request in places");
    const place = DUMMY_PLACES.find(p => { // p is every element in the array
        return p.id === placeId
    });
    
    if (!place) {
        throw new HttpError("Couldn't find a place for the provided place id.", 404);
        // don't need to return, throw automatically cancel the function
    }

    res.json({ place });     // => { place: place }
}; 

const getPlaceByUserId = (req, res, next) => {
    const userId = req.params.uid;
    const place = DUMMY_PLACES.filter(p => {
        return p.creator === userId;
    });

    if (!place || place.length === 0) {
        return next(new HttpError("Couldn't find places for the provided user id.", 404));
    }

    res.json({ place });
}; 

const createPlace = async (req, res, next) => { 
    const errors = validationResult(req);
    if (!errors.isEmpty()) { 
        console.log(errors)
        return next(new HttpError('Invalid inputs passed, please check your data', 422)); 
    }
    const { title, description, address, creator } = req.body; 
    // const title = req.body.title; 
    let coordinates; 
    try {
        coordinates = await getCoordsForAddress(address); 
    } catch(error) {
        return next(error); 
    }
    

    const createPlace = {
        id: uuidv4(), 
        title, 
        description, 
        location: coordinates, 
        address, 
        creator
    }; 
    DUMMY_PLACES.push(createPlace); 
    res.status(201).json({place: createPlace}); 
}; 

const updatePlace = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) { 
        console.log(errors)
        throw new HttpError('Invalid inputs passed, please check your data', 422); 
    }
    const { title, description } = req.body;
    const placeId = req.params.pid; 
    const updatePlace = { ...DUMMY_PLACES.find(p => p.id === placeId) }; 
    const placeIndex = DUMMY_PLACES.findIndex(p => p.id === placeId); 
    updatePlace.title = title; 
    updatePlace.description = description; 

    DUMMY_PLACES[placeIndex] = updatePlace; 
    res.status(200).json({place: updatePlace}); 
}; 

const deletePlace = (req, res, next) => {
    const placeId = req.params.pid; 
    if (!DUMMY_PLACES.find(p => p.id === placeId)) { 
        throw new HttpError("Could not find a place for that id", 404); 
    }
    DUMMY_PLACES = DUMMY_PLACES.filter(p => p.id !== placeId); 
    res.status(200).json({message: 'Delete place.'})
}; 

exports.getPlaceById = getPlaceById; 
exports.getPlaceByUserId = getPlaceByUserId; 
exports.createPlace = createPlace; 
exports.updatePlace = updatePlace; 
exports.deletePlace = deletePlace