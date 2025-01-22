import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "world",
  password: "xxxxx",
  port: 5432,
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let currentUserId = 1;

// let users = [
//   { id: 1, name: "Angela", color: "teal" },
//   { id: 2, name: "Jack", color: "powderblue" },
// ];

async function checkVisisted() {
  const result = await db.query("SELECT country_code FROM visited_countries WHERE user_id = $1;", [currentUserId]);
  let countries = [];
  result.rows.forEach((country) => {
    countries.push(country.country_code);
  });
  return countries;
}

// Display with selection by user_id = currentUserId
app.get("/", async (req, res) => {
  const result = await db.query("SELECT * FROM users;"); 
  const users = result.rows; 
  const currentUser = users.find((user) => user.id == currentUserId);
  const currentColor = currentUser? currentUser.color : "red"; 

  // DBG 
  console.log("users = ", users);
  console.log("currentUser = ", currentUser);
  
  const countries = await checkVisisted();
  res.render("index.ejs", {
    countries: countries,
    total: countries.length,
    users: users,
    color: currentColor,
  });
});

// Add country with currentUserId
app.post("/add", async (req, res) => {
  const input = req.body["country"];

  try {
    const result = await db.query(
      "SELECT country_code FROM countries WHERE LOWER(country_name) LIKE '%' || $1 || '%';",
      [input.toLowerCase()]
    );

    const data = result.rows[0];
    const countryCode = data.country_code;
    try {
      await db.query(
        "INSERT INTO visited_countries (country_code, user_id) VALUES ($1, $2);",
        [countryCode, currentUserId]
      );
      res.redirect("/");
    } catch (err) {
      console.log(err);
    }
  } catch (err) {
    console.log(err);
  }
});

// Change User, or transition to Add New User 
app.post("/user", async (req, res) => {
  // console.log(req.body["user"]);
  // console.log(req.body["add"]);
  if (req.body["user"]) { 
    // changing current user 
    currentUserId = req.body["user"];
    res.redirect("/");
  } else if (req.body["add"] === "new") { 
    // adding new user
    res.render("new.ejs");
  }
});

// Add New User 
app.post("/new", async (req, res) => {
  //Hint: The RETURNING keyword can return the data that was inserted.
  //https://www.postgresql.org/docs/current/dml-returning.html

  // console.log(req.body["name"]);
  // console.log(req.body["color"]);
  const userName = req.body["name"];
  const userColor = req.body["color"];
  const results = await db.query("INSERT INTO users (name, color) VALUES ($1,$2) RETURNING id;", 
    [userName, userColor]
  );
  // console.log(results.rows[0]);
  currentUserId = results.rows[0].id; 
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
