import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import IndividualsForm from "./IndividualsForm";

const IndividualSpecies = () => {
  const { id } = useParams();

  const [individualsOfSpecies, setIndividualsOfSpecies] = useState();

  const getIndividualSpecies = async (speciesId) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/v1/individuals/${speciesId}`
      );

      if (response.ok) {
        const {
          data: { individuals },
        } = await response.json();

        setIndividualsOfSpecies(individuals);
      } else if (!response.ok) {
        throw new Error("Network response was not okay");
      }
    } catch (error) {
      console.error("Error occured while fetching data", error);
    }
  };

  console.log(individualsOfSpecies);

  useEffect(() => {
    getIndividualSpecies(id);
  }, [id]);
  return (
    <div>
      {individualsOfSpecies && (
        <h2>{`List of Individual ${individualsOfSpecies[0].common_name}s`}</h2>
      )}
      <IndividualsForm setIndividualsOfSpecies={setIndividualsOfSpecies} />
      {individualsOfSpecies && (
        <div className="container">
          {individualsOfSpecies.map((individual) => {
            const {
              nickname,
              scientist_name,
              species_id,
              id,
              scientific_name,
              common_name,
              sighting_location,
              sighting_datetime,
            } = individual;
            return (
              <div className="individualContainer" key={id}>
                <Link to={`/individuals/${id}/sighting`}>
                  <h3>{nickname}</h3>
                  <h3>Common Name: {common_name}</h3>
                  <h3>Scientific Name: {scientific_name}</h3>
                  <h4>Sighted By: {scientist_name}</h4>
                  <h4>
                    Sighted at {sighting_location} on
                    {sighting_datetime}
                  </h4>
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default IndividualSpecies;
