import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import FormRow from "../FormRow";
import fetchData from "../../utils";

const IndividualsForm = ({ setIndividualsOfSpecies }) => {
  const { id } = useParams();

  const [individualInfo, setIndividualInfo] = useState({
    nickname: "",
    scientist_email: "",
    scientist_name: "",
  });

  const handleInput = (e) => {
    setIndividualInfo((prevInfo) => {
      return { ...prevInfo, [e.target.name]: e.target.value };
    });
  };

  const addIndividual = async (e, speciesId) => {
    e.preventDefault();
    try {
      const response = await fetchData(
        `/species/${speciesId}/individuals`,
        "POST",
        {},
        individualInfo
      );

      if (response) {
        const {
          data: { newIndividual },
        } = response;
        setIndividualsOfSpecies((prevIndividual) => [
          ...prevIndividual,
          newIndividual,
        ]);
      }
    } catch (error) {
      console.error("Error occured while creating event", error);
    }
    setIndividualInfo({
      nickname: "",
      scientist_email: "",
      scientist_name: "",
    });
  };

  console.log(individualInfo);

  return (
    <div>
      <form className="formContainer">
        <FormRow
          name="nickname"
          label="Nickname"
          type="text"
          value={individualInfo.nickname}
          onChange={(e) => handleInput(e)}
        />
        <FormRow
          name="scientist_name"
          label="Scientist Name"
          type="text"
          value={individualInfo.scientist_name}
          onChange={(e) => handleInput(e)}
        />
        <FormRow
          name="scientist_email"
          label="Scientist Email"
          type="text"
          value={individualInfo.scientist_email}
          onChange={(e) => handleInput(e)}
        />
        <button onClick={(e) => addIndividual(e, id)}>
          Add New Individual
        </button>
      </form>
    </div>
  );
};

export default IndividualsForm;
