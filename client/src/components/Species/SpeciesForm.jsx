import { useState } from "react";
import "./SpeciesForm.css";

const SpeciesForm = ({ setSpecies }) => {
  const [speciesInfo, setSpeciesInfo] = useState({});

  const handleInput = (e) => {
    setSpeciesInfo((prevInfo) => {
      return { ...prevInfo, [e.target.name]: e.target.value };
    });
  };

  const addSpecies = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/api/v1/species", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(speciesInfo),
      });
      if (response.ok) {
        const {
          data: { newSpecies },
        } = await response.json();
        setSpecies((prevSpecies) => [...prevSpecies, newSpecies]);
      } else if (!response.ok) {
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      console.error("Error occured while creating event", error);
    }
  };

  console.log(speciesInfo);
  return (
    <div>
      <form className="formContainer">
        <div className="formRow">
          <label htmlFor="common_name">Common Name:</label>
          <input
            type="text"
            id="common_name"
            name="common_name"
            onChange={(e) => handleInput(e)}
          />
        </div>
        <div className="formRow">
          <label htmlFor="scientific_name">Scientific Name:</label>
          <input
            type="text"
            id="scientific_name"
            name="scientific_name"
            onChange={(e) => handleInput(e)}
          />
        </div>
        <div className="formRow">
          <label htmlFor="estimated_population">Estimated Population:</label>
          <input
            type="number"
            id="estimated_population"
            name="estimated_population"
            onChange={(e) => handleInput(e)}
          />
        </div>
        <div className="formRow">
          <label htmlFor="conservation_status">Conservation Status:</label>
          <select
            name="conservation_status_code"
            id="conservation_status"
            onChange={(e) => handleInput(e)}
          >
            <option value="NE">Not Evaluated</option> 
            <option value="DD">Data Deficient</option>
            <option value="LC">Least Concern</option> 
            <option value="NT">Near Threatened</option>
            <option value="VU">Vulnerable</option> 
            <option value="EN">Endangered</option>
            <option value="CR">Critically Endangered</option> 
            <option value="EW">Extinct in the Wild</option>
            <option value="EX">Extinct</option>
          </select>
        </div>
        <button onClick={addSpecies}>Add A New Species</button>
      </form>
    </div>
  );
};

export default SpeciesForm;
