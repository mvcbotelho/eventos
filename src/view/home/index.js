import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import firebase from "../../config/firebase";

// import "./styles.css";

import NavBar from "../../components/navbar/";
import CardEvent from "../../components/cardEvent/";

function Home() {
  const [eventos, setEventos] = useState([]);
  let listaEventos = [];

  useEffect(() => {
    firebase
      .firestore()
      .collection("eventos")
      .get()
      .then(async res => {
        await res.docs.forEach(doc => {
          listaEventos.push({
            id: doc.id,
            ...doc.data()
          });
        });
        setEventos(listaEventos);
      })
      .catch();
  });
  return (
    <>
      <NavBar />
      {useSelector(state => state.userStatus) > 0 ? <h1>logado</h1> : null}
      <div className="row p-3">
        {eventos.map(item => (
          <CardEvent
            key={item.id}
            image={item.image}
            title={item.title}
            description={item.description}
            views={item.views}
          />
        ))}
      </div>
    </>
  );
}

export default Home;
