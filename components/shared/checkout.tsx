import React, { useState } from 'react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Button } from "../ui/button";

const Checkout = ({ product }) => {
    const [customerInfo, setCustomerInfo] = useState({
        customersFirstName: "",
        customersLastName: "",
        email: "",
        phone: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCustomerInfo((prevInfo) => ({
            ...prevInfo,
            [name]: value,
        }));
    };

    const checkout = async () => {
        const data = {
            id: product.id,
            productName: product.name,
            price: product.price,
            quantity: 1,
            ...customerInfo
        };

        try {
            const response = await fetch("/api/payments", {
                method: "POST",
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error("Failed to fetch token");
            }

            const requestData = await response.json();
            window.snap.pay(requestData.token);
        } catch (error) {
            console.error("Error processing checkout:", error);
        }
    };

    return (
        <div className='flex items-center justify-center'>
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button variant="default">Checkout</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Checkout Your Membership</AlertDialogTitle>
                        <AlertDialogDescription>
                            <Input
                                type="text"
                                name="customersFirstName"
                                placeholder="First Name"
                                value={customerInfo.customersFirstName}
                                onChange={handleInputChange}
                            />
                            <Input
                                type="text"
                                name="customersLastName"
                                placeholder="Last Name"
                                value={customerInfo.customersLastName}
                                onChange={handleInputChange}
                            />
                            <Select>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Membership" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value={product.id} onClick={() => (product)}>
                                        {product.name}
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                            <Input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={customerInfo.email}
                                onChange={handleInputChange}
                            />
                            <Input
                                type="text"
                                name="phone"
                                placeholder="Phone"
                                value={customerInfo.phone}
                                onChange={handleInputChange}
                            />
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={checkout}>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
};

export default Checkout;
