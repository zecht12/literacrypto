import { v4 as uuidv4 } from 'uuid';

export async function fetchProducts() {
    return new Promise((resolve) => {
        setTimeout(() => {
            return resolve([
                {
                    id: uuidv4(),
                    name: "Product 1",
                    price: 350000,
                    description: 250000,
                },
                {
                    id: uuidv4(),
                    name: "Product 2",
                    price: 250000,
                    description: 150000,
                },
            ]);
        }, 1000);
    });
}
