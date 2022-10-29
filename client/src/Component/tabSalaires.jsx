import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Champ from './employees/champ';
import Total from './employees/total';

const TabSalaires = () => {
    const [datas, setDatas] = useState([]);

    useEffect(() => {
        getChamp()
    }, []);
    const getChamp = () => {
        axios.get(`/api/employees`)
            .then(data => {
                setDatas(data.data);
            }).catch(err => console.log(err))
    }

    return (
        <div className="tab_employees">
            <h3>ETATS DES SALAIRES</h3>
            {/* <button className='print' >
                rapport <i className="fas fa-align-center"></i>
                <span className="tooltip">imprimer le document</span>
            </button> */}
            <table className="table">
                <thead>
                    <tr>
                        <th>Noms et Prénoms</th>
                        <th>Salaire de base</th>
                        <th className='credit'>Acomptes</th>
                        <th>Sanction</th>
                        <th>Prime</th>
                        <th>Net A Percevoir</th>
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
        </div >
    );
};

export default TabSalaires;