// BUILD YOUR SERVER HERE

//IMPORTS
const express = require('express')
const {
    find,
    findById,
    insert,
    update,
    remove,
  } = require('./users/model') 
//import express from 'express
const server = express()

server.use(express.json())  //parse.json from requests

server.post('/api/users', async (req, res) => {
  try {
    if (!req.body.bio || !req.body.name) {
      res.status(400).json({message: "Please provide name and bio for the user"})
    } else {
      await insert(req.body)
      const newUsers = await find()
      const newUser = newUsers.filter( user => user.name === req.body.name && user.bio === req.body.bio)
      res.status(201).json(newUser[0].id)
    }
  } catch(err) {
    res.status(500).json({ message: "There was an error while saving the user to the database" })
  }
})

server.get('/api/users', async (req, res) => {
  try {
    const users = await find() 
    res.status(200).json(users)
  } catch(err) {
    res.status(500).json({message: "The users information could not be retrieved" })
  }
})

server.get('/api/users/:id', async (req, res) => {
  try {
    const user = await findById(req.params.id)
    if (!user) {
        res.status(404).json({message: "The user with the specified ID does not exist"})
    } else {
      res.status(200).json( user )
    }
  } catch(err) {
    res.status(500).json({message: "The users information could not be retrieved"})
  }
})

server.delete('/api/users/:id', async (req, res) => {
  try {
    const id = req.params.id
    const user = await findById(id)
    if (!user) {
        res.status(404).json({message: "The user with the specified ID does not exist"})
    } else {
      remove(id)
      res.status(200).json( user )
      }
  } catch(err) {
    res.status(500).json({message: "The user could not be removed"})
  }
})

server.put('/api/users/:id', async (req, res) => {
  try {
    const id = req.params.id
    const user = await findById(id)
    if (!user) {
      res.status(404).json({message: "The user with the specified ID does not exist"})
    } else if (!req.body.bio || !req.body.name) {
      res.status(400).json({message: "Please provide name and bio for the user"})
    } else {  
      await update(id, req.body)
      const updatedUser = await findById(id)
      res.status(200).json( updatedUser )
    }
  } catch(err) {
    res.status(500).json({message: "The user information could not be modified"})
  }
})

module.exports = server // EXPORT YOUR SERVER instead of {}
