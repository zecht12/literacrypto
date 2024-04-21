"use client";

import React from 'react'
import RoleGate from '../shared/role-gate'
import { UserRole } from '@prisma/client'
import { logout } from '../../actions/logout'
import { Button } from '../ui/button'

const AdminPage= () => {
    const handleLogout = () => {
        logout();
    }
    return (
        <div>
            <RoleGate allowedRole={UserRole.ADMIN}>
                <div>
                    <h1>Admin Page</h1>
                </div>
            </RoleGate>
            <Button asChild variant="link" size="sm">
                <button type="submit" onClick={handleLogout}>
                    Sign Out
                </button>
            </Button>
        </div>
    )
}

export default AdminPage