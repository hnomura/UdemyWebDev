import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";

// import { dirname } from "path";
// import { fileURLToPath } from "url";
// const __dirname = dirname(fileURLToPath(import.meta.url));

// REF: https://github.com/nodejs/node/pull/48740 
// Node.js v21.2.0~
const __dirname = import.meta.dirname;
const __filename = import.meta.filename;

const app = express();
const port = 3000;

app.use(morgan("combined"));
app.use(bodyParser.urlencoded({ extended: true}));
app.use((req,res,next)=>{
  if (req.method=="POST") { 
    console.log("req.url="+req.url);
    console.log("req.body="+req.body);
  }
  next(); 
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.post("/submit", (req,res) => {
  let html="<h1>Your band name is:</h1>";
  html += "<h2>"+req.body.street+req.body.pet+"</h2>";
  console.log(html);
  res.status(200).send(html);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
