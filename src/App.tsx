import { useState } from 'react'
import { useQuery } from 'react-query'
import { Drawer, LinearProgress, Grid, Badge } from '@mui/material';
import Item from './Item/Item';
// import { Wrapper } from './App.styles';
import { Wrapper, StyledButton } from './App.styles';
import AddShoppingCart from "@mui/icons-material/AddShoppingCart";
import Cart from './Cart/Cart';


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
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [cartItems, setCartItems] = useState([] as CartItemType[])

  const { data, isLoading, error } = useQuery<CartItemType[]>('products', getProducts) //ReactQuery to fetch data, 'products' is a key
  console.log(data)
  if(isLoading) return <LinearProgress />
  if(error) return <div>Something went wrong</div>

  const handleAddToCart = (clickedItem: CartItemType) => {
    setCartItems(prev => {
      const isItemInCart = prev.find(item => item.id === clickedItem.id)
      if(isItemInCart) {
        return prev.map(item => 
          item.id === clickedItem.id 
          ? { ...item, amount: item.amount + 1}
          : item 
        )
      }
      return [ ...prev, { ...clickedItem, amount: 1}]
    })
  }

  return (
    <Wrapper>
      <Drawer anchor='right' open={isCartOpen} onClose={() => setIsCartOpen(false)}>
        <Cart cartItems={cartItems} addToCart={handleAddToCart} removeFromCart={handleRemoveFromCart}/>
      </Drawer>
      <StyledButton onClick={() => setIsCartOpen(true)}>
        <Badge badgeContent={getTotalItems(cartItems)} color='error'>
          <AddShoppingCart />  
        </Badge>
      </StyledButton>
      <Grid container spacing={3}>
          {data?.map(item => (
            <Grid item key={item.id} xs={12} sm={4}>
              <Item item={item} handleAddToCart={handleAddToCart} />
            </Grid>
          ))}
      </Grid>
    </Wrapper>
  );
}

export default App;
