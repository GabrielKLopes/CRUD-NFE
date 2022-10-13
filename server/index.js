const express = require("express");
const app = express();
const mysql = require("mysql2");
const cors = require("cors");

const db = mysql.createPool({
    host:"localhost",
    user:"root",
    password:"1234",
    database:"crudnfe",
});

app.use(cors());
app.use(express.json());

app.post("/register", (req, res) => {
    const { razaoSocial } = req.body;
    const { nfe } = req.body;
    const { valor } = req.body;
  
    let sql = "INSERT INTO api ( razaoSocial, nfe, valor) VALUES (?, ?, ?)";
    db.query(sql, [razaoSocial, nfe, valor], (err, result) => {
      console.log(err);
    });
  });
  
app.get("/getCards", (req, res)=>{
    let SQL = "SELECT * FROM api";
    db.query(SQL, (err, result) =>{
        if(err) console.log(err);
        else res.send(result);  
    });
});

app.put("/edit", (req, res)=>{
    const {id} = req.body;
    const {razaoSocial} = req.body;
    const {nfe} = req.body;
    const {valor} = req.body;

    let SQL = "UPDATE api SET razaoSocial = ?, nfe = ?, valor = ? WHERE id = ?";
    db.query(SQL, [razaoSocial, nfe, valor, id], (err, result) =>{
        if(err) console.log(err);
        else res.send(result);
    });
});

app.delete("/delete/:id", (req, res) => {
    const { id } = req.params;
    let SQL = "DELETE FROM api WHERE id = ?";
    db.query(SQL, id, (err, result) => {
      if (err)console.log(err); 
      else res.send(result);  
    });
  });

app.listen(3001, () =>{
    console.log("rodando servidor")
});