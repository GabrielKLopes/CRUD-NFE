import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Axios from "axios";
import produce from "immer";

export default function FormDialog(props) {
  const [editValues, setEditValues] = useState({
    id: props.id,
    razaoSocial: props.razaoSocial,
    nfe: props.nfe,
    valor: props.valor,
  });

  const handleChangeValues = (values) => {
    setEditValues((prevValues) => ({
      ...prevValues,
      [values.target.id]: values.target.value,
    }));
  };

  const handleClose = () => {
    props.setOpen(false);
  };

  const handleEditList = () => {
    Axios.put("http://localhost:3001/edit", {
      id: editValues.id,
      razaoSocial: editValues.razaoSocial,
      nfe: editValues.nfe,
      valor: editValues.valor,
    }).then(() => {
      props.setListCard(
        props.listCard.map((value) => {
          return value.id == editValues.id
            ? {
                id: editValues.id,
                razaoSocial: editValues.razaoSocial,
                nfe: editValues.nfe,
                valor: editValues.valor,
              }
            : value;
        })
      );
    });
    handleClose();
  };

  const handleDeleteList = () => {
    Axios.delete(`http://localhost:3001/delete/${editValues.id}`).then(() => {
      props.setListCard(
        props.listCard.filter((value) => {
          return value.id != editValues.id;
        })
      );
    });
    handleClose();
  };

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Editar</DialogTitle>
        <DialogContent>
          <TextField
            disabled
            margin="dense"
            id="id"
            label="id"
            defaultValue={props.id}
            type="text"
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="razaoSocial"
            label="Razão Social"
            defaultValue={props.razaoSocial}
            type="text"
            onChange={handleChangeValues}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="nfe"
            label="Nota Fiscal"
            defaultValue={props.nfe}
            type="text"
            onChange={handleChangeValues}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="valor"
            label="Valor"
            defaultValue={props.valor}
            type="text"
            onChange={handleChangeValues}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button color="primary" onClick={() => handleDeleteList()}>
            Excluir
          </Button>
          <Button color="primary" onClick={() => handleEditList()}>
            Salvar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
