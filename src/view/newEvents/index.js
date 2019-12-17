import React, { useState } from "react";
import { useSelector } from "react-redux";

import firebase from "../../config/firebase";
import "firebase/auth";

import "./styles.css";

import NavBar from "../../components/navbar/";

function NewEvents() {
  const [loading, setLoading] = useState();
  const [msgType, setMsgType] = useState();
  const [title, setTitle] = useState();
  const [eventType, setEventType] = useState("");
  const [description, setDescription] = useState();
  const [date, setDate] = useState();
  const [time, setTime] = useState();
  const [image, setImage] = useState();
  const userMail = useSelector(state => state.userMail);

  const storage = firebase.storage();
  const db = firebase.firestore();

  function registerEvent() {
    setMsgType(null);
    setLoading(1);

    storage
      .ref(`/images/${image.name}`)
      .put(image)
      .then(() => {
        db.collection("eventos")
          .add({
            title: title,
            eventType: eventType,
            description: description,
            date: date,
            time: time,
            userMail: userMail,
            views: 0,
            image: image.name,
            public: 1,
            creation: new Date()
          })
          .then(() => {
            setMsgType("sucesso");
            setLoading(0);
          })
          .catch(erro => {
            setMsgType("erro");
            setLoading(0);
          });
      });
  }

  return (
    <>
      <NavBar />
      <div className="col-12 mt-5">
        <div className="row">
          <h3 className="mx-auto font-weight-bold">Novo evento</h3>
        </div>
        <form>
          <div className="form-group">
            <label>Título</label>
            <input
              onChange={e => setTitle(e.target.value)}
              type="text"
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Tipo do evento</label>
            <select
              onChange={e => setEventType(e.target.value)}
              className="form-control"
            >
              <option disabled selected defaultValue>
                Selecione um tipo
              </option>
              <option value="festa">Festa</option>
              <option value="teste">Teste</option>
              <option value="valor">Valor</option>
            </select>
          </div>
          <div className="form-group">
            <label>Descrição do evento</label>
            <textarea
              onChange={e => setDescription(e.target.value)}
              className="form-control"
              row="4"
            />
          </div>
          <div className="form-group row">
            <div className="col-6">
              <label>Data do evento</label>
              <input
                onChange={e => setDate(e.target.value)}
                type="date"
                className="form-control"
              />
            </div>
            <div className="col-6">
              <label>Hora do evento</label>
              <input
                onChange={e => setTime(e.target.value)}
                type="time"
                className="form-control"
              />
            </div>
          </div>
          <div className="form-group">
            <label>Imagem do evento</label>
            <input
              onChange={e => setImage(e.target.files[0])}
              type="file"
              className="form-control"
            />
          </div>
          <div className="row">
            {loading ? (
              <div
                className="spinner-border text-danger mt-3 mx-auto"
                role="status"
              >
                <span className="sr-only">Loading...</span>
              </div>
            ) : (
              <button
                type="button"
                onClick={registerEvent}
                className="btn btn-lg btn-block mt-3 mb-5 btn-cadastro"
              >
                Cadastrar Evento
              </button>
            )}
          </div>
        </form>

        <div className="msg-login text-center my-5">
          {msgType === "sucesso" && (
            <span>
              Evento cadastrado com <strong>sucesso!!!</strong>
            </span>
          )}
          {msgType === "erro" && (
            <span>
              <strong>Ops!!!</strong> Não foi possível cadastrar o evento.
            </span>
          )}
        </div>
      </div>
    </>
  );
}

export default NewEvents;
