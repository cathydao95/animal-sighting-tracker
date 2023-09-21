import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import IndividualsForm from "./IndividualsForm";
import Loading from "../Loading";
import fetchData from "../../utils";

const IndividualSpecies = () => {
  const { id } = useParams();

  const [individualsOfSpecies, setIndividualsOfSpecies] = useState();

  const getIndividualSpecies = async (speciesId) => {
    try {
      const response = await fetchData(`/individuals/${speciesId}`);

      if (response) {
        const {
          data: { individuals },
        } = response;

        console.log(response, "response");
        setIndividualsOfSpecies(individuals);
      }
    } catch (error) {
      console.error("Error occured while fetching data", error);
    }
  };

  console.log(individualsOfSpecies);

  useEffect(() => {
    getIndividualSpecies(id);
  }, [id]);
  return !individualsOfSpecies ? (
    <Loading />
  ) : (
    <div>
      {individualsOfSpecies && (
        <h2>{`List of Individuals `}</h2>
        // <h2>{`List of Individual ${individualsOfSpecies[0].common_name}s`}</h2>
      )}
      <IndividualsForm setIndividualsOfSpecies={setIndividualsOfSpecies} />
      {individualsOfSpecies.length > 0 && (
        <div className="container">
          {individualsOfSpecies.map((individual) => {
            const {
              nickname,
              scientist_name,
              scientist_email,
              id,
              scientific_name,
              common_name,
              sighting_location,
              sighting_datetime,
            } = individual;
            return (
              <div className="individualContainer" key={id}>
                <Link to={`/individuals/${id}/sighting`}>
                  <h3 className="mainTitle">{nickname}</h3>
                  <p>Common Name: {common_name}</p>
                  <p>Scientific Name: {scientific_name}</p>
                  <p>Discovered By: {scientist_name}</p>
                  <p>Email: {scientist_email}</p>
                  <p>
                    Sighted at {sighting_location} on
                    {sighting_datetime}
                  </p>
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
