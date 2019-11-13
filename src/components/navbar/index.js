import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import "./styles.css";

function NavBar() {
  const dispatch = useDispatch();

  return (
    <nav className="navbar navbar-expand-lg">
      <i className="fas fa-calendar-check text-white fa-2x mx-2"></i>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <i className="fas fa-bars text-white"></i>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link" to="/">
              Home
            </Link>
          </li>
          {useSelector(state => state.userStatus) > 0 ? (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="newuser">
                  Meus Eventos
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="login">
                  Cadastrar Evento
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  onClick={() => dispatch({ type: "LOG_OUT" })}
                >
                  Sair
                </Link>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="newuser">
                  Cadastrar
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="login">
                  Login
                </Link>
              </li>
            </>
          )}
          {/* Usuário não logado */}

          {/* Usuário logado */}
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
