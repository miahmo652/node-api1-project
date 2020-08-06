const express = require("express")
const shortid = require("shortid")
const db = require("./database")
const server = express()
server.use(express.json())



server.get("/", (req, res)=>{
    res.json({message: "hello, world"})
})

server.get("/api/users", (req, res)=>{
    const users = db.getUsers()
if(users){
    
    res.json(users)
} else {
    res.status(500).json({errorMessage: "The user with the specified ID does not exist."})
}
})

server.get("/api/users/:id", (req, res)=>{
    // the param variable matches up to the name of our url param above
    const id = req. params.id
// get a specific user by their id from the fake database
    const user = db.getUserById(id)

    if (user){
        res.json(user)
    } else {
        res.status(404).json({message:"User not found"})
    }
    
})

server.post("/api/users", (req, res)=>{
 shortBody = req.body
 shortBody.id = shortid.generate()
 const users = db.getUsers()
 if(!users){
     res.status(400).json({
        errorMessage: "Please provide name and bio for the user."
     })
 } else {
     const newUser = db.createUser({
         name: req.body.name,
         bio: req.body.bio,
     })
     res.status(201).json(newUser)
 }

})

server.put("/api/users/:id", (req, res) => {
    const user = db.getUserById(req.params.id);
    if (user) {
      const editUser = db.updateUser(user.id, {
        name: req.body.name || user.name,
        bio: req.body.bio || user.bio,
      });
      res.json(editUser);
    } else {
      res.status(404).json({
        message: "The user with the specified ID does not exist.",
      });
    }
  });

server.delete("/api/users/:id", (req, res)=>{
    const user =db.getUserById(req.params.id)

    if(user){
        db.deleteUser(user.id)

    res.status(204).end()
    } else {
        res.status(404).json({
            message: "user not found"
        })
    }
    
})

server.listen(8000, ()=>{
    console.log("server started on port 8000")
})