const List = ({ employees, showDetails, handleDelete, compact }) => {
    const load = (e) => {
        e.target.setAttribute("class", "fas fa-circle-notch fa-spin")
        setTimeout(() => {
            e.target.setAttribute("class", "far fa-envelope")
        }, 2000);
    }
    return (
        <div className="list">
            {employees.map((employee, key) =>
                <div key={key} className="item">
                    <div className="content" onClick={() => showDetails(employee._id)}>
                        <div className="image">
                            <img
                                src={`${process.env.PUBLIC_URL}images/${employee.emp_sex === "homme" ? 'profil1.jpg' : 'profil2.png'}`}
                                alt="profil"
                            />
                        </div>
                        <div className="text">
                            <p>
                                {employee.emp_firstname + ' ' + employee.emp_lastname}
                            </p>
                            <span>{employee.emp_post}</span>
                        </div>
                    </div>
                    {!compact && (
                        <p
                            className="salaire"
                            onClick={() => showDetails(employee._id)}
                        >
                            {`${employee.salaire_base}Fcfa`}
                        </p>
                    )}
                    <div className="action">
                        <a
                            onClick={(e) => load(e)}
                            href={`mailto:${employee.emp_email}`}
                        >
                            <i
                                className="far fa-envelope"
                                title={"contatez " + employee.emp_firstname}
                            ></i>
                        </a>
                        <i
                            onClick={handleDelete}
                            data-id={employee._id}
                            data-name={employee.emp_firstname}
                            className="fas fa-trash idelete"
                            title={"supprimer " + employee.emp_firstname}
                        ></i>
                    </div>
                </div>
            )}
        </div>
    );
};

export default List;