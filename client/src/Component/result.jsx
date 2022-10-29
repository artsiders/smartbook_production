import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ContentResult from './result/contentResult';
import { somTable as som, getPeriode } from '../Fonction';
import { useSelector } from 'react-redux';

const Result = () => {
    const [datasBar, setDatasBar] = useState([]);
    const [datasHebergement, setDatasHebergement] = useState([]);
    const [datasRestaurant, setDatasRestaurant] = useState([]);
    const [depart, setDepart] = useState("bar")

    const selected = useSelector(state => state.periode.value)
    let periode = getPeriode(selected)

    useEffect(() => {
        getChamp()
        // eslint-disable-next-line
    }, [selected]);
    const getChamp = () => {
        axios.get(`/api/recettes/mois/${selected}`)
            .then(data => {
                setDatasBar(data.data.filter(depart => depart.departement === "bar"));
                setDatasHebergement(data.data.filter(depart => depart.departement === "hebergement"));
                setDatasRestaurant(data.data.filter(depart => depart.departement === "restaurant"));
            }).catch(err => console.log(err))
    }

    return (
        <div className='resultat'>
            <div className="onglets">
                <button
                    className={depart === "bar" ? "active" : ""}
                    onClick={() => setDepart("bar")}
                >bar</button>
                <button
                    className={depart === "hebergement" ? "active" : ""}
                    onClick={() => setDepart("hebergement")}
                >hebergement</button>
                <button
                    className={depart === "restaurant" ? "active" : ""}
                    onClick={() => setDepart("restaurant")}
                >restaurant</button>
            </div>
            {depart === "hebergement" &&
                <ContentResult
                    libele="rapport hebergement"
                    recette={som(datasBar, 'vercement')}
                    recouvrement={som(datasBar, 'recouvrement')}
                    credit={som(datasBar, 'credit')}
                    full={datasHebergement.length}
                    periode={periode}
                    icon={`${process.env.PUBLIC_URL}images/beer.svg`}
                />
            }
            {depart === "bar" &&
                <ContentResult
                    libele="rapport bar"
                    recette={som(datasHebergement, 'vercement')}
                    recouvrement={som(datasHebergement, 'recouvrement')}
                    credit={som(datasHebergement, 'credit')}
                    full={datasBar.length}
                    periode={periode}
                    icon={`${process.env.PUBLIC_URL}images/bedroom.svg`}
                />
            }
            {depart === "restaurant" &&
                <ContentResult
                    libele="rapport restaurant"
                    recette={som(datasRestaurant, 'vercement')}
                    recouvrement={som(datasRestaurant, 'recouvrement')}
                    credit={som(datasRestaurant, 'credit')}
                    full={datasRestaurant.length}
                    periode={periode}
                    icon={`${process.env.PUBLIC_URL}images/food.svg`}
                />
            }
        </div>
    );
};

export default Result;