import React from 'react';

const Vote = () => {
    return (
        <div className="vote">
            <h3>votez pour des nouvelles fonctionnalités</h3>
            <div className="fonctionnalite">
                <span>gestion de la paye</span>
                <i className='far fa-heart'></i>
            </div>
            <div className="fonctionnalite">
                <span>gestion des reservations</span>
                <i className='far fa-heart'></i>
            </div>
            <div className="fonctionnalite">
                <span>gestion des clients</span>
                <i className='far fa-heart'></i>
            </div>
        </div>
    )
}

export default Vote;