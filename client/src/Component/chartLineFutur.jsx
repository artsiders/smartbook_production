import React from 'react';
import { Line, Bar } from 'react-chartjs-2';
import 'chart.js/auto';


const ChartLineFutur = ({ label, data, line, page }) => {
    const labels = [];
    for (let i = (page * 7) - 6; i <= (page * 7); i++) labels.push(i)
    // for (let i = 1; i <= 31; i++) labels.push(i)

    const datas = {
        labels: labels,
        datasets: [{
            label: label,
            data: data,
            backgroundColor: [
                "#22a77d",
                "#22a77d"
            ],
            borderColor: [
                "#ffc700",
                "#ffc700",
            ],
            fillColor: "#000",
            borderWidth: 2,
            borderRadius: 6,
            tension: 0.3,
        }]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
    }
    return (
        <div className="Futur chartLine">
            {line ?
                <Line data={datas} options={options} />
                :
                <Bar data={datas} options={options} />
            }
        </div>
    );
};

export default ChartLineFutur;