import * as z from "zod";
import { UserRole } from "@prisma/client";

export const FavoriteSchema = z.object({
    email: z.optional(z.string().email()),
    image: z.optional(z.string().url()),
})

export const SettingsSchema = z.object({
    name: z.optional(z.string()),
    isTwoFactorEnabled: z.optional(z.boolean()),
    role: z.enum([UserRole.ADMIN, UserRole.USER]),
    email: z.optional(z.string().email()),
    password: z.optional(z.string().min(6)),
    newPassword: z.optional(z.string().min(6)),
    image: z.optional(z.string().url()),
})
    .refine((data) => {
        if (data.password && !data.newPassword) {
        return false;
        }

        return true;
    }, {
        message: "Password baru dibutuhkan!",
        path: ["newPassword"]
    })
    .refine((data) => {
        if (data.newPassword && !data.password) {
        return false;
        }

        return true;
    }, {
        message: "Password Dibutuhkan!",
        path: ["password"]
    })

export const NewPasswordSchema = z.object({
    password: z.string().min(6, {
        message: "Minimal 6 karakter",
    }),
});

export const ResetSchema = z.object({
    email: z.string().email({
        message: "Email dibutuhkan",
    }),
});

export const LoginSchema = z.object({
    email: z.string().email({
        message: "Email dibutuhkan",
    }),
    password: z.string().min(1, {
        message: "Password dibutuhkan",
    }),
    code: z.optional(z.string()),
});

export const RegisterSchema = z.object({
    email: z.string().email({
        message: "Email dibutuhkan",
    }),
    password: z.string().min(6, {
        message: "Minimal 6 karakter",
    }),
    name: z.string().min(1, {
        message: "Nama dibutuhkan",
    }),
});

