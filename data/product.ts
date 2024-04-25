import { v4 as uuidv4 } from 'uuid'

export async function fetchProducts() {
    return new Promise((resolve) => {
        setTimeout(() => {
        resolve([
            {
                id: uuidv4(),
                name: "Product 1",
                price: 350000,
                description: "Description for Product 2",
            },
            {
                id: uuidv4(),
                name: "Product 2",
                price: 250000,
                description: "Description for Product 2",
            },
        ]);
        }, 1000);
    });
}
