import { Card, CardMedia, CardContent, Typography, CardActions, Button, Avatar, CardHeader } from "@mui/material";
import { Link } from "react-router-dom";

export default function ProductCard({ product }:any) {
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
         ${(product.price/100 ).toFixed(2)}
        </Typography>
        <Typography variant="body2" color="text.secondary">
         {product.brand} / {product.type}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Add to cart</Button>
        <Button component={Link} to={`/catalog/${product.id}`} size="small">View</Button>
      </CardActions>
    </Card>
    </>)
}