import React, { useState, useEffect } from 'react';
import TabRecettes from '../Component/tabRecettes';
import axios from 'axios';
import TabDepenses from '../Component/tabDepenses';
import ReactDOM from 'react-dom';
import TitleBar from '../Component/titleBar';
import RapportPrint from '../Component/rapportPrint';
import { somTable } from '../Fonction';
import { Provider, useSelector } from 'react-redux';
import { store } from '../app/store';

const Rapport = () => {
    const [datasBar, setDatasBar] = useState([]);
    const [datasHebergement, setDatasHebergement] = useState([]);
    const [datasRestaurant, setDatasRestaurant] = useState([]);
    const [vercement, setVercement] = useState({
        bar: undefined,
        hebergement: undefined,
        restaurant: undefined,
    })
    const [recouvrement, setRecouvrement] = useState({
        bar: undefined,
        hebergement: undefined,
        restaurant: undefined,
    })

    const selected = useSelector(state => state.periode.value)

    useEffect(() => {
        getChamp()
        // eslint-disable-next-line
    }, []);

    const getChamp = () => {
        axios.get(`/api/recettes/mois/${selected}`)
            .then(data => {
                setDatasBar(data.data.filter(depart => depart.departement === "bar"));
                setDatasHebergement(data.data.filter(depart => depart.departement === "hebergement"));
                setDatasRestaurant(data.data.filter(depart => depart.departement === "restaurant"));
            }).catch(err => console.log(err))
    }

    useEffect(() => {
        setVercement({
            bar: somTable(datasBar, 'vercement'),
            hebergement: somTable(datasHebergement, 'vercement'),
            restaurant: somTable(datasRestaurant, 'vercement'),
        })
        setRecouvrement({
            bar: somTable(datasBar, 'recouvrement'),
            hebergement: somTable(datasHebergement, 'recouvrement'),
            restaurant: somTable(datasRestaurant, 'recouvrement'),
        })
    }, [datasBar, datasHebergement, datasRestaurant])

    const handlePrint = () => {
        ReactDOM.render(
            <Provider store={store}>
                <RapportPrint />,
            </Provider>,
            document.getElementById('root')
        );
    }

    return (
        <div className='rapport'>
            <TitleBar title="le rapport">
                <button className='print turn' onClick={handlePrint}>
                    <i className="fas fa-print"></i>
                    <span className="tooltip">passer en mode impression</span>
                </button>
            </TitleBar>
            <TabRecettes
                rapport={true}
                departement="bar"
            >
            </TabRecettes>
            <TabRecettes
                rapport={true}
                departement="hebergement"
            >
            </TabRecettes>
            <TabRecettes
                rapport={true}
                departement="restaurant"
            >
            </TabRecettes>
            <TabDepenses
                rapport={true}
                children={""}
            >
            </TabDepenses>
            <div className='hebergement'>
                <h3>rapport : hebergement.</h3>
                <h4>Période : Du 04 Janvier 2021 Au 15 Janvier 2021</h4>
                <ul>
                    <li>
                        <span>Recettes Réelles </span>
                        <strong> : {vercement.hebergement} FCFA</strong>
                    </li>
                    <li>
                        <span>Recouvrements </span>
                        <strong> : {recouvrement.hebergement} FCFA</strong>
                    </li>
                    <li>
                        <span>Total Recettes </span>
                        <strong> : {vercement.hebergement + recouvrement.hebergement} FCFA</strong>
                    </li>
                    <li>
                        <span>SOLDE :</span> <strong>198.875  FCFA</strong></li>
                </ul>
                <ul>
                    <h4>ETAT DES CREDITS</h4>

                    <div>
                        <li><span>COPEL (Ancien compte)</span><strong> : 0 FCFA</strong></li>
                        <li><span>Ancien D.R.T.O</span><strong> : 0  FCFA</strong></li>
                        <li><span>COPEL (Nouveau compte)</span><strong> : 0 FCFA</strong></li>
                        <li><span>Total</span> <strong>: 0 FCFA</strong></li>
                    </div>
                </ul>


            </div>

            <div className="bar">
                <h3>RAPPORT : BAR.</h3>
                <h4>Période : Du 04 Janvier 2021 Au 15 Janvier 2021</h4>
                <ul>
                    <li>
                        <span>Recettes Réelles </span>
                        <strong> : {vercement.bar} FCFA</strong>
                    </li>
                    <li>
                        <span>Recouvrements </span>
                        <strong> : {recouvrement.bar} FCFA</strong>
                    </li>
                    <li>
                        <span>Total Recettes </span>
                        <strong> : {vercement.bar + recouvrement.bar} FCFA</strong>
                    </li>
                    <li>
                        <span>Total Achats </span>
                        <strong> : 87.600  FCFA</strong>
                    </li>
                    <li>
                        <span>SOLDE </span>
                        <strong> : 50.300  FCFA</strong>
                    </li>
                </ul>
                <ul>
                    <h4>ETAT DES CREDITS</h4>
                    <div>
                        <li><span>Employés</span> <strong>: 0  FCFA</strong></li>
                        <li><span>Offre maison</span> <strong>: 0  FCFA</strong></li>
                        <li><span>M. TALLA</span>   <strong>: 0  FCFA</strong></li>
                        <li><span>AIM BTP</span><strong> : 0 FCFA</strong></li>
                        <li><span>Total</span> <strong>: 0  FCFA</strong></li>
                    </div>
                </ul>
            </div>
            <div className="cusine">
                <h3>RAPPORT : CUISINE.</h3>
                <h4>Période : Du 04 Janvier 2021 Au 15 Janvier 2021</h4>
                <ul>
                    <li>
                        <span>Recettes Réelles </span>
                        <strong> : {vercement.restaurant} FCFA</strong>
                    </li>
                    <li>
                        <span>Recouvrements </span>
                        <strong> : {recouvrement.restaurant} FCFA</strong>
                    </li>
                    <li>
                        <span>Total Recettes </span>
                        <strong> : {vercement.restaurant + recouvrement.restaurant} FCFA</strong>
                    </li>
                    <li>
                        <span>Total Achats </span>
                        <strong> : 24.375  FCFA</strong></li>
                    <li>SOLDE : 198.875  FCFA</li>
                </ul>
                <ul>
                    <h4>ETAT DES CREDITS</h4>
                    <div>
                        <li><span>Employés</span> <strong>: 0  FCFA</strong></li>
                        <li><span>Offre maison</span> <strong>: 0  FCFA</strong></li>
                        <li><span>M. TALLA</span>   <strong>: 0  FCFA</strong></li>
                        <li><span>AIM BTP</span><strong> : 0 FCFA</strong></li>
                        <li><span>Total</span> <strong>: 0  FCFA</strong></li>
                    </div>
                </ul>
            </div>
            <div className="travail">
                <h3>RAPPORT DE  TRAVAIL.</h3>
                <h4>Période : Du 04 Janvier 2021 Au 15 Janvier 2021</h4>
                <ul>
                    <li>
                        <span>Versement Hébergement </span>
                        <strong>: {vercement.hebergement + recouvrement.hebergement} FCFA</strong>
                    </li>
                    <li>
                        <span>Versement Bar </span>
                        <strong>: {vercement.bar + recouvrement.bar} FCFA</strong>
                    </li>
                    <li>
                        <span>Versement Cuisine </span>
                        <strong>: {vercement.restaurant + recouvrement.restaurant}  FCFA</strong>
                    </li>
                    <li>
                        <span>Total Recettes </span>
                        <strong> : {
                            vercement.hebergement + recouvrement.hebergement +
                            vercement.bar + recouvrement.bar +
                            vercement.restaurant + recouvrement.restaurant
                        } FCFA
                        </strong>
                    </li>
                    <li>Solde caisse Précédent : <strong>77.174  FCFA</strong></li>
                    <li>
                        <span>TOTAL </span>
                        <strong> : {
                            vercement.hebergement + recouvrement.hebergement +
                            vercement.bar + recouvrement.bar +
                            vercement.restaurant + recouvrement.restaurant + 77174
                        } FCFA
                        </strong>
                    </li>
                    <li><span>Ravitaillement Bar</span> <strong>: 87.600 FCFA</strong></li>
                    <li><span>Ravitaillement Cuisine</span> <strong>: 24.375 FCFA</strong></li>
                    <li><span>Ravitaillement Étages</span> <strong>: 24.000 FCFA</strong></li>
                    <li><span>Transp/Crédit/Bureautiq</span> <strong>: 13.950 FCFA</strong></li>
                    <li><span>Factures</span> <strong>: 152.684 FCFA</strong></li>
                    <li><span>Maintenances</span> <strong>: 19.000 FCFA</strong></li>
                    <li><span>Salaire</span> <strong>: 0 FCFA</strong></li>
                    <li><span>Autres Dépenses</span> <strong>: 441.000 FCFA</strong></li>
                    <li><span>Versement Banque</span> <strong>: 0 FCFA</strong></li>
                    <li>
                        Solde Caisse
                        <strong> : {
                            vercement.hebergement + recouvrement.hebergement +
                            vercement.bar + recouvrement.bar +
                            vercement.restaurant + recouvrement.restaurant + 77174
                        } FCFA
                        </strong>
                    </li>
                </ul>
            </div>
        </div >
    );
};

export default Rapport;