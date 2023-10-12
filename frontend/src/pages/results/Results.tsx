import React from "react";
import "./results.scss";
import { useLocation } from "react-router-dom";

const Results: React.FC = () => {
    const location = useLocation();
    const state = location.state;

    console.log('state:', state);

    const aciertos = state ? state.aciertos : 0;
    const cantidadPersonajes = state ? state.cantidadPersonajes : 0;
    const partidaFinalizada = state ? state.partidaFinalizada : false;

    console.log('partidaFinalizada:', partidaFinalizada);
    
    return (
        <div className="container-results">
        {partidaFinalizada ? (
            aciertos < cantidadPersonajes ? (
            <>
                <h2>Hey, you did good!</h2>
                <p>Your Successes: {aciertos} / {cantidadPersonajes}</p>
                <p>Wanna try again?</p>
                <button>Go to Selection</button>
            </>
            ) : (
            <h2>Congrats! You know a lot about Marvel and his characters!</h2>
            )
        ) : (
            <h2>Game is still in progress...</h2>
        )}
        </div>
    );
};

export default Results;