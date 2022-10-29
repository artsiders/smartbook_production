import React from 'react';

const EnTete = () => {
    return (
        <header className='entete'>
            <img src={`${process.env.PUBLIC_URL}images/logo_structure.png`} alt="logo" className="logo" />
            <div className="text">
                <h1>edkadi hotel</h1>
                <p>
                    Hebergement - Restaurant – Snack Bar – Service Traiteur
                    <br />
                    <strong>Situé</strong>  derrière la Recette Municipal – Carrefour LE MAIRE,
                    À 150m de la route.
                </p>
            </div>
        </header>
    );
};

export default EnTete;