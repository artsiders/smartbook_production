import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom/cjs/react-router-dom.min';
import App from '../App';
import TabDepensesPrint from './tabDepensesPrint';
import TabRecettesPrint from './tabRecettesPrint';
import Entete from './rapport/entete';
import PiedPage from './rapport/piedPage';
import { getPeriode, somTable } from '../Fonction';
import axios from 'axios';
import { Provider, useSelector } from 'react-redux';
import { store } from '../app/store';


const RapportPrint = () => {
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
    const periode = getPeriode(selected)
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
    const WindowPrint = () => {
        window.print();
        return false;
    }
    const back = () => {
        if (localStorage.getItem("themeIsModify") === "true") {
            localStorage.setItem("theme", "dark")
            localStorage.removeItem("themeIsModify")
        } else localStorage.removeItem("themeIsModify")
        ReactDOM.render(
            <React.StrictMode>
                <BrowserRouter>
                    <Provider store={store}>
                        <App />
                    </Provider>
                </BrowserRouter>
            </React.StrictMode>,
            document.getElementById('root')
        );

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
    return (
        <div className='rapport_print'>
            <div className="rapport_action">
                <button style={{ background: 'var(--green)' }} onClick={WindowPrint}>
                    <i className="fas fa-print"></i>
                    <span className="tooltip">imprimer le document</span>
                </button>
                <button style={{ background: 'var(--red)' }} onClick={back}>
                    <i className="fas fa-chevron-left"></i>
                    <span className="tooltip">revenir</span>
                </button>
            </div>
            <TabRecettesPrint departement="hebergement">
                <Entete />
                <PiedPage />
            </TabRecettesPrint>
            <TabRecettesPrint departement="bar">
                <Entete />
                <PiedPage />
            </TabRecettesPrint>
            <TabRecettesPrint departement="restaurant">
                <Entete />
                <PiedPage />
            </TabRecettesPrint>
            <TabDepensesPrint departement="bar">
                <Entete />
                <PiedPage />
            </TabDepensesPrint>
            {/* ______________________________________________________________ */}
            <div className="rapport_result">

                <div className='hebergement'>
                    <Entete />
                    <h3>rapport : hebergement.</h3>
                    <h4>Période : {periode}</h4>
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
                    <PiedPage />
                </div>

                <div className="bar">
                    <Entete />
                    <h3>RAPPORT : BAR.</h3>
                    <h4>Période : {periode}</h4>
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
                    <PiedPage />
                </div>
                <div className="cusine">
                    <Entete />
                    <h3>RAPPORT : CUISINE.</h3>
                    <h4>Période : {periode}</h4>
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
                    <PiedPage />
                </div>
                <div className="travail">
                    <Entete />
                    <h3>RAPPORT DE  TRAVAIL.</h3>
                    <h4>Période : {periode}</h4>
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
                    <PiedPage />
                </div>
            </div >
        </div >
    );
};

export default RapportPrint;