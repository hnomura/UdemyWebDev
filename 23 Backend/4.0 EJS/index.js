import express from "express";
const __dirname = import.meta.dirname;

const port=3000;
const app=express();

app.get("/", (req,res)=>{
    const today = new Date();
    const dayOfWeek = today.getDay();

    let templateVal = {
        dayType:   "a weekday",
        advice: "It's time to work hard"
    };
    if ( dayOfWeek == 0 || dayOfWeek==6) { 
        templateVal.dayType="The weekend";
        templateVal.advice = "It's time to have fun";
    }
    res.render(__dirname+"/views/index.ejs", templateVal);
});

app.listen(port, ()=>{
    console.log(`Server started at port ${port}`);
});

