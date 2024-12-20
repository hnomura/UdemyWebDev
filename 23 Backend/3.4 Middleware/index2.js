import express from "express";
import morgan, { format } from "morgan";

const app = express();
const port = 3000;

app.use(morgan("combined"));
// app.use(morgan("common"));
// app.use(morgan("dev"));
// app.use(morgan("short"));
// app.use(morgan("tiny"));

app.get("/", (req, res) => {
  res.send("Hello");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
