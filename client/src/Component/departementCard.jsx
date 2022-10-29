import React from 'react';
import { NavLink } from 'react-router-dom';
import { monaie } from '../Fonction';


const DepartementCard = ({ departement, capitaux, icon, color, progress, credit }) => {
    progress = progress || 0
    const style = {
        background: color + "70",
        width: progress > 97 ? progress - 6 + "%" : progress + "%",
        border: `2px solid ${color}`
    }
    return (
        <div className="departement_card" title={`afficher les details ${departement}`}>
            <NavLink exact to={`/recettes`}>
                <div className="icon">
                    <img src={icon} alt='icon' />
                </div>
                <div className="info">
                    <h3>{departement}</h3>
                    <span>{monaie.format(capitaux)}</span>
                    <p>{monaie.format(credit)}</p>
                    <div className="progress" style={style}>
                        <i>
                            {progress.toFixed(1) || 0}%
                        </i>
                    </div>
                </div>
            </NavLink>
        </div>
    );
};

export default DepartementCard;