import { Link } from "react-router-dom";
const IndividualsCard = ({ individual }) => {
  const {
    nickname,
    scientist_name,
    scientist_email,
    id,
    scientific_name,
    common_name,
  } = individual;
  return (
    <div className="individualContainer" key={id}>
      <Link to={`/individuals/${id}/sighting`}>
        <h3 className="mainTitle">{nickname}</h3>
        <p>Common Name: {common_name}</p>
        <p>Scientific Name: {scientific_name}</p>
        <p>Discovered By: {scientist_name}</p>
        <p>Email: {scientist_email}</p>
      </Link>
    </div>
  );
};

export default IndividualsCard;
