import { useState } from "react";
import AllSpecies from "./components/Species/AllSpecies";
import IndividualSighting from "./components/Sightings/IndividualSighting";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import IndividualSpecies from "./components/Individuals/IndividualSpecies";

function App() {
  return (
    <BrowserRouter>
      <div className="title">
        <Link to="/">Animal Sighting Tracker</Link>
      </div>

      <Routes>
        <Route path="/" element={<AllSpecies />}></Route>
        <Route path="/:id" element={<IndividualSpecies />}></Route>
        {/* <Route path="/individuals" element={<AllIndividuals />}></Route> */}
        <Route
          path="/individuals/:id/sighting"
          element={<IndividualSighting />}
        ></Route>
        {/* <Route path="/sightings" element={<AllSightings />}></Route> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
