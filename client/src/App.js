import React, { useState, useEffect } from "react";
import Axios from "axios";
import "./App.css";
import Card from "./components/cards/card";

function App() {
  const [values, setValues] = useState();
  const [listApi, setListApi] = useState();

  const handleChangeValues = (value) => {
    setValues((prevValue) => ({
      ...prevValue,
      [value.target.name]: value.target.value,
    }));
  };

  const handleClickButton = () => {
    Axios.post("http://localhost:3001/register", {
      razaoSocial: values.razaoSocial,
      nfe: values.nfe,
      valor: values.valor,
    }).then((response) => {
      console.log(response);
    });
  };

  useEffect(() => {
    Axios.get("http://localhost:3001/getCards").then((response) => {
      setListApi(response.data);
    });
  }, []);

  return (
    <div className="App-container">
      <h1 className="title">CRUD NOTA FISCAL</h1>
      <div className="register-container">
        <input
          type="text"
          className="input-register"
          name="razaoSocial"
          placeholder="Razão Social"
          onChange={handleChangeValues}
        ></input>

        <input
        
          type="text"
          className="input-register"
          name="nfe"
          placeholder="NF-e"
          onChange={handleChangeValues}
        ></input>

        <input
          type="text"
          className="input-register"
          name="valor"
          placeholder="valor"
          onChange={handleChangeValues}
        ></input>
      </div>
      <div className="button-register">
      <button  onClick={() => handleClickButton()}>
          REGISTRAR NOTA
        </button>
      </div>
      
      {typeof listApi !== "undefined" &&
        listApi.map((value) => {
          return (
            <Card
              key={value.id}
              listCard={listApi}
              setListCard={setListApi}
              id={value.id}
              razaoSocial={value.razaoSocial}
              nfe={value.nfe}
              valor={value.valor}
            ></Card>
          );
        })};
    </div>
  );
}

export default App;
