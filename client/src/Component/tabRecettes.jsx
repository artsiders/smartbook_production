import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Champ from './recettes/champ';
import Total from './recettes/total';
import { getPeriode, submitAllInputs } from '../Fonction';
import { useSelector } from 'react-redux';

const TabRecettes = ({ departement }) => {
    const [departementState, setDepartementState] = useState(departement);

    const selected = useSelector(state => state.periode.value)
    let periode = getPeriode(selected)

    useEffect(() => {
        setDepartementState(departement);
    }, [departement])


    const [datas, setDatas] = useState([]);
    useEffect(() => {
        getChamp()
        // eslint-disable-next-line
    }, [departementState, selected]);

    useEffect(() => {
        submitAllInputs(".submit");
    }, [])

    const getChamp = () => {
        axios.get(`/api/recettes/mois/${selected + '-' + departementState}`)
            .then(data => {
                const result = data.data.filter(depart => depart.departement === departementState);
                setDatas(result);
            }).catch(err => console.log(err))
    }
    return (
        <div className="tab_recettes">
            <h3>etat de recette et credit</h3>
            <h4>{periode}</h4>
            {departement !== undefined ? <h4>departement : <span>{departement}</span></h4> : ""}

            <table className="table">
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
        </div>
    );
};

export default TabRecettes;