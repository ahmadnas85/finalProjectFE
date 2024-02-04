import React, { useContext, useEffect } from "react";
import "./ItemCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { addFavorite } from "../../services/api";
import  UserContext from "../../components/context/UserContext";
import CartContext from "../../components/context/CartContext"
import AspectRatio from '@mui/joy/AspectRatio';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';



function ItemCard(props) {
    const { addToCart } = useContext(CartContext);
    const { cart } = useContext(CartContext);
    const [isFavorite, setIsFavorite] = useState(false);
    const { user } = useContext(UserContext);
    const { istemIsInCart } = useContext(CartContext);


    const addToFavourites = async (e) => {
        console.log(props.item)
        console.log(user)
        try{
            if (user) {
                console.log("inside if"+ user.id +"and"+ props.item.id)
                await addFavorite(user.id, props.item.id);
                setIsFavorite(true);
            } else {
                console.log("User not logged in.");
            }
        } catch (error) {
            console.log("Error adding item to favorites:", error);
            console.log('Error:', error.message);
            console.log('Server response data:', error.response.data);
          }
        }
    
    const handleAddToCart = (item) => {
        if (istemIsInCart(item)) {
            alert("Item already in cart:", item);
        } else {
            addToCart(item);
        }
 
        console.log("Item added to cart:", item);
        console.log("Cart:", cart);
    }

    return (
        <Card sx={{ width: 320 }}>
      <div>
        <Typography level="title-lg">{props.item.name}</Typography>
        <IconButton
          aria-label="Add to favorites"
          onClick={addToFavourites}
          variant="plain"
          color="neutral"
          size="sm"
          sx={{ position: 'absolute', top: '0.875rem', right: '0.5rem' }}
        >
        </IconButton>
      </div>
      <AspectRatio minHeight="120px" maxHeight="200px">
        <img
          src={props.item.image}
          srcSet={props.item.image}
          loading="lazy"
          alt="item"
        />
      </AspectRatio>
      <CardContent orientation="horizontal">
        <div>
          <Typography level="body-xs">Total price:</Typography>
          <Typography fontSize="lg" fontWeight="lg">
          ${props.item.price}
          </Typography>
        </div>
        <Button
          variant="solid"
          size="md"
          color="primary"
          aria-label="Add to cart"
          sx={{ ml: 'auto', alignSelf: 'center', fontWeight: 600 }}
          onClick={() =>handleAddToCart(props.item)}
        >
          Add to cart
        </Button>
      </CardContent>
    </Card>
    )
}

export default ItemCard