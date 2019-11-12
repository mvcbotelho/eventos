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
          <img
            className="mb-4"
            src="/docs/4.3/assets/brand/bootstrap-solid.svg"
            alt=""
            width="72"
            height="72"
          />
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
          <a href="#" className="mx-2">
            Esqueci minha senha
          </a>
          <Link to="newuser" className="mx-2">
            Quero me cadastrar
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
