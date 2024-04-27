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

const Checkout = ({ product }) => {
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();
    const form = useForm<z.infer<typeof CheckoutSchema>>({
        resolver: zodResolver(CheckoutSchema),
        defaultValues: {
            email: "",
            customersName: "",
            phone:"",
            amount: `${product.description}` || "",
            productName:product.name || "",
            quantity:1,
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
    

    return (
        <AlertDialog>
            <AlertDialogTrigger>
                <Card key={product.id} className='bg-gray-400'>
                    <CardContent>
                        <h3 className="mt-4 text-lg font-medium text-gray-900">
                            {product.name}
                        </h3>
                        <p className="mt-1.5 text-sm text-gray-700">{parseFloat(product.price).toLocaleString("id-ID", { style: "currency", currency: "IDR" })}</p>
                        <p className="py-4 text-sm text-gray-700">
                        {parseFloat(product.description).toLocaleString("id-ID", { style: "currency", currency: "IDR" })}
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
