import React from 'react';

const Notifications = () => {
    return (
        <div className="notification">
            <div className="title_bar">
                les Notifications
            </div>
            <div className="messages">
                <Bulle />
                <Bulle />
                <Bulle />
                <Bulle />
                <button>
                    <i className='fas fa-check'></i>
                    <span className="tooltip">tout marquer comme lu</span>
                </button>
            </div>
        </div>
    );
};


const Bulle = () => {
    return (
        <div className="bulle">
            <img src="./images/profil1.jpg" alt="profil" />
            <div className="text">
                <h4>service clients</h4>
                <p>
                    votre requête a bien été prise en charge !
                    <br />
                    passez une exellente journée 🙂
                </p>
            </div>
        </div>
    )
}
export default Notifications;