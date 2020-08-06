// * import express & nanoid dependenies
const express = require("express")
const nanoid = require('nanoid/non-secure')

// * importing database file to server 
const database = require("./database")

// * create server with express
const server = express();

// * gets all users data from the database 
server.get('/api/users', (req, res) =>  {
    const users = database.getUsers()
    res.json(users)
})


// * gets single user by id
server.get('api/users/:id', (req, res) => {
    const id = req.params.id
    
    const user = database.getUserById(id)
    
    if (user) {
        res.json(user)
    } else {
        res.status.json({message: 'user not found'})
    }
})


// * creates new user in the database 
server.post('api/users/:id', (req, res) => {
    const userId = nanoid()

    const newUser = database.createUser({
       id: userId,
       name: req.body.name,
       bio: req.body.bio,
   })

   res.status(201).json(newUser)
})


// * deletes user based on id
server.delete('/api/users/:id', (req, res) => {
    const user = database.getUserById(req.params.id)

    if (user) {
        database.deleteUser(req.params.id)
    } else {
        res.status(404).json({
            message: 'user not found'
        })
    }

    res.status(204).end()
})

// * updates the user based on id and returns the updated user 
server.put('api/users/:id', (req, res) => {
    const id = req.params.id
    const user = database.getUserById(req.params.id)

    if (user) {
        database.updateUser(id, {
            ...user,
            name: req.body.name,
            bio: req.body.bio
        })
    } else {
        res.status(404).json({
            message: 'user not found'
        })
    }
})


// * server listens on port 8080 locally
server.listen(8080, () => {
	console.log('server started on port 8080')
})



