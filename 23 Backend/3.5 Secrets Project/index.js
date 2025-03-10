//To see how the final website should work, run "node solution.js".
//Make sure you have installed all the dependencies with "npm i".
//The password is ILoveProgramming
import express from "express";
import bodyParser from "body-parser";
const __dirname = import.meta.dirname;

const port = 3000;
const app=express();

app.use(bodyParser.urlencoded({extended:true}));

app.post("/check", (req,res)=>{
    if (req.body.password=="ILoveProgramming"){
        res.status(200).sendFile(__dirname+"/public/secret.html");
    } else {
        // res.status(203).sendFile(__dirname+"/public/index.html");
        res.redirect("/");
    }
});

app.get("/", (req,res)=>{
    res.sendFile(__dirname+"/public/index.html");
});

app.listen(port, ()=>{
    console.log(`Server started at port ${port}`);
});
