import express, { urlencoded } from "express";
import cors from "cors";
import path from "path";
import "dotenv/config";
import db from "./db/db-connection.js";

const app = express();
const PORT = 8080;

// Configuring cors middleware
app.use(cors());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// //creates an endpoint for the route `/`
app.get("/", (req, res) => {
  res.json("Hello Animal tracker");
});

app.get("/api/v1/species", async (req, res) => {
  try {
    const results = await db.query("SELECT * FROM species");
    console.log(results);
    res.status(200).json({
      status: "success",
      results: results.rows.length,
      data: { species: results.rows },
    });
  } catch (error) {
    return res.status(400).json({ error });
  }
});

app.get("/api/v1/species/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.query("SELECT * FROM species WHERE species_id=$1", [
      id,
    ]);
    console.log("result", result.rows[0]);
    res.status(200).json({
      status: "success",
      data: { species: result.rows[0] },
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error });
  }
});

app.listen(PORT, () =>
  console.log(`Server running on Port http://localhost:${PORT}`)
);
