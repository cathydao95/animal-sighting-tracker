import { useState } from "react";
import FormRow from "../FormRow";
import fetchData from "../../utils";

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
      const response = await fetchData("/species", "POST", {}, speciesInfo);

      if (response) {
        const {
          data: { newSpecies },
        } = response;

        setSpecies((prevSpecies) => [...prevSpecies, newSpecies]);
      }
    } catch (error) {
      console.error("Error occured while creating event", error);
    }
  };

  console.log(speciesInfo);
  return (
    <div>
      <form className="formContainer">
        <FormRow
          name="common_name"
          label="Common Name"
          type="text"
          onChange={(e) => handleInput(e)}
        />
        <FormRow
          name="scientific_name"
          label="Scientific Name"
          type="text"
          onChange={(e) => handleInput(e)}
        />
        <FormRow
          name="estimated_population"
          label="Estimated Population"
          type="number"
          onChange={(e) => handleInput(e)}
        />
        <div className="formRow">
          <label htmlFor="conservation_status">Conservation Status:</label>
          <select
            name="conservation_status_code"
            id="conservation_status"
            type="text"
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
