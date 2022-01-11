// BUILD YOUR SERVER HERE

//IMPORTS
const express = require('express');
const {
    find,
    findById,
    insert,
    update,
    remove,
    resetDB, // ONLY TESTS USE THIS ONE
  } = require('./users/model'); 
//import express from 'express
const server = express();

server.use(express.json());  //parse.json from requests

server.post('/users', async(req, res) => {
  try {
    await insert(req.body);
    const newUsers = await find();
    res.status(200).json(newUsers);
  } catch(err) {
    res.status(500).json({ message: err.message });
  }
})

server.get('/users', async (req, res) => {
  try {
    const users = await find(); 
    res.status(200).json(users);
  } catch(err) {
    res.status(500).json({message: err.message});
  }
});

server.get('/users/:id', async (req,res) => {
    try {
        const user = await findById(req.params.id);
        if (!user) {
            res.status(404).json({message: 'no user'})
        } else {
          res.status(200).json( user );
        }
    } catch(err) {
        res.status(500).json({message: err.message});
    }
})

module.exports = server; // EXPORT YOUR SERVER instead of {}
