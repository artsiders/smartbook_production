import React, { useState, useEffect } from 'react';
import DepartementCard from '../Component/departementCard';
import ChartDoughnut from '../Component/chartDoughnut';
import Employees from '../Component/employees';
import TitleBar from '../Component/titleBar';
import axios from 'axios';
import { useSelector } from 'react-redux';

const Home = () => {
    const [datasBar, setDatasBar] = useState([]);
    const [datasHebergement, setDatasHebergement] = useState([]);
    const [datasRestaurant, setDatasRestaurant] = useState([]);

    const selected = useSelector(state => state.periode.value)

    const [progress, setProgress] = useState({
        bar: undefined,
        hebergement: undefined,
        restaurant: undefined,
    })

    const som = (elements, champ) => {
        let result = 0;
        elements.forEach(element => {
            isNaN(parseInt(element[champ])) ? element[champ] = 0 :
                result += element[champ];
        });
        return result;
    }

    useEffect(() => {
        getChamp()
        // eslint-disable-next-line
    }, [selected]);
    const getChamp = () => {
        axios.get(`/api/recettes/depart/bar/${selected}`)
            .then(data => {
                setDatasBar(data.data);
            }).catch(err => console.log(err))
        axios.get(`/api/recettes/depart/hebergement/${selected}`)
            .then(data => {
                setDatasHebergement(data.data);
            }).catch(err => console.log(err))
        axios.get(`/api/recettes/depart/restaurant/${selected}`)
            .then(data => {
                setDatasRestaurant(data.data);
            }).catch(err => console.log(err))
    }

    const bar = som(datasBar, 'vercement') + som(datasBar, 'recouvrement');
    const hebergement = som(datasHebergement, 'vercement') + som(datasHebergement, 'recouvrement');
    const restaurant = som(datasRestaurant, 'vercement') + som(datasRestaurant, 'recouvrement');
    // const barRecouv = som(datasBar, 'recouvrement');
    // const hebergementRecouv = som(datasHebergement, 'recouvrement');
    // const restaurantRecouv = som(datasRestaurant, 'recouvrement');

    useEffect(() => {
        setProgress({
            bar: (100 * bar) / (bar + hebergement + restaurant),
            hebergement: (100 * hebergement) / (bar + hebergement + restaurant),
            restaurant: (100 * restaurant) / (bar + hebergement + restaurant) || 0,
        })
    }, [bar, hebergement, restaurant])


    return (
        <div className="home_page">
            <TitleBar
                title="vue d'ensemble"
            />
            <div className="content_departement">
                <DepartementCard
                    icon={`${process.env.PUBLIC_URL}images/beer.svg`}
                    departement="bar"
                    capitaux={bar}
                    credit={som(datasBar, 'credit')}
                    color="#ffc700"
                    progress={progress.bar}
                />
                <DepartementCard
                    icon={`${process.env.PUBLIC_URL}images/bedroom.svg`}
                    departement="hebergement"
                    capitaux={hebergement}
                    credit={som(datasHebergement, 'credit')}
                    color="#1fca93"
                    progress={progress.hebergement}
                />
                <DepartementCard
                    icon={`${process.env.PUBLIC_URL}images/food.svg`}
                    departement="restaurant"
                    capitaux={restaurant}
                    credit={som(datasRestaurant, 'credit')}
                    color="#57b8ff"
                    progress={progress.restaurant}
                />
            </div>
            <main>
                <ChartDoughnut
                    bar={bar}
                    hebergement={hebergement}
                    restaurant={restaurant}
                    empty={0}
                />
                <Employees compact={true} />
                {/* <Login /> */}
            </main>
        </div>
    );
};

export default Home;