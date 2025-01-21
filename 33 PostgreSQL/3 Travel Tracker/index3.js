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

async function getVisitedCountries() {
  let visited_countries = []; 
  const result = await db.query("SELECT country_code FROM visited_countries");
  // DON'T do this to reuse db connection until this app is running.... 
  // await db.end();
  // console.log(result.rows); 

  // just 2 different ways
  visited_countries = result.rows.map(row=>row.country_code);
  // result.rows.forEach(row => visited_countries.push(row.country_code));

  console.log(visited_countries); 
  return visited_countries; 
}

app.get("/", async (req, res) => {
  //Write your code here.  
  let visited_countries = await getVisitedCountries(); 
  res.render("index.ejs", {total:visited_countries.length, countries:visited_countries});
});

app.post("/add", async (req, res) => {
  const country_name = req.body["country"];

  try { 
    const result = await db.query("SELECT country_code from countries WHERE country_name = $1", [
      country_name
    ]);
    const country_code = result.rows[0].country_code; // can throw exception if no country found 
    console.log(country_code);  
    try { 
      await db.query("INSERT INTO visited_countries (country_code) VALUES ($1)", [
        country_code
      ]);  
      res.redirect("/");      
    } catch (err) { 
      let visited_countries = await getVisitedCountries(); 
      res.render("index.ejs", {
        total:visited_countries.length, 
        countries:visited_countries, 
        error:"Duplicated Country Name", 
      });
    }
  } catch (err) { 
    let visited_countries = await getVisitedCountries(); 
    res.render("index.ejs", {
      total:visited_countries.length, 
      countries:visited_countries,
      error:"Invalid Country Name",
    });    
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
