import { useState } from 'react'
import { useQuery } from 'react-query'
import { Drawer, LinearProgress, Grid, Badge } from '@mui/material';
import Item from './Item/Item';
// import { Wrapper } from './App.styles';

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
  if(isLoading) return <LinearProgress />
  if(error) return <div>Something went wrong</div>

  const handleAddToCart = (clickedItem: CartItemType) => null;

  return (
    <>
      <Grid container spacing={3}>
          {data?.map(item => (
            <Grid item key={item.id} xs={12} sm={4}>
              <Item item={item} handleAddToCart={handleAddToCart} />
            </Grid>
          ))}
      </Grid>
    </>
  );
}

export default App;
