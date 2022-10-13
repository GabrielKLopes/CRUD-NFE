import React from "react";
import App from "../../App";
import "./card.css";
import FormDialog from "../dialog/dialog";

export default function Card(props){
    const [open, setOpen] = React.useState(false);
    const handleClickCard = () =>{
        setOpen(true);
    };

    return (
        <>
            <FormDialog
                open={open}
                setOpen={setOpen}
                razaoSocial={props.razaoSocial}
                nfe={props.nfe}
                valor={props.valor}
                listCard={props.listCard}
                setListCard={props.setListCard}
                id={props.id}
            />
            <div className="card-display">
            <div className="card--container" onClick={() => handleClickCard()}>
                <h1 className="card--title">{props.razaoSocial}</h1>
                <p className="card--nfe">{props.nfe}</p>
                <p className="card--valor">R$ {props.valor}</p>
            </div>
            </div>
           
        </>
    );
   
}