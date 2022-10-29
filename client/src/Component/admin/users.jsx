import axios from "axios";
import React, { useState, useEffect } from "react";
import ReactDOM from 'react-dom';
import Details from "./details";
import List from "./list";


const Users = () => {
    const [add, setAdd] = useState(false)
    const [users, setUsers] = useState([])
    const [show, setShow] = useState(false);
    const [data, setData] = useState([]);
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");

    const [deleleId, setDeleleId] = useState("");
    const [itemDelete, setItemDelete] = useState("");
    const [message, setMessage] = useState("");

    const handleChangeLogin = (e) => {
        setLogin(e.target.value);
    }
    const handleChangeFirstname = (e) => {
        setFirstname(e.target.value);
    }
    const handleChangeLastname = (e) => {
        setLastname(e.target.value);
    }
    const handleChangePass = (e) => {
        setPassword(e.target.value);
    }
    const handleChangeEmail = (e) => {
        setEmail(e.target.value);
    }
    const handleChangePhone = (e) => {
        setPhone(e.target.value);
    }
    const create = (e) => {
        e.preventDefault()
        const formDatas = {
            user_login: login,
            user_pass: password,
            user_phone: phone,
            firstname: firstname,
            lastname: lastname,
            user_email: email,
        }
        axios.post(
            `/api/users/signup`,
            formDatas
        )
            .then(data => {
                setAdd(false)
                getUsers()
            }).catch(err => console.log(err))
    }
    useEffect(() => {
        getUsers()
    }, [])
    const getUsers = () => {
        axios.get(`/api/users/`)
            .then(res => { setUsers(res.data) })
            .catch(error => {
                console.warn(error)
                try {
                    ReactDOM.render(
                        <div className="img500">
                            <img
                                className='i500'
                                src={`${process.env.PUBLIC_URL}images/500-internal-server-error-amico-2816.png`}
                                alt="500"
                            />
                        </div>,
                        document.querySelector(".list_employees .list")
                    );
                } catch (error) {
                    console.log(error);
                }
            })
    }

    const showDetails = (empID) => {
        if (!show) {
            setShow(true)
            const id = empID;
            axios.get(`/api/users/${id}`)
                .then(res => {
                    setData(res.data);
                }).catch(error => console.warn(error))

        } else setShow(false)
    }
    const handleDelete = (e) => {
        e.preventDefault();
        const confirm = e.target.dataset.key
        const popup = document.querySelector(".users .popup")
        if (confirm === "ok") {
            popup.style.display = "none"

            axios.delete(`/api/users/${deleleId}`)
                .then(res => {
                    itemDelete.style.background = "#ff000050"
                    setInterval(() => {
                        itemDelete.remove();
                    }, 800);
                    // console.log(res.data);
                }).catch(error => console.warn(error))
        }
        else if (confirm === "no") popup.style.display = "none";
        else {
            popup.style.display = "flex";
            setMessage(`voulez vous supprimer ${e.target.dataset.name} ?`)
            setDeleleId(e.target.dataset.id)
            setItemDelete(e.target.parentElement.parentElement)
        }

    }
    return (
        <div className="users">
            <div className="popup">
                <div className="message">{message}</div>
                <div className="popup_controls">
                    <button
                        data-key="ok"
                        onClick={handleDelete}
                        className='ok'
                    >ok</button>
                    <button
                        data-key="no"
                        onClick={handleDelete}
                        className='annuler'
                    >annuler</button>
                </div>
            </div>
            {add && (
                <form action="" className="" onSubmit={create} id="formAddUsers">
                    <ul className="list">
                        <li>
                            <em>login</em>
                            <input
                                onChange={handleChangeLogin}
                                value={login}
                                type="text"
                                name="login"
                                id="login"
                                placeholder="entrer le login"
                            />
                        </li>
                        <li>
                            <em>nom</em>
                            <input
                                onChange={handleChangeFirstname}
                                value={firstname}
                                type="text"
                                name="fistname"
                                id="nom"
                                placeholder="entrer le nom"
                            />
                        </li>
                        <li>
                            <em>prenom</em>
                            <input
                                onChange={handleChangeLastname}
                                value={lastname}
                                type="text"
                                name="lastname"
                                id="lastname"
                                placeholder="entrer le prenom"
                            />
                        </li>
                        <li>
                            <em>email</em>
                            <input
                                onChange={handleChangeEmail}
                                value={email}
                                type="email"
                                name="email"
                                id="email"
                                placeholder="entrer le email"
                            />
                        </li>
                        <li>
                            <em>téléphone</em>
                            <input
                                onChange={handleChangePhone}
                                value={phone}
                                type="number"
                                name="user_phone"
                                id="phone"
                                placeholder="numero de téléphone"
                            />
                        </li>
                        <li>
                            <em>mot de pass</em>
                            <input
                                onChange={handleChangePass}
                                value={password}
                                type="password"
                                name="password"
                                id="password"
                                placeholder="mot de pass"
                            />
                        </li>
                        <li className="btn_action">
                            <button type="submit" style={{ background: "var(--green)" }}>
                                enregistre
                            </button>
                            <button onClick={() => setAdd(false)} style={{ background: "var(--red)" }}>
                                annuler
                            </button>
                        </li>
                    </ul>
                </form>
            )}
            {!add && (
                <div action="" onSubmit={create} id="userList">
                    <ul>
                        {show ?
                            <Details
                                data={data}
                                showDetails={showDetails}
                                getUsers={getUsers}
                            /> :
                            <List
                                users={users}
                                showDetails={showDetails}
                                handleDelete={handleDelete}
                            />
                        }
                        <button
                            onClick={() => setAdd(true)}
                        >
                            <i className="fas fa-user-plus"></i>
                        </button>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Users;