import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";

import firebase from "../../config/firebase";
import "firebase/auth";

import "./login.css";

import { useSelector, useDispatch } from "react-redux";

function Login() {
  const [email, setEmail] = useState();
  const [passwword, setPassword] = useState();
  const [msgType, setMsgType] = useState();

  const dispatch = useDispatch();

  function logar() {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, passwword)
      .then(success => {
        setMsgType("sucesso");
        dispatch({ type: "LOG_IN", userMail: email });
      })
      .catch(erro => setMsgType("erro"));
  }

  return (
    <div className="login-content d-flex align-items-center">
      {useSelector(state => state.userStatus) > 0 ? <Redirect to="/" /> : null}
      <form className="form-signin mx-auto">
        <div className="text-center mb-4">
          <i className="fas fa-calendar-check text-white fa-5x my-3"></i>
          <h1 className="h3 mb-3 font-weight-normal text-white font-weight-bold">
            Login
          </h1>
        </div>
        <input
          onChange={e => setEmail(e.target.value)}
          type="email"
          id="inputEmail"
          className="form-control my-2"
          placeholder="Email"
        />
        <input
          onChange={e => setPassword(e.target.value)}
          type="password"
          id="inputPassword"
          className="form-control my-2"
          placeholder="Senha"
        />

        <button
          className="btn btn-lg btn-login btn-block"
          type="button"
          onClick={logar}
        >
          Entrar
        </button>
        <div className="msg-login text-white text-center my-5">
          {msgType === "sucesso" && (
            <span>
              <strong>Wow!!!</strong> Você está logado!!!
            </span>
          )}
          {msgType === "erro" && (
            <span>
              <strong>Ops!!!</strong> Usuário ou senha incorretos!!!
            </span>
          )}
        </div>
        <div className="opcao-login mt-5">
          <Link to="recover-password" className="mx-2">
            Esqueci minha senha
          </Link>
          <Link to="newuser" className="mx-2">
            Quero me cadastrar
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
