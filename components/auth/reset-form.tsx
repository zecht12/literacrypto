"use client";

import { CardWrapper } from "./card-wrapper";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormLabel, FormItem, FormMessage } from "../ui/form";
import * as z from "zod";
import { ResetSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FormError } from "../login-error";
import { FormSuccess } from "../login-success";
import { reset } from "@/actions/reset";
import { useState, useTransition } from "react";

export const ResetForm = () => {

    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof ResetSchema>>({
        resolver: zodResolver(ResetSchema),
        defaultValues: {
            email: "",
        }
    });
    const onSubmit = (values: z.infer<typeof ResetSchema>) =>{
        setError("");
        setSuccess("");
        startTransition(()=>{
            reset(values).then((data)=>{
                setError(data?.error);
                setSuccess(data?.success)
            });
        })
    };

    return (
        <CardWrapper headerLabel="Reset your password" backButtonLabel="Back to login" backButtonHref="/auth/login">
            <Form {...form}>
                <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
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
                    <FormError message={error} />
                    <FormSuccess message={success} />
                    <Button disabled={isPending} type="submit" className="w-full">
                        Send reset email
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    )
}
