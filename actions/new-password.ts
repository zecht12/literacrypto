"use server"

import { getPasswordResetTokenByToken } from "@/data/password-reset-token"
import { getUserByEmail } from "@/data/user"
import { NewPasswordSchema } from "@/schemas"
import * as z from "zod"
import bcrypt from "bcryptjs";
import { db } from "@/lib/db"

export const newPassword = async (values: z.infer<typeof NewPasswordSchema>, token?: string | null) =>{
    if (!token) {
        return {error:"Token tidak ditemukan"}
    }
    const validatedField = NewPasswordSchema.safeParse(values);
    if (!validatedField.success) {
        return{error:"Terjadi kesalahan"}
    }
    const {password} = validatedField.data;
    const existingToken = await getPasswordResetTokenByToken(token);
    if(!existingToken){
        return {error:"Token tidak tersedia"}
    }
    const hasExpire = new Date(existingToken.expire)< new Date();
    if (hasExpire) {
        return{error:"Token telah kedaluwarsa"}
    }
    const existingUser = await getUserByEmail(existingToken.email??"");
    if (!existingUser) {
        return { error:"Pengguna tidak ditemukan!" };
    }

    const hashedPassword = await bcrypt.hash(password,10);
    await db.user.update({
        where: {
            id: existingUser.id,
        },
        data:{
            password: hashedPassword,
        }
    })
    await db.passwordResetToken.delete({
        where:{id: existingToken.id}
    })

    return{success:"Password berhasil di update. Silahkan login menggunakan password baru Anda."};
}