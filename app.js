const express=require("express"); // it will import Express.js library
const app=express(); //Creates an application instances
const port=process.env.PORT || 4000;
const { v4: uuidv4 } = require('uuid');

app.use(express.json());


app.get("/",(req,res)=>{
  res.send("Backend Api is running");
});



// In-memory data
const users = {};     // { username: { password } }

app.post('/register', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password required" });
  }

  if (users[username]) {
    return res.status(400).json({ message: "User already exists" });
  }

  users[username] = { password };
  res.json({ message: "User registered successfully" });
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Check if the user exists or password mismatch
  const user = users[username];
  if (!user || user.password !== password) {
    return res.status(401).json({ message: "Invalid Username or password" });
  }
 //creating token
  const token = uuidv4();


  res.json({ message: "Login successful", token });
});

app.listen(port,()=>{
  console.log(`Server Listening on port ${port}`);
})