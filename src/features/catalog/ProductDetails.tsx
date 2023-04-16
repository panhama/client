import { Divider, Grid, Table, TableBody, TableCell, TableContainer, TableRow, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import agent from "../../app/api/agent";
import NotFound from "../../app/errors/NotFound";
import LoadingComponent from "../../app/layout/LoadingComponents";
import { Product } from "../../app/models/product";
import useStoreContext from "../../app/context/StoreContext";
import { LoadingButton } from "@mui/lab";

export default function ProductDetails() {
    const {basket, setBasket} = useStoreContext();
    const {productId} = useParams<{productId: string}>();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, SetLoading] = useState(true);
    const [quantity, setQuantity] = useState(0);
    const [submit, setSubmit] = useState(false);
    
    const item = basket?.items.find(i => i.productId === product?.id);

    function handleInputChange(event: any) {
        if (event.target.value > 0){
            setQuantity(parseInt(event.target.value));
        }
    }
    function handleUpdate() {
        setSubmit(true);
        if(!item || quantity > item.quantity){
            const updateQuantity = item ? quantity - item.quantity : quantity;
            agent.Basket.addItem(product?.id!, updateQuantity)
            .then(basket => setBasket(basket))
            .catch(error => console.log(error))
            .finally(()=> SetLoading(false))
        } else {
            
        }
    }
    useEffect(()=> {
        if(item) setQuantity(item.quantity);
        productId && agent.Catalog.details(parseInt(productId))
        .then(response => {setProduct(response)})
        .catch(error => console.log(error.response))
        .finally(() => SetLoading(false));
    },[productId, item, setBasket])
    if (loading) return <> <LoadingComponent message="loading "/> </>

    if (!product) return  <> <NotFound/> </>
    
    return(
       <Grid container spacing={6}>
        <Grid item xs={6}>
            <img src={product.pictureUrl}  alt={product.name} style={{width:'100%'}}/>
        </Grid>
        <Grid item xs ={6}>
        <Typography variant="h2">{product.name}</Typography> 
        <Divider sx={{mb:2}}/>
        <Typography variant="h4" color='secondary'>${(product.price/100).toFixed(2)}</Typography>
        <TableContainer>
            <Table>
                <TableBody>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>{product.name}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Description</TableCell>
                        <TableCell>{product.description}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Type</TableCell>
                        <TableCell>{product.type}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Brand</TableCell>
                        <TableCell>{product.brand}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Quantity</TableCell>
                        <TableCell>{product.quantityInStock}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
        <Grid container spacing={2}>
        <Grid item xs={6}>
            <TextField variant="outlined" type="number" label=" quanity in cart" fullWidth value={quantity} onChange={handleInputChange}  />
        </Grid>
        <Grid item xs={6}>
            <LoadingButton sx={{height: '55px'}} color="primary" size='large' variant="contained" fullWidth onClick={handleUpdate}> {item ? "update quanitity": "add to card" }</LoadingButton>
        </Grid>
        </Grid>
       </Grid>
       </Grid>
    )
}
