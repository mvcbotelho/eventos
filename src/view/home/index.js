import React from "react";
// import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

// import "./styles.css";

import NavBar from "../../components/navbar/";
import CardEvent from "../../components/cardEvent/";

function Home() {
  return (
    <>
      <NavBar />
      {useSelector(state => state.userStatus) > 0 ? <h1>logado</h1> : null}
      <CardEvent />
    </>
  );
}

export default Home;
