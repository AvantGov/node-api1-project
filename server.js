// * import express & nanoid dependenies
const express = require("express")
// const nanoid = require("nanoid/non-secure")
const bodyParser = require("body-parser")

// * importing database file to server 
const database = require("./database")

// * create server with express
const server = express();

// * support JSON encoded bodies
server.use(bodyParser.json());

// * support encoded bodies
server.use(bodyParser.urlencoded({ extended: true })); 


// * gets all users data from the database 
server.get('/api/users', (req, res) =>  {
    const users = database.getUsers()
    res.json(users)
})


// * gets single user by id
server.get('/api/users/:id', (req, res) => {
    const id = req.params.id
    
    const user = database.getUserById(id)
    
    if (user) {
        res.json(user)
    } else {
        res.status(404).json({message: 'user not found'})
    }
})


// * creates new user in the database 
server.post('/api/users', (req, res) => {
    

    const newUser = database.createUser({
       name: req.body.name,
       bio: req.body.bio,
       id: Math.random()
   })

    res.status(201).json(newUser)
    // res.status(201).json({resp: req.body.name})
  
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
server.put('/api/users/:id', (req, res) => {
    const id = req.params.id
    const user = database.getUserById(req.params.id)

    if (user) {
        database.updateUser(id, req.body)
        res.status(204).end()
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



