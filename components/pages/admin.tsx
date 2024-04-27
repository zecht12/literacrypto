import React from 'react';
import RoleGate from '../shared/role-gate';
import { Transaction, User, UserRole } from '@prisma/client';
import { db } from '../../lib/db';
import CardLineChart from '../shared/card-line-chart';
import CardBarChart from '../shared/card-bar-chart';
import CardBarChartChannel from '../shared/card-bar-chart-channel';

const AdminPage = async () => {
    const fetchedUsers = await db.user.findMany();
    const fetchedTransactions = await db.transaction.findMany();

    const computeTotalTransactionsByMonth = () => {
        const totalTransactionsByMonth = Array(12).fill(0);

        fetchedTransactions.forEach((transaction) => {
            const month = new Date(transaction.dateTime).getMonth();
            totalTransactionsByMonth[month] += transaction.amount;
        });

        return totalTransactionsByMonth;
    };

    const lineChartData = {
        labels: [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December"
        ],
        datasets: [
            {
                label: new Date().getFullYear(),
                backgroundColor: "#3182ce",
                borderColor: "#3182ce",
                data: computeTotalTransactionsByMonth(),
                fill: false,
            },
            {
                label: new Date().getFullYear() + 1,
                backgroundColor: "#edf2f7",
                borderColor: "#edf2f7",
                data: computeTotalTransactionsByMonth(),
                fill: false,
            }
        ]
    };

    const product1Amounts = fetchedTransactions.filter(transaction => transaction.amount === '350000').length;
    const product2Amounts = fetchedTransactions.filter(transaction => transaction.amount === '250000').length;

    const barChartData = {
        labels: ["Product 1", "Product 2"],
        datasets: [
            {
                label: "Transactions",
                backgroundColor: ["#4a5568", "#3182ce"],
                borderColor: ["#4a5568", "#3182ce"],
                data: [product1Amounts, product2Amounts],
                barThickness: 50,
            }
        ],
    };

    const computeTransactionStatusCount = () => {
        let pendingCount = 0;
        let successCount = 0;
        let failedCount = 0;
        fetchedTransactions.forEach((transaction) => {
            switch (transaction.status) {
                case 'Pending':
                    pendingCount++;
                    break;
                case 'Success':
                    successCount++;
                    break;
                case 'Failed':
                    failedCount++;
                    break;
                default:
                    break;
            }
        });

        return {
            Pending: pendingCount,
            Success: successCount,
            Failed: failedCount
        };
    };

    const barChartData2 = computeTransactionStatusCount();

    return (
        <div className="bg-black text-white min-h-screen w-full py-8 px-4">
            <RoleGate allowedRole={UserRole.ADMIN}>
                <h1 className="text-[#bc8914] text-3xl font-bold mb-8 text-center md:pt-8 sm:pt-6 pt-4 xl:pt-12">Welcome to Admin Panel</h1>
                <h2 className="text-[#bc8914] text-2xl font-bold pb-4 sm:pb-6 md:pb-8 xl:pb-12 text-center">Transaction Chart</h2>
                <div id='chart' className="w-full mx-auto flex flex-col md:flex-row md:justify-center md:items-center gap-8">
                    <div className="w-full md:w-2/3 mb-8 md:mb-0">
                        <CardLineChart data={lineChartData} />
                    </div>
                    <div className="w-full md:w-1/3">
                        <div className="w-full mb-8 md:mb-0">
                            <CardBarChart data={barChartData} />
                        </div>
                        <div className="w-full">
                            <CardBarChartChannel data={barChartData2} />
                        </div>
                    </div>
                </div>
                <div className="w-full">
                    <h2 id='user' className="text-[#bc8914] text-2xl font-bold pb-4 sm:pb-6 md:pb-8 xl:pb-12 text-center md:pt-8 sm:pt-6 pt-4 xl:pt-12">All Users</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full table-auto">
                            <thead>
                                <tr>
                                    <th className="text-[#bc8914] px-4 py-2">Name</th>
                                    <th className="text-[#bc8914] px-4 py-2">Email</th>
                                    <th className="text-[#bc8914] px-4 py-2">Role</th>
                                    <th className="text-[#bc8914] px-4 py-2">Two Factor</th>
                                </tr>
                            </thead>
                            <tbody>
                                {fetchedUsers.map((user: User) => (
                                    <tr key={user.id} className="odd:bg-gray-800 even:bg-gray-700">
                                        <td className="px-4 py-2">{user.name}</td>
                                        <td className="px-4 py-2">{user.email}</td>
                                        <td className="px-4 py-2">{user.role}</td>
                                        <td className="px-4 py-2">{user.isTwoFactorEnabled ? 'Enabled' : 'Disabled'}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="w-full">
                    <h2 id='transaction' className="text-[#bc8914] text-2xl font-bold pb-4 sm:pb-6 md:pb-8 xl:pb-12 text-center md:pt-8 sm:pt-6 pt-4 xl:pt-12">All Transactions</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full table-auto">
                            <thead>
                                <tr>
                                    <th className="text-[#bc8914] px-4 py-2">Order Id</th>
                                    <th className="text-[#bc8914] px-4 py-2">Customer Name</th>
                                    <th className="text-[#bc8914] px-4 py-2">Email</th>
                                    <th className="text-[#bc8914] px-4 py-2">Phone</th>
                                    <th className="text-[#bc8914] px-4 py-2">Product Name</th>
                                    <th className="text-[#bc8914] px-4 py-2">Amount</th>
                                    <th className="text-[#bc8914] px-4 py-2">Date Time</th>
                                    <th className="text-[#bc8914] px-4 py-2">Transaction Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {fetchedTransactions.map((transaction: Transaction) => (
                                    <tr key={transaction.id} className="odd:bg-gray-800 even:bg-gray-700">
                                        <td className="px-4 py-2">{transaction.id}</td>
                                        <td className="px-4 py-2">{transaction.customersName}</td>
                                        <td className="px-4 py-2">{transaction.email}</td>
                                        <td className="px-4 py-2">{transaction.phone}</td>
                                        <td className="px-4 py-2">{transaction.productName}</td>
                                        <td className="px-4 py-2">{transaction.amount}</td>
                                        <td className="px-4 py-2">{new Date(transaction.dateTime).toLocaleString()}</td>
                                        <td className={`px-4 py-2 ${transaction.status === 'Success' ? 'text-green-500' : transaction.status === 'Failed' ? 'text-red-500' : ''}`}>{transaction.status}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </RoleGate>
        </div>
    );
};

export default AdminPage;
