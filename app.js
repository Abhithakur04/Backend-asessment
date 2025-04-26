const express=require("express"); // it will import Express.js library
const app=express(); //Creates an application instances
const port=process.env.PORT || 4000;

app.use(express.json());


app.get("/",(req,res)=>{
  res.send("Backend Api is running");
});

app.listen(port,()=>{
  console.log(`Server Listening on port ${port}`);
})

