"use client";

import { CardWrapper } from "./card-wrapper";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormLabel, FormItem, FormMessage } from "../ui/form";
import { useSearchParams } from "next/navigation";
import * as z from "zod";
import { LoginSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FormError } from "../login-error";
import { FormSuccess } from "../login-success";
import { login } from "@/actions/login";
import { useState, useTransition } from "react";
import Link from "next/link";

export const LoginForm = () => {
    const SearchParams = useSearchParams();
    const callbackUrl = SearchParams.get("callbackUrl");
    const UrlError = SearchParams.get("error") === "OAuthAccountNotLinked" ? "Email sudah dipakai" : "";

    const [showTwoFactor, setShowTwoFactor] = useState(false);
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: "",
        }
    });
    const onSubmit = (values: z.infer<typeof LoginSchema>) =>{
        setError("");
        setSuccess("");
        startTransition(()=>{
            login(values, callbackUrl).then((data)=>{
                if (data?.error) {
                    form.reset();
                    setError(data.error);
                }
                if (data?.success) {
                    form.reset();
                    setError(data.success);
                }
                if (data?.twoFactor) {
                    setShowTwoFactor(true);
                }
            }).catch(()=>setError("Terjadi kesalahan!"))
        })
    };

    return (
        <CardWrapper headerLabel="Welcome back!" backButtonLabel="Don't have an account?" backButtonHref="/auth/register">
            <Form {...form}>
                <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
                    {showTwoFactor &&(
                        <FormField disabled={isPending} control={form.control} name="code" render={({ field })=>(
                            <FormItem>
                                <FormLabel>
                                    Two factor code
                                </FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder="123456"/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}/>
                    )}
                    {!showTwoFactor &&(
                        <>
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
                                    <Button asChild variant="link" size="sm" className="px-0 font-normal">
                                        <Link href="/auth/reset" >
                                            Forgot password
                                        </Link>
                                    </Button>
                                    <FormMessage/>
                                </FormItem>
                            )}/>
                        </>
                    )}
                    <FormError message={error || UrlError} />
                    <FormSuccess message={success} />
                    <Button disabled={isPending} type="submit" className="w-full">
                        {showTwoFactor? "Confirm":"Login"}
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    )
}
