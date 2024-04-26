"use client"

import React, { useEffect } from "react";
import Chart from "chart.js";

const CardBarChart = ({ data }) => {
    useEffect(() => {
        let chartInstance = null;

        const config = {
            type: "bar",
            data: data,
            options: {
                maintainAspectRatio: false,
                responsive: true,
                title: {
                    display: false,
                    text: "Transaction Amounts",
                },
                tooltips: {
                    mode: "index",
                    intersect: false,
                },
                hover: {
                    mode: "nearest",
                    intersect: true,
                },
                legend: {
                    labels: {
                        fontColor: "rgba(0,0,0,.4)",
                    },
                    align: "end",
                    position: "bottom",
                },
                scales: {
                    xAxes: [{
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: "Month",
                        },
                        gridLines: {
                            borderDash: [2],
                            borderDashOffset: [2],
                            color: "rgba(33, 37, 41, 0.3)",
                            zeroLineColor: "rgba(33, 37, 41, 0.3)",
                            zeroLineBorderDash: [2],
                            zeroLineBorderDashOffset: [2],
                        },
                    }],
                    yAxes: [{
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: "Transaction Amount",
                        },
                        gridLines: {
                            borderDash: [2],
                            drawBorder: false,
                            borderDashOffset: [2],
                            color: "rgba(33, 37, 41, 0.2)",
                            zeroLineColor: "rgba(33, 37, 41, 0.15)",
                            zeroLineBorderDash: [2],
                            zeroLineBorderDashOffset: [2],
                        },
                    }],
                },
            },
        };

        const ctx = document.getElementById("bar-chart");

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
        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
            <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
                <div className="flex flex-wrap items-center">
                    <div className="relative w-full max-w-full flex-grow flex-1">
                        <h6 className="uppercase text-blueGray-400 mb-1 text-xs font-semibold">
                            Performance
                        </h6>
                        <h2 className="text-blueGray-700 text-xl font-semibold">
                            Total Orders
                        </h2>
                    </div>
                </div>
            </div>
            <div className="p-4 flex-auto">
                <div className="relative h-350-px">
                    <canvas id="bar-chart"></canvas>
                </div>
            </div>
        </div>
    );
};

export default CardBarChart;
