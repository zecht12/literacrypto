import React, { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from "zod";
import { CheckoutSchema } from '../../schemas';
import { checkout } from '../../actions/checkout';
import { Form, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { FormError } from '../login-error';
import { FormSuccess } from '../login-success';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTrigger } from '../ui/alert-dialog';
import Link from 'next/link';
import { Card, CardContent } from '../ui/card';
import { League_Spartan, Montserrat, Open_Sans, Poppins } from 'next/font/google';
import { cn } from '../../lib/utils';

const head = League_Spartan({
    subsets: ["latin"],
    weight: ["700"]
});

const subHead = Poppins({
    subsets: ["latin"],
    weight: ["600"]
})

const body = Montserrat({
    subsets: ["latin"],
    weight: ["400"]
});

const bodyBold = Montserrat({
    subsets: ["latin"],
    weight: ["600"]
});

const button = Open_Sans({
    subsets: ["latin"],
    weight: ["700"]
})

const Checkout = ({ product }) => {
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();
    const form = useForm<z.infer<typeof CheckoutSchema>>({
        resolver: zodResolver(CheckoutSchema),
        defaultValues: {
            email: "",
            customersName: "",
            phone: "",
            amount: `${product.description}` || "",
            productName: product.name || "",
            quantity: 1,
        }
    });

    const onSubmit = async (data) => {
        startTransition(() => {
            checkout(data)
                .then(() => {
                    setSuccess("Payment successful.");
                    setError("");
                    form.reset();
                })
                .catch((error) => {
                    setError("Payment failed. Please try again later.");
                    setSuccess("");
                });
        });
    };

    const cardClassName = product.name === "Promo 100 Orang Pertama" ? 'bg-gradient-to-r from-black to-[#c89116] border-y-2 border-[#494949]' : 'bg-gradient-to-r from-[#aeaeae] to-[#fefefe]';

    return (
        <AlertDialog>
            <AlertDialogTrigger>
                <Card key={product.id} className={cardClassName}>
                    <CardContent>
                        <h3 className={cn("mt-4 text-lg font-medium", product.name === "Promo 100 Orang Pertama" ? "text-slate-100" : "text-gray-700", subHead.className)}>
                            {product.name}
                        </h3>
                        <p className={cn("pt-1 text-lg line-through decoration-red-600", product.name === "Promo 100 Orang Pertama" ? "text-slate-100 decoration-slate-100" : "text-gray-700 decoration-gray-700", button.className)}>
                            {parseFloat(product.price).toLocaleString("us-Us", { style: "currency", currency: "USD" })}
                        </p>
                        <p className={cn("py-2 text-2xl", product.name === "Promo 100 Orang Pertama" ? "text-[#ffde59]" : "text-[#c89116]", button.className)}>
                            {parseFloat(product.description).toLocaleString("us-Us", { style: "currency", currency: "USD" })}
                        </p>
                    </CardContent>
                </Card>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <p className='text-center text-xl font-bold'>
                        Checkout Membership Anda
                    </p>
                </AlertDialogHeader>
                <Form {...form}>
                    <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField disabled={isPending} control={form.control} name="customersName" render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    Nama
                                </FormLabel>
                                <Input {...field} placeholder="Nama lengkap" />
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField disabled={isPending} control={form.control} name="email" render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    Email
                                </FormLabel>
                                <Input {...field} placeholder="Email Address" />
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField disabled={isPending} control={form.control} name="phone" render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    Nomor Telephone
                                </FormLabel>
                                <Input {...field} placeholder="Nomor Telephone" />
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField disabled={isPending} control={form.control} name="productName" render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    Nama Product yang Dipilih
                                </FormLabel>
                                <Input {...field} value={product.name} disabled />
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField disabled={isPending} control={form.control} name="amount" render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    Nama Product yang Dipilih
                                </FormLabel>
                                <Input {...field} value={product.price} disabled />
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormError message={error} />
                        <FormSuccess message={success} />
                        <div className='md:flex justify-between items-center gap-5 md:space-y-0 space-y-5'>
                            <Button disabled={isPending} type="submit" className='w-full'>
                                Continue
                            </Button>
                            <Button asChild variant='secondary'>
                                <AlertDialogCancel className='w-full'>
                                    Cancel
                                </AlertDialogCancel>
                            </Button>
                        </div>
                    </form>
                </Form>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default Checkout;
