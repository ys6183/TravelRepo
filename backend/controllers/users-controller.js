const { v4: uuidv4 } = require('uuid'); 
const HttpError = require('../models/http-error'); 
const { validationResult } = require('express-validator'); 

DUMMY_USERS = [
    {
        id: 'u1', 
        name: 'yu s',
        email: 'test@test.com', 
        password: 'testtest'

    }
]; 

const getUsers = (req, res, next) => {
    res.json({users: DUMMY_USERS});
};

const signup = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) { 
        console.log(errors)
        throw new HttpError('Invalid inputs passed, please check your data', 422); 
    }
    const { name, email, password } = req.body;  
    const hasUser = DUMMY_USERS.find(u => u.email === email);
    if (hasUser) {
        throw new HttpError("User email already exist", 422); 
    }
    const createdUser = {
        id: uuidv4(),
        name, 
        email, 
        password
    }; 
    DUMMY_USERS.push(createdUser); 
    res.status(201).json({user: createdUser}); 
};

const login = (req, res, next) => {
    const { email, password } = req.body; 
    const identifiedUser = DUMMY_USERS.find(u => u.email === email); 
    if (!identifiedUser || identifiedUser.password!==password) { 
        throw new HttpError("Couldn't identify user", 401); 
    }
    res.json({message: 'Logged in'}); 
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;