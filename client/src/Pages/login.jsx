import React, { useState, useEffect } from 'react';
import { darkTheme, lightTheme } from '../Fonction'
import axios from 'axios';
import { paginate } from '../Fonction';

const Login = () => {
    const [pass, setPass] = useState("")
    const [help, setHelp] = useState(false)
    const [etat, setEtat] = useState(true)
    const [page, setPage] = useState(1)
    const [pageSide, setPageSide] = useState(1)
    const [pageCount, setPageCount] = useState(1)
    const limite = 5;

    const [users, setUsers] = useState([])

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
        getUsers()
        if (localStorage.getItem("theme") === "light") {
            lightTheme()
            setEtat(false)
        }
        else if (localStorage.getItem("theme") === "dark") {
            darkTheme()
            setEtat(true)
        }
        else localStorage.setItem("theme", "light")
        // eslint-disable-next-line
    }, [])
    const getUsers = () => {
        axios.get(`/api/users`)
            .then(data => {
                setUsers(data.data)
                setPageCount(Math.round(data.data.length / limite))
                users.length === 0 && createDefaultUser();
            })
            .catch(error => {
                console.warn(error)
            })
    }

    const createDefaultUser = () => {
        const data = {
            firstname: "admin",
            lastname: "admin",
            user_phone: "600000000",
            user_email: "example@gmail.com",
            user_login: "admin",
            user_pass: "admin",
            role: "super-admin"
        }
        axios.post(`/api/users/signup`, data)
            .then(() => getUsers())
            .catch(error => console.warn(error))
    }

    const handleHidePass = (e) => {
        const type = document.getElementById("password")
        if (type.getAttribute("type") === "password") {
            type.setAttribute("type", "text")
            e.target.classList.add("fa-eye")
            e.target.classList.remove("fa-eye-slash")
        } else {
            type.setAttribute("type", "password")
            e.target.classList.remove("fa-eye")
            e.target.classList.add("fa-eye-slash")
        }
    }
    const handlePass = (e) => {
        setPass(e.target.value)
    }
    let usersPagination = paginate(users, 1, page);
    let usersPaginationSide = paginate(users, limite, pageSide);

    const handleNext = () => {
        if (page < users.length) setPage(page + 1)
    }
    const handlePrev = () => {
        if (page > 1) setPage(page - 1)
    }
    const handleNextSide = () => {
        if (pageSide < pageCount) setPageSide(pageSide + 1)
    }
    const handlePrevSide = () => {
        if (pageSide > 1) setPageSide(pageSide - 1)
    }
    const handelSubmit = (e) => {
        e.preventDefault()
        const formData = {
            user_login: usersPagination[0].user_login,
            user_pass: pass,
        }
        axios.post(`/api/users/login`, formData)
            .then(data => {
                // console.log(data);
                if (data.status === 200) {
                    localStorage.setItem("admin_hotel", 'connected')
                    localStorage.setItem("userId", `${data.data.userId}`)
                    localStorage.setItem("token", `${data.data.token}`)
                    window.location.assign('/')
                } else {
                    if (data.data.message === "Mot de passe incorrect !") {
                        document.querySelector(".lable_pass p").innerHTML = data.data.message
                    } else {
                        document.querySelector(".lable_pass p").innerHTML = ""
                    }
                }
            })
            .catch(error => {
                console.warn(error)
            })
    }
    const hendleHelp = (e) => {
        e.preventDefault()
        setHelp(true)
    }
    return (
        <>
            <div className='login'>
                <form action="" onSubmit={handelSubmit}>
                    <ul className='list_users hide'>
                        <div
                            className="etiquette"
                            onClick={() => {
                                document.querySelector('.list_users').classList.toggle('hide')
                                document.querySelector('.etiquette i').classList.toggle('fa-angle-right')
                                document.querySelector('.etiquette i').classList.toggle('fa-angle-left')
                            }}
                        >
                            <i className='fas fa-angle-right'></i>
                        </div>
                        <div
                            style={pageSide === 1 ? { opacity: 0 } : {}}
                            className='btn_move'
                            onClick={handlePrevSide}
                        >
                            <i className='fas fa-angle-up'></i>
                        </div>
                        {usersPaginationSide.map((user, key) =>
                            <li
                                key={key + 1}
                                onClick={() => setPage(pageSide * limite - limite + key + 1)}
                                style={page === (pageSide * limite - limite + key + 1) ? { background: 'var(--background)', border: '2px solid var(--green)' } : {}}
                            >
                                <img
                                    src={`${process.env.PUBLIC_URL}images/profil1.jpg`}
                                    alt="profil"
                                />
                                <p>{user.user_login}</p>
                                <i style={user.role === 'super-admin' ? { color: 'var(--yellow)' } : { fontSize: 12 }} className='fas fa-crown'></i>
                            </li>
                        )}
                        <div
                            style={pageSide === pageCount ? { display: 'none' } : {}}
                            className='btn_move'
                            onClick={handleNextSide}
                        >
                            <i className='fas fa-angle-down'></i>
                        </div>
                    </ul>
                    <div className="circle"></div>
                    <div className="circle-2"></div>
                    <div className="circle-3"></div>
                    <div className="theme">
                        <i className={!etat ? "fas fa-adjust" : "fas fa-sun"} onClick={handleTheme}></i>
                        <span className="tooltip">{!etat ? "sombre" : "claire"}</span>
                    </div>
                    {help ? (
                        <>
                            <img src="./images/profil1.jpg" alt="login" />
                            <div className="help">
                                <h3>assistance</h3>
                                <textarea
                                    name="message"
                                    placeholder="décrivez votre poblème a l'equipe de developement"
                                />
                                <button type='button'>
                                    envoyer
                                    <i className='far fa-paper-plane'></i>
                                </button>
                                <button className='close' onClick={(e) => setHelp(false)}>
                                    <i className='fas fa-times'></i>
                                </button>
                            </div>
                        </>

                    ) : (
                        <>
                            <img src="./images/profil1.jpg" alt="login" />
                            <p>bienvenue <br />
                                <i
                                    className='fas fa-angle-left'
                                    onClick={handlePrev}
                                    style={page === 1 ? { opacity: ".5", cursor: "default", backgroundColor: "gray" } : {}}
                                >
                                </i>
                                {usersPagination.map((user, key) =>
                                    <BoxUsers user={user} key={key} />
                                )}
                                <i
                                    className='fas fa-angle-right'
                                    onClick={handleNext}
                                    style={page === users.length ? { opacity: ".5", cursor: "default", backgroundColor: "gray" } : {}}
                                >
                                </i>
                            </p>
                            <label className='lable_pass' htmlFor="password">
                                <input
                                    value={pass}
                                    onChange={handlePass}
                                    className='form_control'
                                    type="password"
                                    name='user_pass'
                                    id='password'
                                    placeholder='mot de pass'
                                    autoFocus
                                />
                                <i onClick={handleHidePass} className='far fa-eye-slash'></i>
                                <p></p>
                            </label>
                            <button className='btn' type='submit'>
                                se connecter
                            </button>
                            <a href="help" onClick={hendleHelp}>besoin d'aide ?</a>
                        </>
                    )
                    }
                </form>
            </div>
        </>
    );
};

const BoxUsers = ({ user }) => {
    return (
        <span>{user.user_login}</span>
    );
};



export default Login;