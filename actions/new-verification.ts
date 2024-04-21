"use server";
import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";
import { getVerificationTokenByToken } from "@/data/verification-token";

export const newVerification = async (token:string) =>{
    const existingToken = await getVerificationTokenByToken(token);
    if (!existingToken) {
        return {error:"Terjadi kesalahan  saat memproses permintaan verifikasi."};
    }
    const hasExpire = new Date(existingToken?.expire??"")< new Date();
    if (hasExpire) {
        return {error:"Token kadaluarsa. Silakan buat ulang tokennya."}
    }
    const existingUser = await getUserByEmail(existingToken.email??"");
    if (!existingUser) {
        return { error:"Pengguna tidak ditemukan!" };
    }
    await db.user.update({
        where: {
            id: existingUser.id,
        },
        data:{
            emailVerified: new Date(),
            email: existingToken.email
        }
    })

    await db.verificationToken.delete({
        where: {
            id: existingToken.id,
        },
    })
    return {success:"Email terverifikasi!"}
}