const express=require("express"); // it will import Express.js library
const app=express(); //Creates an application instances
const port=process.env.PORT || 4000;
const { v4: uuidv4 } = require('uuid');

app.use(express.json());


app.get("/",(req,res)=>{
  res.send("Backend Api is running");
});




const users = {};     
const sessions = {};  
const tasks = {};  //for tasks

function authMiddleware(req, res, next) {
  // Get token from the request header and Find the username from the token
  const token = req.headers['authorization']; 
  const username = sessions[token]; 

  if (!username) {
    return res.status(403).json({ message: "Invalid or missing token" });
  }

  req.username = username; // Attach the username to the request for further use
  next(); // Proceed to the next middleware 
}

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
  sessions[token] = username;  // 👈 Store the token in sessions

  res.json({ message: "Login successful", token });
});

// Add task
app.post('/tasks', authMiddleware, (req, res) => {
  const { task } = req.body;
  
  if (!task) {
    return res.status(400).json({ message: "Task is required" });
  }
  const taskObject = {
    id: uuidv4(),
    task: task
  };

  if (!tasks[req.username]) {
    tasks[req.username] = [];
  }

  tasks[req.username].push(taskObject);

  res.json({ message: "Task added successfully", task: taskObject });
});

// View Tasks Route
app.get('/tasks', authMiddleware, (req, res) => {
  const userTasks = tasks[req.username] || [];
  res.json({ tasks: userTasks });
});

app.listen(port,()=>{
  console.log(`Server Listening on port ${port}`);
})