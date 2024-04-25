import React, { useEffect, useState } from 'react';
import RoleGate from '../shared/role-gate';
import { Transaction, User, UserRole } from '@prisma/client';
import { logout } from '../../actions/logout';
import { Button } from '../ui/button';
import { db } from '../../lib/db';

const AdminPage = () => {
    const [users, setUsers] = useState([]);
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const fetchedUsers = await db.user.findMany();
            const fetchedTransactions = await db.transaction.findMany();
            setUsers(fetchedUsers);
            setTransactions(fetchedTransactions);
        }
        fetchData();
    }, []);

    const handleLogout = () => {
        logout();
    };

    return (
        <div className="p-4">
            <RoleGate allowedRole={UserRole.ADMIN}>
                <div className="mb-8">
                    <h1 className="text-2xl font-bold mb-4 text-center text-white">Admin Panel</h1>
                    <div className="overflow-x-auto">
                        <h2 className="text-lg font-bold mb-2 text-white">All Users</h2>
                        <table className="w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Two Factor</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {users.map((user: User) => (
                                    <tr key={user.id}>
                                        <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{user.role}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{user.isTwoFactorEnabled ? 'Enabled' : 'Disabled'}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div>
                    <h2 className="text-lg font-bold mb-2 text-white">All Transactions</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order Id</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {transactions.map((transaction: Transaction) => (
                                    <tr key={transaction.Order_ID}>
                                        <td className="px-6 py-4 whitespace-nowrap">{transaction.Order_ID}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{transaction.Customer_e_mail}</td>
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
