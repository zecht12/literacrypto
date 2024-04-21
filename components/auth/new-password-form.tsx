"use client";

import { CardWrapper } from "./card-wrapper";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormLabel, FormItem, FormMessage } from "../ui/form";
import * as z from "zod";
import { NewPasswordSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FormError } from "../login-error";
import { FormSuccess } from "../login-success";
import { newPassword } from "@/actions/new-password";
import { useState, useTransition } from "react";
import { useSearchParams } from "next/navigation";

export const NewPasswordForm = () => {

    const searchParams = useSearchParams();
    const token = searchParams.get("token");
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof NewPasswordSchema>>({
        resolver: zodResolver(NewPasswordSchema),
        defaultValues: {
            password: "",
        }
    });
    const onSubmit = (values: z.infer<typeof NewPasswordSchema>) =>{
        setError("");
        setSuccess("");
        startTransition(()=>{
            newPassword(values, token).then((data)=>{
                setError(data?.error);
                setSuccess(data?.success)
            });
        })
    };

    return (
        <CardWrapper headerLabel="Enter your new password" backButtonLabel="Back to login" backButtonHref="/auth/login">
            <Form {...form}>
                <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField disabled={isPending} control={form.control} name="password" render={({ field })=>(
                        <FormItem>
                            <FormLabel>
                                Password
                            </FormLabel>
                            <FormControl>
                                <Input {...field} placeholder="******" type="password" />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}/>
                    <FormError message={error} />
                    <FormSuccess message={success} />
                    <Button disabled={isPending} type="submit" className="w-full">
                        Reset password
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    )
}
