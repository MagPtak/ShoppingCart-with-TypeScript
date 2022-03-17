import { useState } from 'react'
import { useQuery } from 'react-query'
import { Drawer, LinearProgress, Grid, Badge } from '@mui/material';
// import { AddShoppingCartIcon } from "@mui/icons-material/";
import { Wrapper } from './App.styles';

export type CartItemType = {
  id: number,
  category: string,
  description: string,
  image: string,
  price: number,
  title: string,
  amount: number
}

const getProducts = async (): Promise<CartItemType[]> => 
  await (await fetch('https://fakestoreapi.com/products/')).json()

function App() {
  const { data, isLoading, error } = useQuery<CartItemType[]>('products', getProducts) //ReactQuery to fetch data, 'products' is a key
  console.log(data)
  return (
    <div className="App">
      Makapaka
    </div>
  );
}

export default App;
