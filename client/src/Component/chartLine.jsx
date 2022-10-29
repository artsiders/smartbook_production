import React from 'react';
import { Line, Bar } from 'react-chartjs-2';
import 'chart.js/auto';


const ChartLine = ({ label, data, line, page }) => {
    const labels = [];
    for (let i = (page * 7) - 6; i <= (page * 7); i++) labels.push(i)

    const datas = {
        labels: labels,
        datasets: [{
            label: label,
            data: data,
            backgroundColor: [
                "#247BA070",
                "#22a77d70"
            ],
            borderColor: [
                "#247BA0",
                "#22a77d",
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
        <div className="chartLine">
            {line ?
                <Line data={datas} options={options} />
                :
                <Bar data={datas} options={options} />
            }
        </div>
    );
};

export default ChartLine;