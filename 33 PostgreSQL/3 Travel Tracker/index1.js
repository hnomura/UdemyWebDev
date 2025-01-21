import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const db = new pg.Client({
  user: "postgres", 
  password: "xxx",
  host: "localhost",
  port: 5432, 
  database: "world",
});
db.connect(); 

app.get("/", async (req, res) => {
  //Write your code here.  

  let visited_countries = []; 
  const result = await db.query("SELECT country_code FROM visited_countries");
  // DON'T do this to reuse db connection until this app is running.... 
  // await db.end();

  console.log(result.rows); 
  result.rows.forEach(row => visited_countries.push(row.country_code));
  console.log(visited_countries); 

  res.render("index.ejs", {total:visited_countries.length, countries:visited_countries});
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
