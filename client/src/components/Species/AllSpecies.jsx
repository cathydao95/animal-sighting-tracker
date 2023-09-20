import { useState, useEffect } from "react";
import "./AllSpecies.css";
import { Link } from "react-router-dom";
import SpeciesForm from "./SpeciesForm";

const AllSpecies = () => {
  const [species, setSpecies] = useState();

  const getAllSpecies = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/v1/species");

      if (response.ok) {
        const {
          data: { species },
        } = await response.json();

        setSpecies(species);
      } else if (!response.ok) {
        throw new Error("Network response was not okay");
      }
    } catch (error) {
      console.error("Error occured while fetching data", error);
    }
  };

  const deleteSpecies = async (e, speciesId) => {
    e.preventDefault();
    console.log(species);

    try {
      const response = await fetch(
        `http://localhost:8080/api/v1/species/${speciesId}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        setSpecies((prevSpecies) =>
          prevSpecies.filter((species) => species.id !== speciesId)
        );
      } else if (!response.ok) {
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      console.error("Error occured while deleting event", error);
    }
  };

  useEffect(() => {
    getAllSpecies();
  }, []);

  return (
    <div>
      <h1>All Species</h1>
      <SpeciesForm setSpecies={setSpecies} />
      {species && (
        <div className="container">
          {species.map((species) => {
            const {
              id,
              common_name,
              conservation_status_code,
              estimated_population,
              scientific_name,
            } = species;
            return (
              <div className="individualContainer" key={id}>
                <Link to={`/${id}`}>
                  <h3>{common_name}</h3>
                </Link>
                <h4>Scientific Name: {scientific_name}</h4>
                <h4>Estimated Population: {estimated_population}</h4>
                <h4>Conservation Status Code: {conservation_status_code}</h4>
                <div className="btnContainer">
                  <button>Edit</button>
                  <button onClick={(e) => deleteSpecies(e, id)}>Delete</button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AllSpecies;
