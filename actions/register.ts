"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";
import { db } from "../lib/db";
import { RegisterSchema } from '../schemas';
import { getUserByEmail } from "../data/user";
import { sendVerificationEmail } from "../lib/mail";
import { generateVerificationToken } from "../lib/tokens";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
    const validatedFields = RegisterSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Terjadi kesalahan!" };
    }

    const { email, password, name } = validatedFields.data;
    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await getUserByEmail(email);

    if (existingUser) {
        return { error: "Email Telah Terpakai!" };
    }

    await db.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
        },
    });

    const verificationToken = await generateVerificationToken(email);
    await sendVerificationEmail(
        verificationToken.email??"",
        verificationToken.token??"",
    );

    return { success: "Konfirmasi email telah terkirim!" };
};