import React from 'react';
import { somTable as som } from '../../Fonction';

const Total = ({ datas }) => {
    return (
        <tr className='total'>
            <td data-label="date">total</td>
            <td data-label="bar">{som(datas, 'bar')}</td>
            <td data-label="cuisine">{som(datas, 'restaurant')}</td>
            <td data-label="etage">{som(datas, 'hebergement')}</td>
            <td data-label="Transp/Crédit">{som(datas, 'tcb')}</td>
            <td data-label="Factures">{som(datas, 'facture')}</td>
            <td data-label="Maintenance">{som(datas, 'maintenence')}</td>
            <td data-label="Salaires">{som(datas, 'salaire')}</td>
            <td data-label="Autres">{som(datas, 'autres')}</td>
            <td data-label="action" className='action'>-</td>
        </tr>
    );
};

export default Total;