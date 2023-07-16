import React from "react";
import './LoadingScreen.scss'

const LoadingScreen = ({message}) => {
    return (
        <section className="loading-screen">
            <div class="bar">
                <div class="ball"></div>
            </div>
            <h1>{message}</h1>
        </section>
    )
}

export default LoadingScreen;