import { useState } from "react";
import { useParams, Link } from "react-router-dom";

const IndividualsForm = ({ setIndividualsOfSpecies }) => {
  const { id } = useParams();

  const [individualInfo, setIndividualInfo] = useState({});

  const handleInput = (e) => {
    setIndividualInfo((prevInfo) => {
      return { ...prevInfo, [e.target.name]: e.target.value };
    });
  };

  console.log(individualInfo);

  const addIndividual = async (e, speciesId) => {
    e.preventDefault();
    console.log(speciesId);
    try {
      const response = await fetch(
        `http://localhost:8080/api/v1/species/${speciesId}/individuals`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(individualInfo),
        }
      );

      if (response.ok) {
        const {
          data: { newIndividual },
        } = await response.json();
        setIndividualsOfSpecies((prevIndividual) => [
          ...prevIndividual,
          newIndividual,
        ]);
      } else if (!response.ok) {
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      console.error("Error occured while creating event", error);
    }
  };

  return (
    <div>
      <form className="formContainer">
        <div className="formRow">
          <label htmlFor="nickname"> Nickname:</label>
          <input
            type="text"
            id="cnickame"
            name="nickname"
            onChange={(e) => handleInput(e)}
          />
        </div>
        <div className="formRow">
          <label htmlFor="scientist_name">Scientist Name:</label>
          <input
            type="text"
            id="scientist_name"
            name="scientist_name"
            onChange={(e) => handleInput(e)}
          />
        </div>
        <button onClick={(e) => addIndividual(e, id)}>
          Add New Individual
        </button>
      </form>
    </div>
  );
};

export default IndividualsForm;
