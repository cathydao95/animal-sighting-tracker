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

// GET ALL SPECIES
app.get("/api/v1/species", async (req, res) => {
  try {
    // destructure rows from result and assign to variable species
    const { rows: species } = await db.query("SELECT * FROM species");

    res.status(200).json({
      status: "success",
      results: species.length,
      data: { species },
    });
  } catch (error) {
    return res.status(400).json({ error });
  }
});

// GET ALL INDIVIDUALS IN A SPECIES

app.get("/api/v1/individuals/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const query = `SELECT individuals.*, species.common_name, species.scientific_name
      FROM species
      LEFT JOIN individuals ON species.id = individuals.species_id
      WHERE species.id = $1`;

    const result = await db.query(query, [id]);

    const individuals = result.rows;

    res.status(200).json({
      status: "success",
      data: { individuals },
    });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
});

// GET ALL SIGHTINGS OF AN INDIVIDUAL
app.get("/api/v1/sightings/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const query = `
      SELECT individuals.nickname, individuals.scientist_name, sightings.*
      FROM individuals
      LEFT JOIN sightings ON individuals.id = sightings.individual_id
      WHERE individuals.id  = $1
    `;

    const result = await db.query(query, [id]);

    res.status(200).json({
      status: "success",
      data: { sightings: result.rows },
    });
  } catch (error) {
    return res.status(400).json({ error });
  }
});

// POSTS

// CREATE NEW SPECIES
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
    res.status(200).json({
      status: "success",
      data: { newSpecies: newSpecies.rows[0] },
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error });
  }
});

// CREATE NEW INDIVIDUAL

app.post("/api/v1/species/:id/individuals", async (req, res) => {
  try {
    const { id } = req.params;
    const { nickname, scientist_name, scientist_email } = req.body;

    const newIndividual = await db.query(
      "INSERT INTO individuals (nickname, scientist_name, scientist_email, species_id) VALUES($1, $2, $3, $4) RETURNING *",
      [nickname, scientist_name, scientist_email, id]
    );

    const findSpecies = await db.query("SELECT * FROM species WHERE id = $1", [
      id,
    ]);

    const returnedData = {
      id: newIndividual.rows[0].id,
      nickname: newIndividual.rows[0].nickname,
      scientist_name: newIndividual.rows[0].scientist_name,
      scientist_email: newIndividual.rows[0].scientist_email,
      species_id: newIndividual.rows[0].species_id,
      common_name: findSpecies.rows[0].common_name,
      scientific_name: findSpecies.rows[0].scientific_name,
    };

    console.log(returnedData);

    res.status(200).json({
      status: "success",
      data: { newIndividual: returnedData },
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error });
  }
});

// CREATE NEW SIGHTING
app.post("/api/v1/individuals/:id/sighting", async (req, res) => {
  try {
    const { id } = req.params;
    const {
      sighting_location,
      sighting_datetime,
      is_healthy,
      scientist_name,
      scientist_email,
    } = req.body;

    const newSighting = await db.query(
      "INSERT INTO sightings (sighting_datetime,  individual_id, sighting_location,is_healthy, scientist_name, scientist_email) VALUES($1, $2, $3, $4, $5, $6) RETURNING *",
      [
        sighting_datetime,
        id,
        sighting_location,
        is_healthy,
        scientist_name,
        scientist_email,
      ]
    );

    const findIndividual = await db.query(
      "SELECT * FROM individuals WHERE id=$1",
      [id]
    );

    const returnedInfo = {
      ...newSighting.rows[0],
    };
    res.status(200).json({
      status: "success",
      data: { newSighting: returnedInfo },
    });

    // res.status(200).json({
    //   status: "success",
    //   data: { newSighting: newSighting.rows[0] },
    // });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error });
  }
});

app.listen(PORT, () =>
  console.log(`Server running on Port http://localhost:${PORT}`)
);
