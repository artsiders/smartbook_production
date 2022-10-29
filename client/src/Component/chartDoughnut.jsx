import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import 'chart.js/auto'


const ChartDoughnut = ({ bar, hebergement, restaurant, empty }) => {
    const data = {
        labels: [],
        datasets: [
            {
                label: 'recettes par departement',
                data: [bar, hebergement, restaurant, empty],
                backgroundColor: ['#ffc70070', '#1fca9370', '#57b8ff70', '#57b8ff70'],
                borderColor: ['#ffc700', '#1fca93', '#57b8ff', '#57b8ff'],
                offset: -10,
                hoverOffset: 0,
                borderRadius: 4,
                borderWidth: 2,
                spacing: 18,
                cutout: 75,
                radius: 95,
            },
        ],
    }

    const options = {
        responsive: true,
        maintainAspectRatio: false,
    }
    return (
        <div className='content_doughnut'>
            <h4>recettes par departement</h4>
            <div className="details">
                <ul>
                    <li>
                        <div className="color" style={{ background: '#f99600' }}></div>
                        <p>bar</p>
                    </li>
                    <li>
                        <div className="color" style={{ background: '#22a77d' }}></div>
                        <p>hebergement</p>
                    </li>
                    <li>
                        <div className="color" style={{ background: '#247BA0' }}></div>
                        <p>restaurant</p>
                    </li>
                </ul>
            </div>
            <div className="doughnut">
                <Doughnut data={data} options={options} />
            </div>
        </div>
    );
};

export default ChartDoughnut;