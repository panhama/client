import { Card, CardMedia, CardContent, Typography, CardActions, Button, Avatar, CardHeader } from "@mui/material";
import { LoadingButton } from '@mui/lab';
import { useState } from "react";
import { Link } from "react-router-dom";
import agent from "../../app/api/agent";
import { currencyFormat } from "../../app/util/util";
import { useAppDispatch } from "../../app/store/ConfigureStore";
import { setBasket } from "../basket/basketSlice";

export default function ProductCard({ product }:any) {
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  function handleAddItem(productId :number) {
    setLoading(true);
    agent.Basket.addItem(productId)
    .then(basket => dispatch(setBasket(basket)))
    .catch(error => console.log(error))
    .finally(()=> setLoading(false));
  }
    return(
    <>
     <CardHeader avatar={ <Avatar> {product.name.charAt(0).toUpperCase()} </Avatar> } /> 
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 140,backgroundSize:'contain' }}
        image={product.pictureUrl}
        title={product.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5">
         {product.name}
        </Typography>
        <Typography gutterBottom color="secondary">
        {currencyFormat(product.price)}        
        </Typography>
        <Typography variant="body2" color="text.secondary">
         {product.brand} / {product.type}
        </Typography>
      </CardContent>
      <CardActions>
         <LoadingButton loading={loading} onClick={()=> handleAddItem(product.id)}>Add to cart</LoadingButton>
        <Button component={Link} to={`/catalog/${product.id}`} size="small">View</Button>
      </CardActions>
    </Card>
    </>)
}