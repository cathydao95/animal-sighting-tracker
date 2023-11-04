import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SpeciesForm from "./SpeciesForm";
import Loading from "../Loading";
import fetchData from "../../utils";

const AllSpecies = () => {
  const [species, setSpecies] = useState();

  const getAllSpecies = async () => {
    try {
      const response = await fetchData("/species");

      if (response) {
        const {
          data: { species },
        } = response;

        setSpecies(species);
      }
    } catch (error) {
      console.error("Error occured while creating species", error);
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

  return !species ? (
    <Loading />
  ) : (
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
                  <h3 className="mainTitle">{common_name}</h3>
                </Link>
                <p>Scientific Name: {scientific_name}</p>
                <p>Estimated Population: {estimated_population}</p>
                <p>Conservation Status Code: {conservation_status_code}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AllSpecies;
