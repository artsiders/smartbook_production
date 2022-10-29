import React, { useState, useEffect } from 'react';

const ContentResult = ({ libele, recette, recouvrement, credit, full, periode, icon }) => {
    const [progress, setProgress] = useState({
        bar: undefined,
        hebergement: undefined,
        restaurant: undefined,
    })
    useEffect(() => {
        setProgress({
            recette: (100 * recette) / (recette + recouvrement + credit),
            recouvrement: (100 * recouvrement) / (recette + recouvrement + credit),
            credit: (100 * credit) / (recette + recouvrement + credit) || 5,
        })
    }, [recette, recouvrement, credit])
    const monaie = new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: 'XAF',
        maximumFractionDigits: 2,
    })
    return (
        <div className='content_result'>
            <h4>{libele}</h4>
            <div className="total">
                <div className="icon">
                    <img src={icon} alt='icon' />
                </div>
                <div>
                    <h3>Total Recettes</h3>
                    <strong>{monaie.format(recette + recouvrement)}</strong>
                </div>
                <p>{full > 30 ? `résultat ${periode}` : `résultat prévisoire ${periode}`}</p>
            </div>
            <div className="chiffre">
                <strong>{monaie.format(recette)}</strong>
                <p>Recettes Réelles</p>
                <div className="progress" style={{ width: progress.recette + "%" }}></div>
            </div>
            <div className="depense">
                <strong>{monaie.format(recouvrement)}</strong>
                <p>Recouvrements</p>
                <div className="progress" style={{ width: progress.recouvrement + "%" }}></div>
            </div>
            <div className="credit">
                <strong>{monaie.format(credit)}</strong>
                <p>credit</p>
                <div className="progress" style={{ width: progress.credit + "%" }}></div>
            </div>
        </div>
    )
}

export default ContentResult;