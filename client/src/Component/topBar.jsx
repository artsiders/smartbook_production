import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { darkTheme, lightTheme } from '../Fonction'
import Profile from './profile';
import axios from 'axios';

const TopBar = () => {

    const [etat, setEtat] = useState(true);
    const [data, setData] = useState([]);
    const handleTheme = () => {
        if (localStorage.getItem("theme") === "light") {
            darkTheme()
            setEtat(true)
        } else {
            lightTheme()
            setEtat(false)
        }
    }
    useEffect(() => {
        getUsers(localStorage.getItem("userId"));
        if (localStorage.getItem("theme") === "light") {
            lightTheme()
            setEtat(false)
        }
        else if (localStorage.getItem("theme") === "dark") {
            darkTheme()
            setEtat(true)
        }
        else localStorage.setItem("theme", "light")
    }, [])
    const getUsers = (id) => {
        axios.get(`/api/users/${id}`)
            .then(res => {
                setData(res.data);
            }).catch(error => console.warn(error))
    }

    return (
        <div className="content_top_bar">
            <div className="top_bar">
                <span onClick={() => document.getElementById('linkAbout').click()}>
                    <img src={`${process.env.PUBLIC_URL}images/smartbook_logo.png`} alt="logo app" />

                    <NavLink hidden id='linkAbout' to="/settings"></NavLink>
                    smartbook
                    {
                        (data.role === 'super-admin') && <i style={{ color: "var(--yellow)", fontSize: 14 }} className="fas fa-crown"></i>
                    }
                </span>
                <div className="boxProfile hide">
                    <div className="profile">
                        <div className="header">
                            <i
                                className='fas fa-plus'
                                onClick={(e) => {
                                    document.querySelector(".boxProfile").classList.toggle("hide")
                                }}
                            ></i>
                            profile
                        </div>
                        <div className="image">
                            <img src={`${process.env.PUBLIC_URL}images/profil1.jpg`} alt="profil" />
                        </div>
                        <div className="details">
                            <Profile
                                data={data}
                            />
                        </div>
                    </div>
                </div>
                <div className="options">
                    <NavLink className='item' activeClassName='active' to='/notifications'>
                        <i className="far fa-bell"></i>
                        <span className="tooltip">notifications</span>
                    </NavLink>
                    <p className='item'>
                        <i className={!etat ? "fas fa-adjust" : "fas fa-sun"} onClick={handleTheme}></i>
                        <span className="tooltip">{!etat ? "sombre" : "claire"}</span>
                    </p>
                    <p
                        className='item'
                        onClick={(e) => {
                            document.querySelector(".user_menu").classList.toggle("hide")
                        }}
                    >
                        <i className="fas fa-user-circle"></i>
                        {/* <span className="tooltip">profil</span> */}
                    </p>
                    <ul
                        className='user_menu hide'
                        onClick={(e) => {
                            document.querySelector(".user_menu").classList.toggle("hide")
                        }}
                    >
                        <li
                            className="profil"
                            onClick={(e) => {
                                document.querySelector(".boxProfile").classList.toggle("hide")
                            }}
                        >
                            profil
                            <i className='fas fa-user'></i>
                        </li>
                        <li
                            className="logout"
                            onClick={(e) => {
                                localStorage.setItem("admin_hotel", "disconnected");
                                window.location.reload();
                            }}
                        >
                            déconnexion
                            <i className='fas fa-sign-out-alt'></i>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default TopBar;