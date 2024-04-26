'use client'

import React, { useEffect } from "react";
import Chart from "chart.js";

const CardLineChart = ({ data }) => {
    useEffect(() => {
        let chartInstance = null;

        const config = {
            type: "line",
            data: data,
            options: {
                scales: {
                    xAxes: [{
                        gridLines: {
                            display: false
                        }
                    }],
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        },
                        gridLines: {
                            color: "rgba(255, 255, 255, 0.1)"
                        }
                    }]
                },
                legend: {
                    labels: {
                        fontColor: "white"
                    }
                },
                responsive: true,
                maintainAspectRatio: false
            }
        };

        const ctx = document.getElementById("line-chart");

        if (ctx) {
            chartInstance = new Chart(ctx, config);
        }

        return () => {
            if (chartInstance !== null) {
                chartInstance.destroy();
            }
        };
    }, [data]);

    return (
        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-blueGray-700">
            <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
                <div className="flex flex-wrap items-center">
                    <div className="relative w-full max-w-full flex-grow flex-1">
                        <h6 className="uppercase text-blueGray-100 mb-1 text-xs font-semibold">
                            Overview
                        </h6>
                        <h2 className="text-white text-xl font-semibold">Total Transactions</h2>
                    </div>
                </div>
            </div>
            <div className="p-4 flex-auto">
                <div className="relative h-96">
                    <canvas id="line-chart"></canvas>
                </div>
            </div>
        </div>
    );
};

export default CardLineChart;