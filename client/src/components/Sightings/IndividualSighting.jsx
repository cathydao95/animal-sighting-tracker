import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SightingsForm from "./SightingsForm";
import Loading from "../Loading";

const IndividualSighting = () => {
  const { id } = useParams();

  const [individualsSightings, setIndividualsSightings] = useState();

  const getIndividualsSighting = async (indiviualId) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/v1/sightings/${indiviualId}`
      );

      if (response.ok) {
        const {
          data: { sightings },
        } = await response.json();
        console.log(sightings);
        setIndividualsSightings(sightings);
      } else if (!response.ok) {
        throw new Error("Network response was not okay");
      }
    } catch (error) {
      console.error("Error occured while fetching data", error);
    }
  };
  useEffect(() => {
    getIndividualsSighting(id);
  }, [id]);

  console.log("here", individualsSightings, id);

  return !individualsSightings ? (
    <Loading />
  ) : (
    <div>
      <h1>
        {individualsSightings && individualsSightings[0].id
          ? `Sightings of ${individualsSightings[0].nickname}`
          : `No Sightings of ${individualsSightings[0].nickname}`}
      </h1>

      <SightingsForm setIndividualsSightings={setIndividualsSightings} />
      <div className="container">
        {individualsSightings[0].id &&
          individualsSightings.map((sighting) => {
            const {
              id,
              sighting_datetime,
              sighting_location,
              is_healthy,
              scientist_email,
              nickname,
              scientist_name,
            } = sighting;
            return (
              <div className="individualContainer" key={id}>
                <h3>Nickname: {nickname}</h3>

                <h3>Sighted: {sighting_datetime}</h3>
                <h3>Sighting Location: {sighting_location}</h3>
                <h3>Health Status: {is_healthy ? "Healthy" : "Unhealthy"}</h3>
                <h3>Sighted By: {scientist_name}</h3>
                <h3>Scientist Email: {scientist_email}</h3>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default IndividualSighting;
