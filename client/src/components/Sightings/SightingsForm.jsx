import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import FormRow from "../FormRow";
import fetchData from "../../utils";

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
      const response = await fetchData(
        `/individuals/${individualId}/sighting`,
        "POST",
        {},
        sightingInfo
      );

      if (response) {
        const {
          data: { newSighting },
        } = response;
        setIndividualsSightings((prevSightings) => [
          ...prevSightings,
          newSighting,
        ]);
      }
    } catch (error) {
      console.error("Error occured while creating event", error);
    }
  };

  // const addSighting = async (e, individualId) => {
  //   e.preventDefault();
  //   console.log(individualId);
  //   try {
  //     const response = await fetch(
  //       `http://localhost:8080/api/v1/individuals/${individualId}/sighting`,
  //       {
  //         method: "POST",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify(sightingInfo),
  //       }
  //     );

  //     if (response.ok) {
  //       const {
  //         data: { newSighting },
  //       } = await response.json();
  //       setIndividualsSightings((prevSightings) => [
  //         ...prevSightings,
  //         newSighting,
  //       ]);
  //     } else if (!response.ok) {
  //       throw new Error("Network response was not ok");
  //     }
  //   } catch (error) {
  //     console.error("Error occured while creating event", error);
  //   }
  // };

  return (
    <div>
      <form className="formContainer">
        <FormRow
          name="sighting_datetime"
          label="Sighting Date"
          type="datetime-local"
          onChange={(e) => handleInput(e)}
        />
        <FormRow
          name="sighting_location"
          label="Sighting Location"
          type="text"
          onChange={(e) => handleInput(e)}
        />
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
        </div>
        <FormRow
          name="scientist_name"
          label="Scientist Name"
          type="text"
          onChange={(e) => handleInput(e)}
        />
        <FormRow
          name="scientist_email"
          label="Scientist Email"
          type="text"
          onChange={(e) => handleInput(e)}
        />
        <button onClick={(e) => addSighting(e, id)}>Add a Sighting</button>
      </form>
    </div>
  );
};

export default SightingsForm;
