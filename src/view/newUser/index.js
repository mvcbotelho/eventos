import React, { useState } from "react";

import firebase from "../../config/firebase";
import "firebase/auth";

import "./styles.css";

import NavBar from "../../components/navbar/";

function NewUser() {
  const [email, setEmail] = useState();
  const [passwword, setPassword] = useState();
  const [msgType, setMsgType] = useState();
  const [msg, setMsg] = useState();
  const [loading, setLoading] = useState();

  function cadastrar() {
    console.log("cadastrar");
    setMsgType(null);
    setLoading(true);
    if (!email || !passwword) {
      setMsgType("erro");
      setMsg("Você deve informar e-mail e senha para cadastrar");
      return;
    }

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, passwword)
      .then(success => {
        setLoading(false);
        setMsgType("sucesso");
        setMsg("Usuário cadastrado com sucesso!!!");
      })
      .catch(erro => {
        setLoading(false);
        setMsgType("erro");
        console.log(erro);
        switch (erro.code) {
          case "auth/invalid-email":
            setMsg("E-mail inválido");
            break;
          case "auth/weak-password":
            setMsg("A senha deve ter pelo menos 6 caracteres");
            break;
          case "auth/email-already-in-use":
            setMsg("E-mail já cadastrado");
            break;
          default:
            setMsg(
              "Não foi possivel cadastrar o usuário. Tente mais tarde novamente."
            );
        }
      });
  }
  return (
    <>
      <NavBar />
      <div className="user-form">
        <form className="text-center form-login mx-auto mt-5">
          <h1 className="h3 mb-3 text-black font-weight-bold">Cadastro</h1>
          <input
            onChange={e => setEmail(e.target.value)}
            type="email"
            className="form-control my-2"
            placeholder="e-mail"
          />
          <input
            onChange={e => setPassword(e.target.value)}
            type="password"
            className="form-control my-2"
            placeholder="senha"
          />
          {loading ? (
            <div className="spinner-border text-danger mt-3" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          ) : (
            <button
              onClick={cadastrar}
              type="button"
              className="btn btn-lg btn-block mt-3 mb-5 btn-cadastro"
            >
              Cadastrar
            </button>
          )}

          <div className="msg-login text-center my-5">
            {msgType === "sucesso" && (
              <span>
                <strong>Wow!!!</strong> {msg}
              </span>
            )}
            {msgType === "erro" && (
              <span>
                <strong>Ops!!!</strong> {msg}
              </span>
            )}
          </div>
        </form>
      </div>
    </>
  );
}

export default NewUser;
