import React, { useState } from "react";

import firebase from "../../config/firebase";
import "firebase/auth";

import "./styles.css";

import NavBar from "../../components/navbar/";

function RecoverPassword() {
  const [email, setEmail] = useState();
  const [msg, setMsg] = useState();

  function recover() {
    firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(res => {
        setMsg(
          "Enviamos um link para o seu e-mail. Conclua a redefinição de senha pelo link enviado."
        );
      })
      .catch(erro => {
        setMsg("Verifique se o e-mail está correto!");
      });
  }
  return (
    <>
      <NavBar />
      <form className="text-center form-login mx-auto mt-5">
        <h3 className="mb-3 font-weight-bold">Recuperar senha</h3>
        <input
          onChange={e => setEmail(e.target.value)}
          type="email"
          className="form-control my-2"
          placeholder="Digite seu e-mail"
        />
        <div className="msg my-4">
          <span className="text-center">{msg}</span>
        </div>
        <button
          type="button"
          className="btn btn-lg btn-block btn-enviar"
          onClick={recover}
        >
          Recuperar senha
        </button>
      </form>
    </>
  );
}

export default RecoverPassword;
