import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import "./styles.css";

function EventCard() {
  return (
    <div className="col-md-3 col-sm-12">
      <img
        src="https://via.placeholder.com/600"
        alt="banner de divulgação"
        className="card-img-top card-img"
      />
      <div className="card-body">
        <h5>Título do evento</h5>
        <p className="card-text text-justify">detalhes do evento</p>
        <div className="row base-card d-flex align-items-center">
          <div className="col-6">
            <Link to="" className="btn btn-sm btn-detail">
              + Detalhes
            </Link>
          </div>
          <div className="col-6 text-right">
            <i className="far fa-eye"></i>
            <span> 200</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventCard;
