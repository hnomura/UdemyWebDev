import express from "express";
const app = express(); 
const portNumber=3000;

app.get("/", (req,res)=>{
    console.log(req.rawHeaders);
    res.send("<h1>Hello World from Express!</h1>");
});

app.get("/about", (req,res)=>{
    res.send("<h1>About Page</h1>");
});

app.get("/contact", (req,res)=>{
    res.send("<h1>Do not contact me !</h1>");
});

app.listen(portNumber, ()=>{
    console.log(`Server Started on port ${portNumber}`);
});

