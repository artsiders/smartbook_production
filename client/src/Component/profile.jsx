import axios from "axios";
import React, { useState } from "react";

const Profile = ({ data }) => {
    const [edit, setEdit] = useState(false)
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [login, setLogin] = useState("");
    const [role, setRole] = useState("");

    const handleChangeLogin = (e) => {
        setLogin(e.target.value);
    }
    const handleChangeFirstname = (e) => {
        setFirstname(e.target.value);
    }
    const handleChangeLastname = (e) => {
        setLastname(e.target.value);
    }
    const handleChangeRole = (e) => {
        setRole(e.target.value);
    }
    const handleChangeEmail = (e) => {
        setEmail(e.target.value);
    }
    const handleChangePhone = (e) => {
        setPhone(e.target.value);
    }

    const update = (e) => {
        e.preventDefault()
        const formDatas = {
            _id: data._id,
            user_login: login || data.user_login,
            firstname: firstname || data.firstname,
            lastname: lastname || data.lastname,
            role: role || data.role,
            user_email: email || data.user_email,
        }

        axios.put(
            `/api/users/${data._id}`,
            formDatas
        )
            .then(data => {
                // getEmployees()
                setEdit(false)
            }).catch(err => console.log(err))
    }
    const editDetails = () => {
        setEdit(true);
    }

    return (
        <>
            {!edit && (
                <>
                    <ul>
                        <li><em>login</em> {login || data.user_login || `------`}</li>
                        <li><em>nom</em> {firstname || data.firstname || `------`}</li>
                        <li><em>prenom</em> {lastname || data.lastname || `------`}</li>
                        <li>
                            <em>role</em>
                            <p>
                                {role || data.role || `------`}
                                {
                                    (role === 'super-admin' || data.role === 'super-admin') &&
                                    <i
                                        className="fas fa-crown"
                                        style={{ color: "var(--yellow)", fontSize: 14, marginLeft: 10 }}
                                    ></i>
                                }
                            </p>
                        </li>
                        <li><em>email</em> {email || data.user_email || `------`}</li>
                        <li><em>téléphone</em> {phone || data.user_phone || `------`}</li>
                        <button className="edit" onClick={editDetails}>
                            <i className='far fa-edit'></i>
                            <span className="tooltip">modifier le profil</span>
                        </button>
                    </ul>
                </>
            )}
            {edit && (
                <form action="" onSubmit={update} id="formUpdateEmp">
                    <ul>
                        <li>
                            <em>login</em>
                            <input
                                type="text"
                                defaultValue={login || data.user_login}
                                onChange={handleChangeLogin}
                            />
                        </li>
                        <li>
                            <em>nom</em>
                            <input
                                type="text"
                                defaultValue={firstname || data.firstname}
                                onChange={handleChangeFirstname}
                            />
                        </li>
                        <li>
                            <em>prenom</em>
                            <input
                                type="text"
                                defaultValue={lastname || data.lastname}
                                onChange={handleChangeLastname}
                            />
                        </li>
                        {/* <li><em>sexe</em> {data.user_sex || ""}</li> */}
                        {/* <li><em>date</em> {data.user_birthday || ""}</li> */}
                        <li>
                            <em>role</em>
                            <input
                                type="text"
                                defaultValue={role || data.role}
                                onChange={handleChangeRole}
                            />
                        </li>
                        <li>
                            <em>email</em>
                            <input
                                type="email"
                                defaultValue={email || data.user_email}
                                onChange={handleChangeEmail}
                            />
                        </li>
                        <li>
                            <em>téléphone</em>
                            <input
                                type="number"
                                defaultValue={phone || data.user_phone}
                                onChange={handleChangePhone}
                            />
                        </li>
                        <div className="action">
                            <button type="submit" style={{ background: "var(--green)" }}>
                                enregistre
                            </button>
                            <button
                                onClick={() => setEdit(false)}
                                style={{ background: "var(--red)" }}
                            >
                                annuler
                            </button>
                        </div>
                    </ul>
                </form>
            )}
        </>
    );
};

export default Profile;