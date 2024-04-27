"use client"

import React, { useEffect, useState } from 'react';
import Chart from 'chart.js';

const CardBarChartChannel = ({ data }) => {
    useEffect(() => {
        let chartInstance = null;

        const config = {
            type: 'bar',
            data: {
                labels: Object.keys(data),
                datasets: [
                    {
                        label: 'Number of Transactions',
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                        ],
                        borderWidth: 1,
                        data: Object.values(data),
                    },
                ],
            },
            options: {
                maintainAspectRatio: false,
                responsive: true,
                title: {
                    display: true,
                    text: 'Transaction Status',
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true,
                        },
                    }],
                },
            },
        };

        const ctx = document.getElementById('bar-chart-channel');

        if (ctx) {
            chartInstance = new Chart(ctx, config);
        }

        // Cleanup function
        return () => {
            if (chartInstance !== null) {
                chartInstance.destroy();
            }
        };
    }, [data]);

    return (
        <>
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
                <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
                    <div className="flex flex-wrap items-center">
                        <div className="relative w-full max-w-full flex-grow flex-1">
                            <h6 className="uppercase text-blueGray-400 mb-1 text-xs font-semibold">Performance</h6>
                            <h2 className="text-blueGray-700 text-xl font-semibold">Transaction Status</h2>
                        </div>
                    </div>
                </div>
                <div className="p-4 flex-auto">
                    <div className="relative h-350-px">
                        <canvas id="bar-chart-channel"></canvas>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CardBarChartChannel;
