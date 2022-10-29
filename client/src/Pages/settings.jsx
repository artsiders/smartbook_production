import React, { useState, useEffect } from 'react';
import { darkTheme, lightTheme } from '../Fonction'

const Settings = () => {
    const [option, setOption] = useState("hotel")
    return (
        <div className="settings">
            <div className="title_bar">
                les parametres hotel
                <i className="fas fa-cog fa-spin"></i>
            </div>
            <div className="action">
                <button
                    className={option === "hotel" ? "active" : ""}
                    onClick={() => setOption("hotel")}
                >
                    <i className='fas fa-h-square'></i>
                    <span>modifier les parametres</span>
                </button>
                <button
                    className={option === "about" ? "active" : ""}
                    onClick={() => setOption("about")}
                >
                    <i className='fas fa-exclamation-circle'></i>
                    <span>à propos de nous</span>
                </button>
            </div>
            <div className="controls">
                {option === "hotel" && <Hotel />}
                {option === "about" && <About />}
            </div>
        </div>
    );
};

const About = () => {
    return (
        <div className='about'>
            <h4>à propos de smartbook</h4>
            <div className="image">
                <img
                    src={`${process.env.PUBLIC_URL}images/smartbook-logo-full.png`}
                    alt="smartbook-logo-full"
                />
            </div>
            <p>
                <strong>smartBook</strong> est une application intelligente de gestion de la comptabilité analytique.
                dispoblible en version desktop et mobile (Android, Apple)
            </p>
        </div>
    )
}
const Hotel = () => {
    const [border, setBorder] = useState(localStorage.getItem("theme"))
    const switchTheme = (e) => {
        const choise = e.target.dataset.theme;
        console.log(choise);
        if (choise === "light") {
            lightTheme()
            setBorder("light")
        }
        else if (choise === "dark") {
            darkTheme()
            setBorder("dark")
        }
    }
    useEffect(() => {
        if (localStorage.getItem("theme") === "light") {
            lightTheme()
            setBorder("light")
        }
        else if (localStorage.getItem("theme") === "dark") {
            darkTheme()
            setBorder("dark")
        }
    }, [border])
    return (
        <div className='hotel' >
            <h4 className='title_theme'>modifier le theme</h4>
            <div className="theme">
                <img
                    style={border === "dark" ? { borderColor: "var(--green)" } : { borderColor: "transparent" }}
                    onClick={(e) => switchTheme(e)}
                    data-theme='dark'
                    src={`${process.env.PUBLIC_URL}images/theme-dark.png`}
                    alt=""
                />
                <img
                    style={border === "light" ? { borderColor: "var(--green)" } : { borderColor: "transparent" }}
                    onClick={(e) => switchTheme(e)}
                    data-theme='light'
                    src={`${process.env.PUBLIC_URL}images/theme-light.png`}
                    alt=""
                />
            </div>
            <hr style={{ marginTop: 20 }} />
            {/* <div className="info">
                <ul>
                    <li>
                        <label htmlFor="">nom</label>
                        <input type="text" placeholder='edkadi' />
                    </li>
                    <li>
                        <label htmlFor="">informations supplementaires</label>
                        <textarea placeholder="entrer les informations sur votre structure !"></textarea>
                    </li>
                    <li>
                        <button type='submit'>enregister <i className='far fa-save'></i></button>
                    </li>
                </ul>
            </div> */}
        </div>
    )
}

export default Settings;