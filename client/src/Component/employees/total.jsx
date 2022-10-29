import React from 'react';
import { somTable as som } from '../../Fonction';

const Total = ({ datas }) => {
    return (
        <tr className='total'>
            <td data-label="total">total</td>
            <td data-label="salaire">{som(datas, 'salaire_base')}</td>
            <td data-label="Acomptes">{som(datas, '')}</td>
            <td data-label="Sanction">{som(datas, '')}</td>
            <td data-label="Prime">{som(datas, '')}</td>
            <td data-label="Net">-</td>
            <td data-label="action" className='action'>-</td>
        </tr>
    );
};

export default Total;