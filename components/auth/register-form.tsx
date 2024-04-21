"use client";

import { CardWrapper } from "./card-wrapper";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormLabel, FormItem, FormMessage } from "../ui/form";
import * as z from "zod";
import { RegisterSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FormError } from "../login-error";
import { FormSuccess } from "../login-success";
import { register } from "@/actions/register";
import { useState, useTransition } from "react";

export const RegisterForm = () => {

    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            email: "",
            password: "",
            name:""
        }
    });
    const onSubmit = (values: z.infer<typeof RegisterSchema>) =>{
        setError("");
        setSuccess("");
        startTransition(()=>{
            register(values).then((data)=>{
                setError(data.error),
                setSuccess(data.success)
            });
        })
    };

    return (
        <CardWrapper headerLabel="Create an account" backButtonLabel="Already have an account?" backButtonHref="/auth/login">
            <Form {...form}>
                <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField disabled={isPending} control={form.control} name="name" render={({ field })=>(
                        <FormItem>
                            <FormLabel>
                                Nama
                            </FormLabel>
                            <FormControl>
                                <Input {...field} placeholder="Nama lengkap" />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}/>
                    <FormField disabled={isPending} control={form.control} name="email" render={({ field })=>(
                        <FormItem>
                            <FormLabel>
                                Email
                            </FormLabel>
                            <FormControl>
                                <Input {...field} placeholder="Email address" type="email" />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}/>
                    <FormField disabled={isPending}  control={form.control} name="password" render={({ field })=>(
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
                        Create an account
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    )
}
