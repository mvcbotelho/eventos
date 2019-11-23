import React, { useState, useEffect } from "react";
import firebase from "../../config/firebase";
import { useSelector } from "react-redux";

// import "./styles.css";

import NavBar from "../../components/navbar/";
import CardEvent from "../../components/cardEvent/";

function Home({ match }) {
  const [eventos, setEventos] = useState([]);
  const [search, setSearch] = useState("");
  const userMail = useSelector(state => state.userMail);

  let listaEventos = [];

  useEffect(() => {
    if (match.params.params) {
      firebase
        .firestore()
        .collection("eventos")
        .where("userMail", "==", userMail)
        .get()
        .then(async res => {
          await res.docs.forEach(doc => {
            if (doc.data().title.indexOf(search) >= 0) {
              listaEventos.push({
                id: doc.id,
                ...doc.data()
              });
            }
          });
          setEventos(listaEventos);
        });
    } else {
      firebase
        .firestore()
        .collection("eventos")
        .get()
        .then(async res => {
          await res.docs.forEach(doc => {
            if (doc.data().title.indexOf(search) >= 0) {
              listaEventos.push({
                id: doc.id,
                ...doc.data()
              });
            }
          });
          setEventos(listaEventos);
        });
    } //Fim if
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]); //Fim useEffect

  return (
    <>
      <NavBar />
      <div className="row p-4">
        <h3 className="mx-auto p-4">Eventos Publicados</h3>
        <input
          onChange={e => {
            setSearch(e.target.value);
          }}
          type="text"
          className="form-control text-center"
          placeholder="Buscar Evento"
        />
      </div>
      <div className="row p-3">
        {eventos.map(evento => (
          <CardEvent
            key={evento.id}
            image={evento.image}
            title={evento.title}
            description={evento.description}
            views={evento.views}
          />
        ))}
      </div>
    </>
  );
}

export default Home;
