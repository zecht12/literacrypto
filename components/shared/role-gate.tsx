"use client"

import { useCurrentRole } from "@/hooks/use-current-role"
import { UserRole } from "@prisma/client"
import { notFound } from "next/navigation"

interface RoleGateProps{
    allowedRole: UserRole,
    children: React.ReactNode
}

const RoleGate = ({allowedRole, children}: RoleGateProps) => {
    const role = useCurrentRole();
    if (role !== allowedRole) {
        return(
            <>
                {notFound()}
            </>
        )
    }
    return (
        <>
            {children}
        </>
    );
}

export default RoleGate