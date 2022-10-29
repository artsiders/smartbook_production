import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Result from '../Component/result';
import ChartLine from '../Component/chartLine';
import TitleBar from '../Component/titleBar';
import ChartLineFutur from '../Component/chartLineFutur';
import { paginate } from '../Fonction';
import { useSelector } from 'react-redux';
// import moment from 'moment';

const Analytics = () => {
    let turnoverData = [];
    let turnoverFuturData = [3000, 500, 1000, 300, 300, 3000, 1000];
    const [datasBar, setDatasBar] = useState([]);
    const [datasHebergement, setDatasHebergement] = useState([]);
    const [datasRestaurant, setDatasRestaurant] = useState([]);
    const [page, setPage] = useState(1)
    const [option, setOption] = useState("turnover")

    const selected = useSelector(state => state.periode.value)

    useEffect(() => {
        getDatas()
        // getDatasFutur()
        // eslint-disable-next-line
    }, [selected]);
    const getDatas = () => {
        axios.get(`/api/recettes/mois/${selected}`)
            .then(data => {
                setDatasBar(data.data.filter(depart => depart.departement === "bar"));
                setDatasHebergement(data.data.filter(depart => depart.departement === "hebergement"));
                setDatasRestaurant(data.data.filter(depart => depart.departement === "restaurant"));
            }).catch(err => console.log(err))
    }

    // dev ...
    // const getDatasFutur = () => {
    //     axios.get(`/api/recettes/mois/1`)
    //         .then(data => {
    //             let test = [
    //                 {
    //                     vercement: 0,
    //                     recouvrement: 0,
    //                     credit: 0,
    //                 }
    //             ];
    //             data.data.forEach((el, key) => {
    //                 // test[key] = (el.vercement + el.recouvrement) - el.credit;
    //                 test[key] = {
    //                     vercement: el.vercement,
    //                     recouvrement: el.recouvrement,
    //                     credit: el.credit,
    //                 };
    //             });
    //         }).catch(err => console.log(err))
    // }

    datasBar.forEach((el, key) => {
        turnoverData[key] = (el.vercement + el.recouvrement) - el.credit;
    });
    datasHebergement.forEach((el, key) => {
        turnoverData[key] += (el.vercement + el.recouvrement) - el.credit;
    });
    datasRestaurant.forEach((el, key) => {
        turnoverData[key] += (el.vercement + el.recouvrement) - el.credit;
    });
    turnoverData = paginate(turnoverData, 7, page);

    const handleNext = () => {
        if (page < 4) {
            setPage(page + 1)
        }
    }
    const handlePrev = () => {
        if (page > 1) {
            setPage(page - 1)
        }
    }

    const label = "données pour le mois en cour";
    return (
        <div className="analytics">
            <TitleBar title="les Statistiques" />
            <main>
                <nav className="nav_stat">
                    <div className="onglets">
                        <button
                            className={option === "turnover" ? "active" : ""}
                            onClick={() => setOption("turnover")}
                        >chiffre d'affaire</button>
                        <button
                            className={option === "turnoverFutur" ? "active" : ""}
                            onClick={() => setOption("turnoverFutur")}
                        >chiffre d'affaire previsionnel</button>
                    </div>

                    <div className="content">
                        {option === "turnover" &&
                            <ChartLine
                                line={false}
                                label={label}
                                data={turnoverData}
                                page={page}
                            />
                        }
                        {option === "turnoverFutur" &&
                            <ChartLineFutur
                                line={true}
                                label={label}
                                data={turnoverFuturData}
                                page={page}
                            />
                        }
                        <button
                            style={page === 1 ? { opacity: ".2" } : {}}
                            onClick={handlePrev}
                        >
                            <i className='fas fa-chevron-left'></i>
                        </button>
                        <span>{page} / 4</span>
                        <button
                            style={page === 4 ? { opacity: ".2" } : {}}
                            onClick={handleNext}
                        >
                            <i className='fas fa-chevron-right'></i>
                        </button>
                    </div>
                </nav>
                <Result />
            </main>
        </div>
    );
};

export default Analytics;