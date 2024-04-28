import { v4 as uuidv4 } from 'uuid';

export async function fetchProducts() {
    return new Promise((resolve) => {
        setTimeout(() => {
            return resolve([
                {
                    id: uuidv4(),
                    name: "Promo 100 Orang Pertama",
                    price: 20,
                    description: 10,
                },
                {
                    id: uuidv4(),
                    name: "1 Bulan Membership",
                    price: 20,
                    description: 15,
                },
                {
                    id: uuidv4(),
                    name: "3 Bulan Membership",
                    price: 60,
                    description: 40,
                },
            ]);
        }, 1000);
    });
}
