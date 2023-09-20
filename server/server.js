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

// app.get("/api/v1/individuals", async (req, res) => {
//   try {
//     const { rows: individuals } = await db.query("SELECT * FROM individuals");

//     res.status(200).json({
//       status: "success",
//       results: individuals.length,
//       data: { individuals },
//     });
//   } catch (error) {
//     return res.status(400).json({ error });
//   }
// });

// app.get("/api/v1/sightings", async (req, res) => {
//   try {
//     const { rows: sightings } = await db.query("SELECT * FROM sightings");

//     res.status(200).json({
//       status: "success",
//       results: sightings.length,
//       data: { sightings },
//     });
//   } catch (error) {
//     return res.status(400).json({ error });
//   }
// });

// app.get("/api/v1/species/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const result = await db.query("SELECT * FROM species WHERE id=$1", [id]);
//     console.log("result", result.rows[0]);
//     res.status(200).json({
//       status: "success",
//       data: { species: result.rows[0] },
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(400).json({ error });
//   }
// });

// GET ALL INDIVIDUALS IN A SPECIES

app.get("/api/v1/individuals/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const query = `
    SELECT * FROM individuals WHERE species_id = $1`;

    // const query = `
    //   SELECT individuals.*, species.common_name, species.scientific_name, sightings.is_healthy, sightings.sighting_location, sightings.sighting_datetime
    //   FROM individuals
    //   INNER JOIN species ON individuals.species_id = species.id
    //   INNER JOIN sightings ON individuals.id = sightings.individual_id
    //   WHERE individuals.species_id = $1
    // `;

    const result = await db.query(query, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        status: "error",
        message: "Individual not found",
      });
    }

    const individuals = result.rows;

    res.status(200).json({
      status: "success",
      data: { individuals },
    });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
});
// app.get("/api/v1/individuals/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const query = `
//       SELECT individuals.*, species.common_name, species.scientific_name
//       FROM individuals
//       INNER JOIN species ON individuals.species_id = species.id
//       WHERE individuals.species_id = $1
//     `;

//     const result = await db.query(query, [id]);

//     if (result.rows.length === 0) {
//       return res.status(404).json({
//         status: "error",
//         message: "Individual not found",
//       });
//     }

//     const individuals = result.rows;

//     res.status(200).json({
//       status: "success",
//       data: { individuals },
//     });
//   } catch (error) {
//     return res.status(500).json({ error: "Internal server error" });
//   }
// });

// GET ALL SIGHTINGS OF AN INDIVIDUAL

app.get("/api/v1/sightings/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const query = `
     SELECT individuals.nickname, individuals.scientist_name, sightings.*
      FROM individuals
      LEFT JOIN sightings ON individuals.id = sightings.individual_id
      WHERE individuals.id = $1
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

app.post("/api/v1/species/:id/individuals", async (req, res) => {
  try {
    const { id } = req.params;
    const { nickname, scientist_name } = req.body;
    console.log(id, nickname, scientist_name);
    const newIndividual = await db.query(
      "INSERT INTO individuals (nickname, scientist_name, species_id) VALUES($1, $2, $3) RETURNING *",
      [nickname, scientist_name, id]
    );

    // see if this is needed
    // const findSpecies = await db.query("SELECT * FROM species WHERE id = $1", [
    //   id,
    // ]);
    res.status(200).json({
      status: "success",
      data: { newIndividual: newIndividual.rows[0] },
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error });
  }
});

app.post("/api/v1/individuals/:id/sighting", async (req, res) => {
  try {
    const { id } = req.params;
    const {
      sighting_location,
      sighting_datetime,
      is_healthy,
      scientist_email,
    } = req.body;

    const newSighting = await db.query(
      "INSERT INTO sightings (sighting_datetime,  individual_id, sighting_location,is_healthy, scientist_email) VALUES($1, $2, $3, $4, $5) RETURNING *",
      [sighting_datetime, id, sighting_location, is_healthy, scientist_email]
    );
    res.status(200).json({
      status: "success",
      data: { newSighting: newSighting.rows[0] },
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

    //  const updatedSpecies = await db.query(
    //    "UPDATE species SET (common_name, scientific_name, estimated_population, conservation_status_code) = ($1, $2, $3, $4) WHERE species_id=$5",
    //    [
    //      common_name,
    //      scientific_name,
    //      estimated_population,
    //      conservation_status_code,
    //      id,
    //    ]
    //  );
    //  if (updatedSpecies.rowCount === 0) {
    //    return res.status(404).json({ status: "Species not found" });
    //  }
    //  const species = await db.query(
    //    "SELECT * FROM species WHERE id=$1",
    //    [id]
    //  );
    // can do returning star instead of querying again
    const updatedSpecies = await db.query(
      "UPDATE species SET common_name=$1, scientific_name=$2, estimated_population=$3, conservation_status_code=$4 WHERE id=$5 RETURNING *",
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

    res.json({
      status: "Species Updated",
      updatedSpecies: updatedSpecies.rows[0],
    });
  } catch (error) {
    console.log(error);
    res.json({ status: "failure" });
  }
});

app.delete("/api/v1/species/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deletedSpecies = await db.query("DELETE FROM species WHERE id=$1", [
      id,
    ]);

    res.json({
      status: "Species Deleted",
    });
  } catch (error) {
    console.log(error);
    res.json({ status: "failure" });
  }
});

app.listen(PORT, () =>
  console.log(`Server running on Port http://localhost:${PORT}`)
);
