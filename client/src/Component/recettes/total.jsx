import React from 'react';
import { somTable as som, monaie } from '../../Fonction';

const Total = ({ datas }) => {
    return (
        <tr className='total'>
            <td data-label="date">total</td>
            <td data-label="vercement">{monaie.format(som(datas, 'vercement'))}</td>
            <td data-label="credit">{monaie.format(som(datas, 'credit'))}</td>
            <td data-label="recouvrement">{monaie.format(som(datas, 'recouvrement'))}</td>
            <td data-label="observation">-</td>
            <td data-label="action" className='action'>-</td>
        </tr>
    );
};

export default Total;