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

app.post("/api/v1/species", async (req, res) => {
  try {
    const {
      common_name,
      scientific_name,
      estimated_population,
      conservation_status_code,
    } = req.body;
    // how to destructure this? so can obtain rows here?
    const newSpecies = await db.query(
      "INSERT INTO species (common_name, scientific_name, estimated_population, conservation_status_code) VALUES($1, $2, $3, $4) RETURNING *",
      [
        common_name,
        scientific_name,
        estimated_population,
        conservation_status_code,
      ]
    );
    console.log("newSpecies", newSpecies.rows[0]);
    res.status(200).json({
      status: "success",
      data: { newSpecies: newSpecies.rows[0] },
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error });
  }
});

app.put("/api/v1/species/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const {
      common_name,
      scientific_name,
      estimated_population,
      conservation_status_code,
    } = req.body;
    const updatedSpecies = await db.query(
      "UPDATE species SET (common_name, scientific_name, estimated_population, conservation_status_code) = ($1, $2, $3, $4) WHERE species_id=$5",
      [
        common_name,
        scientific_name,
        estimated_population,
        conservation_status_code,
        id,
      ]
    );
    if (updatedSpecies.rowCount === 0) {
      return res.status(404).json({ status: "Species not found" });
    }
    const species = await db.query(
      "SELECT * FROM species WHERE species_id=$1",
      [id]
    );
    res.json({
      status: "Species Updated",
      updatedSpecies: species.rows[0],
    });
  } catch (error) {
    console.log(error);
    res.json({ status: "failure" });
  }
});

app.listen(PORT, () =>
  console.log(`Server running on Port http://localhost:${PORT}`)
);
