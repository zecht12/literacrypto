'use client'

import { useEffect, useState } from 'react';
import Checkout from '../shared/checkout';
import { Kelas } from '@prisma/client';

const CheckoutPage = () => {
  const [kelas, setKelas] = useState<Kelas[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/kelas',{
          method: 'GET'
        });
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setKelas(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Main Page</h1>
      <h2>Kelas</h2>
      <ul>
        {kelas.map((item) => (
          <li key={item.id}>
            <p>Name: {item.name}</p>
            <p>Price: {item.discountPrice}</p>
            <p>Description: {item.description}</p>
            <Checkout name={item.name} price={item.discountPrice} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CheckoutPage;
