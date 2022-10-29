import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Champ from './recettes/champ';
import Total from './recettes/total';
import { getPeriode, submitAllInputs } from '../Fonction';
import { useSelector } from 'react-redux';

const TabRecettesPrint = ({ departement, children }) => {
    const [datas, setDatas] = useState([]);
    const selected = useSelector(state => state.periode.value)
    const periode = getPeriode(selected)
    useEffect(() => {
        getChamp()
        // eslint-disable-next-line
    }, [selected])
    const getChamp = () => {
        axios.get(`/api/recettes/mois/${selected}`)
            .then(data => {
                const result = data.data.filter(depart => depart.departement === departement);
                setDatas(result);
            }).catch(err => console.log(err))
    }

    useEffect(() => {
        submitAllInputs(".submit");
    }, [])

    return (
        <div className="tab_recettes_print">
            {children[0]}
            <div className="title">
                <h3>etat de recette et credit</h3>
                {departement !== undefined ? <h4>departement : <span>{departement}</span></h4> : ""}
                <span>{periode}</span>
            </div>
            <table className="table" border='1'>
                <thead>
                    <tr>
                        <th className='date'>date <i className='far fa-calendar-alt'></i></th>
                        <th>versements</th>
                        <th className='credit'>credits</th>
                        <th>recouvrements</th>
                        <th>Observations</th>
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

export default TabRecettesPrint;