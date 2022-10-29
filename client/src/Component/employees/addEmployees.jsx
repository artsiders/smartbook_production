import React, { useState } from 'react';
import axios from 'axios';

const AddEmployees = ({ getEmployees }) => {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [sex, setSex] = useState(true);
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [post, setPost] = useState('');
    const [salaire, setSalaire] = useState('');
    let validate = true;

    const message = []

    const handleSubmit = (e) => {
        e.preventDefault();
        if (firstname === "") {
            document.getElementById("emp_firstname").style.border = `1px solid var(--orange)`
            message.push("entrer le nom svp !")
            validate = false
        } else {
            document.getElementById("emp_firstname").style.border = `1px solid var(--green)`
        }
        if (lastname === "") {
            document.getElementById("emp_lastname").style.border = `1px solid var(--orange)`
            message.push("entrer le premon")
            validate = false
        } else {
            document.getElementById("emp_lastname").style.border = `1px solid var(--green)`
        }
        if (email === "") {
            document.getElementById("emp_email").style.border = `1px solid var(--orange)`
            message.push("entrer l'email")
            validate = false
        } else {
            document.getElementById("emp_email").style.border = `1px solid var(--green)`
        }
        if (phone === "") {
            document.getElementById("emp_phone").style.border = `1px solid var(--orange)`
            message.push("entrer une date de naissance")
            validate = false
        } else {
            document.getElementById("emp_phone").style.border = `1px solid var(--green)`
        }
        if (address === "") {
            document.getElementById("emp_address").style.border = `1px solid var(--orange)`
            message.push("entrer le genre")
            validate = false
        } else {
            document.getElementById("emp_address").style.border = `1px solid var(--green)`
        }
        if (post === "") {
            document.getElementById("emp_post").style.border = `1px solid var(--orange)`
            message.push("entrer une date de naissance")
            validate = false
        } else {
            document.getElementById("emp_post").style.border = `1px solid var(--green)`
        }
        if (!salaire) {
            document.getElementById("salaire_base").style.border = `1px solid var(--orange)`
            message.push("entrer le genre")
            validate = false
        } else {
            document.getElementById("salaire_base").style.border = `1px solid var(--green)`
        }
        if (validate) {
            const formData = {
                emp_firstname: firstname,
                emp_lastname: lastname,
                emp_sex: sex ? "homme" : "femme",
                emp_phone: phone,
                emp_email: email,
                emp_address: address,
                emp_post: post,
                salaire_base: salaire,
                idhotel: "083029304820934203",
            }
            axios.post(`/api/employees/`, formData)
                .then(res => {
                    document.getElementById("close").click();
                    getEmployees()
                })
                .catch(error => console.warn(error))
        }

    }
    const handleChangeFirstname = (e) => {
        setFirstname(e.target.value);
    }
    const handleChangeLastname = (e) => {
        setLastname(e.target.value);
    }
    const handleChangeSex = (e) => {
        setSex(!sex);
    }
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
    return (
        <div>
            <form className="add_employees" id="form_add_employee">
                <span>informations générales</span>
                <div className="form_group">
                    <label htmlFor="emp_firstname">nom
                        <input
                            onChange={handleChangeFirstname}
                            value={firstname}
                            type="text"
                            name="emp_firstname"
                            id="emp_firstname"
                            placeholder="votre nom"
                        />
                    </label>
                    <label htmlFor="emp_lastname">prenom
                        <input
                            onChange={handleChangeLastname}
                            value={lastname}
                            type="text"
                            name="emp_lastname"
                            id="emp_lastname"
                            placeholder="votre prenom"
                        />
                    </label>
                </div>
                <div className="form_group">
                    <label htmlFor="emp_email">email
                        <input
                            onChange={handleChangeEmail}
                            value={email}
                            type="email"
                            name="emp_email"
                            id="emp_email"
                            placeholder="exemple@gmail.com"
                        />
                    </label>
                    <label htmlFor="emp_sex">sexe
                        <div className="label_sexe">
                            <input type="radio"
                                onChange={handleChangeSex} checked={sex}
                                value="m" name="emp_sex" id="male" hidden />
                            <label htmlFor="male">homme</label>
                            <input type="radio"
                                onChange={handleChangeSex} checked={!sex}
                                value="f" name="emp_sex" id="female" hidden />
                            <label htmlFor="female">femme</label>
                        </div>
                    </label>
                </div>
                <div className="form_group">
                    <label htmlFor="emp_phone">téléphone
                        <input onChange={handleChangePhone} value={phone} type="number" name="emp_phone" id="emp_phone" placeholder="+237 ### ## ## ##" />
                    </label>
                    <label htmlFor="emp_address">adresse
                        <input type="text" onChange={handleChangeAddress} value={address} name="emp_address" id="emp_address" placeholder="votre adresse" />
                    </label>
                </div>
                <hr />
                <span>informations supplémentaires</span>
                <div className="form_group">
                    <label htmlFor="emp_post">post actuel
                        <input onChange={handleChangePost} value={post} type="text" name="emp_post" id="emp_post" placeholder="numero de telephon" />
                    </label>
                    <label htmlFor="salaire_base">salaire de base
                        <input onChange={handleChangeSalaire} value={salaire} type="number" name="salaire_base" id="salaire_base" placeholder="votre adresse" />
                    </label>
                </div>
                <hr />
                <span className="message"><p>tous les champs sont requit !</p></span>
                <div className="form_button">
                    <button onClick={handleSubmit} className='ajouter' type="submit">ajouter</button>
                </div>
            </form>
        </div>
    );
};

export default AddEmployees;