import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Champ from './depenses/champ';
import Total from './depenses/total';
import { getPeriode, submitAllInputs } from '../Fonction';
import { useSelector } from 'react-redux';

const TabDepensesPrint = ({ children }) => {
    const [datas, setDatas] = useState([]);
    const selected = useSelector(state => state.periode.value)
    const periode = getPeriode(selected)

    useEffect(() => {
        getChamp()
        // eslint-disable-next-line
    }, [selected]);
    const getChamp = () => {
        axios.get(`/api/depenses/mois/${selected}`)
            .then(data => {
                setDatas(data.data);
            }).catch(err => console.log(err))
    }

    useEffect(() => {
        submitAllInputs(".submit");
    }, [])
    return (
        <div className="tab_depenses_print">
            {children[0]}
            <div className="title">
                <h3>ETATS DES DEPENSE</h3>
                <span>{periode}</span>
            </div>
            <table className="table" border='1'>
                <thead>
                    <tr>
                        <th className='date'>
                            date
                            <i className='far fa-calendar-alt'></i>
                        </th>
                        <th>bar</th>
                        <th>cuisine</th>
                        <th>etage</th>
                        <th>Transp Crédit Bureautiq</th>
                        <th>Factures</th>
                        <th>Maintenance</th>
                        <th>Salaires</th>
                        <th>Autres Dépenses</th>
                        <th className='tr_action'><i className='fas fa-cog'></i></th>
                    </tr>
                </thead>
                <tbody>
                    {datas.map((data, key) =>
                        <Champ data={data} key={key} getChamp={getChamp} />
                    )}
                    <Total datas={datas} />
                </tbody>
            </table>
            {children[1]}
        </div>
    );
};


export default TabDepensesPrint;