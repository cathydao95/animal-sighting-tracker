import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import IndividualsForm from "./IndividualsForm";
import Loading from "../Loading";
import fetchData from "../../utils";
import IndividualsCard from "../IndividualsCard/IndividualsCard";

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

        setIndividualsOfSpecies(individuals);
      }
    } catch (error) {
      console.error("Error occured while fetching data", error);
    }
  };

  useEffect(() => {
    getIndividualSpecies(id);
  }, [id]);
  return !individualsOfSpecies ? (
    <Loading />
  ) : individualsOfSpecies.length > 0 ? (
    <div>
      {individualsOfSpecies && (
        <h2>{`List of Individual ${individualsOfSpecies[0].common_name}s`}</h2>
      )}
      <IndividualsForm setIndividualsOfSpecies={setIndividualsOfSpecies} />
      {individualsOfSpecies.length > 0 && (
        <div className="container">
          {individualsOfSpecies.map((individual) => {
            const { nickname } = individual;

            return nickname && <IndividualsCard individual={individual} />;
          })}
        </div>
      )}
    </div>
  ) : (
    <div>
      <Link to="/">Back Home</Link>
    </div>
  );
};

export default IndividualSpecies;
