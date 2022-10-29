import React, { useEffect, useState, createContext } from 'react';
import axios from 'axios';
import AddEmployees from './employees/addEmployees';
import ReactDOM from 'react-dom';
import List from './employees/list';
import Details from './employees/details';
import { NavLink } from 'react-router-dom';



const Employees = ({ compact }) => {
    const closeBtn = {
        background: "var(--red)",
        position: "absolute",
        top: "10px",
        right: "10px",
        width: "45px"
    }

    const [employees, setEmployees] = useState([]);
    const [toggle, setToggle] = useState(false);
    const [show, setShow] = useState(false);
    const [data, setData] = useState([]);
    const [load, setLoad] = useState(true);

    const [deleleId, setDeleleId] = useState("");
    const [itemDelete, setItemDelete] = useState("");
    const [message, setMessage] = useState("");
    // equivalent du compenentDidMount
    createContext(true)
    useEffect(() => {
        if (load) {
            ReactDOM.render(
                <div className="load">
                    <img className='iload' src={`${process.env.PUBLIC_URL}/images/loader.gif`} alt="loading..." />
                </div>,
                document.querySelector(".list_employees .list")
            );
        } else {
            ReactDOM.render(<React.Fragment />, document.querySelector(".list_employees .list"));
        }
    }, [load])

    useEffect(() => {
        getEmployees()
    }, [])
    const getEmployees = () => {
        axios.get(`/api/employees/`)
            .then(res => { setEmployees(res.data); setLoad(false) })
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

    const handleDelete = (e) => {
        e.preventDefault();
        const confirm = e.target.dataset.key
        const popup = document.querySelector(".list_employees .popup")
        if (confirm === "ok") {
            popup.style.display = "none"

            axios.delete(`/api/employees/${deleleId}`)
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

    const toggleForm = () => toggle ? setToggle(false) : setToggle(true)

    const showDetails = (empID) => {
        if (!show) {
            setShow(true)
            const id = empID;
            axios.get(`/api/employees/${id}`)
                .then(res => {
                    setData(res.data);
                }).catch(error => console.warn(error))

        } else setShow(false)
    }
    return (
        <div className="list_employees">
            <div className="popup">
                <div className="message">{message}</div>
                <div className="controls">
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
            {!toggle ?
                <>
                    <h3>liste des employés</h3>
                    {show ?
                        <Details
                            data={data}
                            showDetails={showDetails}
                            getEmployees={getEmployees}
                        /> :
                        <List
                            employees={employees}
                            showDetails={showDetails}
                            handleDelete={handleDelete}
                            compact={compact}
                        />
                    }
                </> : <AddEmployees getEmployees={getEmployees} />}
            {!toggle ?
                <div className='content_btn'>
                    <button
                        onClick={!compact ? toggleForm : () => document.getElementById("navToEmployees").click()}
                    >
                        <NavLink hidden id='navToEmployees' to="/employees">test</NavLink>

                        <i className={compact ? "fas fa-users-cog" : "fas fa-user-plus"}></i>
                        <span className="tooltip">
                            {compact ? "gérer les employés" : "ajouter un employé"}
                        </span>
                    </button>
                </div>
                :
                <div className='content_btn' style={{ border: "none", background: "transparent" }}>
                    <button
                        id='close'
                        style={closeBtn}
                        onClick={toggleForm}
                    >
                        <i className="fas fa-times"></i>
                    </button>
                </div>
            }
        </div>
    );
};

export default Employees;