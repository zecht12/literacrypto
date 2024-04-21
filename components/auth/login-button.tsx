"use client";

import { Dialog,DialogContent,DialogTrigger } from "../ui/dialog";
import { useRouter } from "next/navigation";
import { LoginForm } from "./login-form";

interface LoginButtonProps{
    children: React.ReactNode;
    mode?: "modal" | "redirect";
    asChild?: boolean;
}

export const LoginButton = ({children, mode="redirect", asChild}:LoginButtonProps) => {
    const router = useRouter();
    const onClick = ()=>{
        router.push("/auth/login")
    };
    if (mode === "modal") {
        return(
            <Dialog>
                <DialogTrigger asChild={asChild}>
                    {children}
                </DialogTrigger>
                <DialogContent>
                    <LoginForm/>
                </DialogContent>
            </Dialog>
        )
    }
    return(
        <span onClick={onClick} className="cursor-pointer">
            {children}
        </span>
    )
}