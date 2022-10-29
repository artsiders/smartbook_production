import axios from "axios";
import React, { useState } from "react";

const Details = ({ data, showDetails, getEmployees }) => {
    const [edit, setEdit] = useState(false)
    const [cni, setCni] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    // const [birthday, setBirthday] = useState('d');
    // const [sex, setSex] = useState(true);
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [post, setPost] = useState("");
    const [salaire, setSalaire] = useState("");

    const handleChangeCni = (e) => {
        setCni(e.target.value);
    }
    const handleChangeFirstname = (e) => {
        setFirstname(e.target.value);
    }
    const handleChangeLastname = (e) => {
        setLastname(e.target.value);
    }
    // const handleChangeBirthday = (e) => {
    //     setBirthday(e.target.value);
    // }
    // const handleChangeSex = (e) => {
    //     setSex(!sex);
    // }
    const handleChangePhone = (e) => {
        setPhone(e.target.value);
    }
    const handleChangeEmail = (e) => {
        setEmail(e.target.value);
    }
    const handleChangeAddress = (e) => {
        setAddress(e.target.value);
    }
    const handleChangePost = (e) => {
        setPost(e.target.value);
    }
    const handleChangeSalaire = (e) => {
        setSalaire(e.target.value);
    }

    const update = (e) => {
        e.preventDefault()
        const formDatas = {
            _id: data._id,
            cni: cni || data.cni,
            emp_firstname: firstname || data.emp_firstname,
            emp_lastname: lastname || data.emp_lastname,
            emp_phone: phone || data.emp_phone,
            emp_email: email || data.emp_email,
            emp_address: address || data.emp_address,
            emp_post: post || data.emp_post,
            salaire_base: salaire || data.salaire,
        }

        axios.put(
            `/api/employees/${data._id}`,
            formDatas
        )
            .then(data => {
                getEmployees()
                setEdit(false)
            }).catch(err => console.log(err))
    }
    const editDetails = () => {
        setEdit(true);
    }

    return (
        <div className="details">
            <button
                onClick={showDetails}
                className="back"
            >
                <i className='fas fa-angle-left'></i>
                <span className="tooltip">retour</span>
            </button>
            {!edit ? (
                <ul>
                    <li><em>cni</em> {cni || data.cni || `------`}</li>
                    <li><em>nom</em> {firstname || data.emp_firstname || `------`}</li>
                    <li><em>prenom</em> {lastname || data.emp_lastname || `------`}</li>
                    <li><em>sexe</em> {data.emp_sex || `------`}</li>
                    <li><em>date</em> {data.emp_birthday || `------`}</li>
                    <li><em>telephone</em> {phone || data.emp_phone || `------`}</li>
                    <li><em>email</em> {email || data.emp_email || `------`}</li>
                    <li><em>adresse</em> {address || data.emp_address || `------`}</li>
                    <li><em>post actuel</em> {post || data.emp_post || `------`}</li>
                    <li><em>salaire_base</em> {salaire || data.salaire_base || 0} FCFA</li>
                    <button className="edit" onClick={editDetails}>
                        <i className='far fa-edit'></i>
                        <span className="tooltip">modifier les infos de {data.emp_firstname || `------`}</span>
                    </button>
                </ul>
            ) : (
                <form action="" onSubmit={update} id="formUpdateEmp">
                    <ul>
                        <li>
                            <em>cni</em>
                            <input type="text"
                                defaultValue={cni || data.cni}
                                onChange={handleChangeCni}
                            />
                        </li>
                        <li>
                            <em>nom</em>
                            <input type="text"
                                defaultValue={firstname || data.emp_firstname}
                                onChange={handleChangeFirstname}
                            />
                        </li>
                        <li>
                            <em>prenom</em>
                            <input type="text"
                                defaultValue={lastname || data.emp_lastname}
                                onChange={handleChangeLastname}
                            />
                        </li>
                        {/* <li><em>sexe</em> {data.emp_sex || ""}</li> */}
                        {/* <li><em>date</em> {data.emp_birthday || ""}</li> */}
                        <li>
                            <em>telephone</em>
                            <input type="number"
                                defaultValue={phone || data.emp_phone}
                                onChange={handleChangePhone}
                            />
                        </li>
                        <li>
                            <em>email</em>
                            <input type="email"
                                defaultValue={email || data.emp_email}
                                onChange={handleChangeEmail}
                            />
                        </li>
                        <li>
                            <em>adresse</em>
                            <input type="text"
                                defaultValue={address || data.emp_address}
                                onChange={handleChangeAddress}
                            />
                        </li>
                        <li>
                            <em>post actuel</em>
                            <input type="text"
                                defaultValue={post || data.emp_post}
                                onChange={handleChangePost}
                            />
                        </li>
                        <li>
                            <em>salaire_base</em>
                            <input type="number"
                                defaultValue={salaire || data.salaire_base}
                                onChange={handleChangeSalaire}
                            />
                        </li>
                        <div className="action">
                            <button type="submit" style={{ background: "var(--green)" }}>
                                enregistre
                            </button>
                            <button onClick={() => setEdit(false)} style={{ background: "var(--red)" }}>
                                annuler
                            </button>
                        </div>
                    </ul>
                </form>
            )
            }
        </div>
    );
};

export default Details;