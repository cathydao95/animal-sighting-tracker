import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

const SightingsForm = ({ setIndividualsSightings }) => {
  const { id } = useParams();
  const [sightingInfo, setSightingInfo] = useState({});

  const handleInput = (e) => {
    setSightingInfo((prevInfo) => {
      return { ...prevInfo, [e.target.name]: e.target.value };
    });
  };

  console.log(sightingInfo);

  const addSighting = async (e, individualId) => {
    e.preventDefault();
    console.log(individualId);
    try {
      const response = await fetch(
        `http://localhost:8080/api/v1/individuals/${individualId}/sighting`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(sightingInfo),
        }
      );

      if (response.ok) {
        const {
          data: { newSighting },
        } = await response.json();
        setIndividualsSightings((prevSightings) => [
          ...prevSightings,
          newSighting,
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
          <label htmlFor="sighting_datetime"> Sighting Date:</label>
          <input
            type="datetime-local"
            id="sighting_datetime"
            name="sighting_datetime"
            onChange={(e) => handleInput(e)}
          />
        </div>
        <div className="formRow">
          <label htmlFor="sighting_location"> Sighting Location:</label>
          <input
            type="text"
            id="sighting_location"
            name="sighting_location"
            onChange={(e) => handleInput(e)}
          />
        </div>
        <div className="formRow">
          <label htmlFor="is_healthy"> Is Healthy?:</label>
          <select
            name="is_healthy"
            id="is_healthy"
            onChange={(e) => handleInput(e)}
          >
            <option value="">Select an option</option>
            <option value="True">True</option> 
            <option value="False">False</option>
          </select>
          {/* <input
            type="text"
            id="is_healthy"
            name="is_healthy"
            onChange={(e) => handleInput(e)}
          /> */}
        </div>
        <div className="formRow">
          <label htmlFor="scientist_email"> Scientist Email:</label>
          <input
            type="text"
            id="scientist_email"
            name="scientist_email"
            onChange={(e) => handleInput(e)}
          />
        </div>

        <button onClick={(e) => addSighting(e, id)}>Add a Sighting</button>
      </form>
    </div>
  );
};

export default SightingsForm;
