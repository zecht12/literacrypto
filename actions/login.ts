"use server";

import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import * as z from "zod";
import { LoginSchema } from "@/schemas";
import { signIn } from "@/auth";
import { AuthError } from 'next-auth';
import { generateVerificationToken, generateTwoFactorToken } from "@/lib/tokens";
import { getUserByEmail } from '@/data/user';
import { sendVerificationEmail, sendTwoFactorEmail } from '@/lib/mail';
import { getTwoFactorTokenByEmail } from '@/data/two-factor-token';
import { db } from '@/lib/db';
import { getTwoFactorConfirmationByUserId } from '@/data/two-factor-confirmation';

export const login = async (values : z.infer<typeof LoginSchema>, callbackUrl?:string | null) => {
    const validatedField = LoginSchema.safeParse(values);

    if (!validatedField.success) {
        return{error: "Terjadi kesalahan!"}
    };
    const {email, password, code} = validatedField.data;
    const exitingUser = await getUserByEmail(email);
    if (!exitingUser || !exitingUser.email || !exitingUser.password) {
        return {error: "Email tidak ada!"}
    }
    if (!exitingUser.emailVerified) {
        const verificationToken = await generateVerificationToken(exitingUser.email);
        await sendVerificationEmail(
            verificationToken.email??"",
            verificationToken.token??"",
        );
        return{success: "Konfirmasi email telah terkirim!"}
    }
    if (exitingUser.isTwoFactorEnabled && exitingUser.email) {
        if (code) {
            const twoFactorToken = await getTwoFactorTokenByEmail(exitingUser.email);
            if (!twoFactorToken) {
                return{error:"Code 2FA salah!"}
            }
            if (!twoFactorToken.token??"" !== code) {
                return{error:"Code 2FA salah!"}
            }
            const hasExpire = new Date(twoFactorToken.expire)< new Date();
            if (hasExpire) {
                return{error:"Code 2FA sudah kedaluwarsa!"}
            }
            await db.twoFactorToken.delete({
                where:{id:twoFactorToken.id}
            });
            const exsitingConfirmation = await getTwoFactorConfirmationByUserId(exitingUser.id);
            if (exsitingConfirmation) {
                await db.twoFactorConfirmation.delete({
                    where:{
                        id: exsitingConfirmation.id
                    }
                })
            }
            await db.twoFactorConfirmation.create({
                data:{
                    userId: exitingUser.id
                }
            })
        }else{
            const twoFactorToken = await generateTwoFactorToken(exitingUser.email);
            await sendTwoFactorEmail(
                twoFactorToken.email??"",
                twoFactorToken.token??"",
            )
            return{twoFactor:true};
        }
    }
    try {
        await signIn("credentials", { 
            email,
            password,
            redirectTo : callbackUrl || DEFAULT_LOGIN_REDIRECT 
        });
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case"CredentialsSignin":
                    return{
                        error:"Password atau email salah!!!"
                    }
                default:
                    return{
                        error:"Terjadi kesalahan!!!"
                    }
            }
        }
        throw error;
    }
};