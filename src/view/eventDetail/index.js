import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import firebase from "../../config/firebase";

import "./styles.css";

import NavBar from "../../components/navbar";

function EventDetail(props) {
  const [event, setEvent] = useState({});
  const [urlImg, setUrlImg] = useState({});
  const [loading, setLoading] = useState(1);
  const loggedUser = useSelector(state => state.userMail);

  useEffect(() => {
    if (loading) {
      firebase
        .firestore()
        .collection("eventos")
        .doc(props.match.params.id)
        .get()
        .then(result => {
          setEvent(result.data());

          firebase
            .firestore()
            .collection("eventos")
            .doc(props.match.params.id)
            .update("views", result.data().views + 1);

          firebase
            .storage()
            .ref(`images/${result.data().image}`)
            .getDownloadURL()
            .then(url => {
              setUrlImg(url);
              setLoading(0);
            });
        })
        .catch(error => console.log("ERROR", error));
    } else {
      firebase
        .storage()
        .ref(`images/${event.image}`)
        .getDownloadURL()
        .then(url => {
          setUrlImg(url);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <NavBar />
      <div className="container-fluid">
        {loading ? (
          <div className="row mt-5">
            <div
              className="spinner-border text-danger mt-3 mx-auto"
              role="status"
            >
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        ) : (
          <div>
            <div className="row">
              <img src={urlImg} alt="Banner" className="img-banner" />
              <div className="col-12 text-right mt-1 view-eye">
                <i className="far fa-eye"></i>
                <span> {event.views + 1}</span>
              </div>
              <h3 className="mx-auto mt-5 title">
                <strong>{event.title}</strong>
              </h3>
            </div>
            <div className="row mt-5 d-flex justify-content-around">
              <div className="col-md-3 col-sm-12 box-info p-3 my-2">
                <i className="fas fa-ticket-alt fa-2x"></i>
                <h5 className="mt-1">
                  <strong>Tipo</strong>
                </h5>
                <span className="mt-3">{event.eventType}</span>
              </div>

              <div className="col-md-3 col-sm-12 box-info p-3 my-2">
                <i className="fas fa-calendar-alt fa-2x"></i>
                <h5 className="mt-1">
                  <strong>Data</strong>
                </h5>
                <span className="mt-3">{event.date}</span>
              </div>

              <div className="col-md-3 col-sm-12 box-info p-3 my-2">
                <i className="fas fa-clock fa-2x"></i>
                <h5 className="mt-1">
                  <strong>Hora</strong>
                </h5>
                <span className="mt-3">{event.time}</span>
              </div>
            </div>
            <div className="row box-detail mt-5">
              <div className="col-12 text-center">
                <h5>
                  <strong>Detalhes do Evento</strong>
                </h5>
              </div>
              <div className="col-12 text-center">
                <p>{event.description}</p>
              </div>
            </div>
            {loggedUser === event.userMail ? (
              <Link to="" className="btn-edit">
                <i className="fas fa-pen-square fa-3x"></i>
              </Link>
            ) : null}
          </div>
        )}
      </div>
    </>
  );
}

export default EventDetail;
