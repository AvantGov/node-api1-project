// * import express dependency
const express = require("express")

// * importing database file to server 
const database = require("./database")

// * create server with express
const server = express();

// * gets data from the database 
server.get('/api/users/:id', (req, res) =>  {
    const id = req.params.id
    const user = database.getUserById(id)
    res.json(user)

})


// * server listens on port 8080 locally
server.listen(8080, () => {
	console.log('server started on port 8080')
})



