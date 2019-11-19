import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import firebase from "../../config/firebase";

import "./styles.css";

function EventCard({ key, image, title, description, views }) {
  const [urlImage, setUrlImage] = useState();

  useEffect(() => {
    firebase
      .storage()
      .ref(`images/${image}`)
      .getDownloadURL()
      .then(url => setUrlImage(url));
  });
  return (
    <div className="col-md-3 col-sm-12">
      <img
        src={urlImage}
        alt="banner de divulgação"
        className="card-img-top card-img"
      />
      <div className="card-body">
        <h5>{title}</h5>
        <p className="card-text text-justify">{description}</p>
        <div className="row base-card d-flex align-items-center">
          <div className="col-6">
            <Link to="" className="btn btn-sm btn-detail">
              + Detalhes
            </Link>
          </div>
          <div className="col-6 text-right">
            <i className="far fa-eye"></i>
            <span> {views}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventCard;
