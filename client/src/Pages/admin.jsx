import React, { useState } from 'react';
import Users from '../Component/admin/users';

const Admin = () => {
    const [option, setOption] = useState("users")
    return (
        <div className="admin">
            <div className="title_bar">
                interface d'administration
            </div>
            <div className="action">
                <button
                    className={option === "users" ? "active" : ""}
                    onClick={() => setOption("users")}
                >
                    <i className='fas fa-users'></i>
                    <span>gérer les utilisateurs</span>
                </button>
            </div>
            <div className="controls">
                {option === "users" && <Users />}
            </div>
        </div>
    );
};

export default Admin;