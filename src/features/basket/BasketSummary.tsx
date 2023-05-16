import { TableContainer, Table, TableBody, TableRow, TableCell, Paper } from "@mui/material"
import { useEffect, useState } from "react"
import useStoreContext from "../../app/context/StoreContext";

export default function BasketSummary() {
const {basket} = useStoreContext();
const total = basket?.items?.reduce(
    (total, item) => total + (item.price / 100)* item.quantity, 0) ?? 0;
const delieveryFee = total >= 100 ? 0 : 5;
 
// function GetTotal() {
//  const totalPrice = basket && basket.items && basket?.items.reduce(
//     (total, item) => total + (item.price / 100) * item.quantity, 0);  
//  return totalPrice;
// }
return(
        <>
      <TableContainer component={Paper} variant={"outlined"}>
        <Table>
            <TableBody>
                <TableRow>
                    <TableCell colSpan={2}>Subtotal</TableCell>
                    <TableCell align="right">${total}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell colSpan={2}>Delivery Fee*</TableCell>
                    <TableCell align="right">${delieveryFee}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell colSpan={2}>Total</TableCell>
                    <TableCell align="right">${total + delieveryFee}</TableCell>
                </TableRow>
            </TableBody>          
        </Table> {delieveryFee !== 5 ?  <p> congrats you got free shipping</p> : <p>orders over $100 qaulify for free delievery</p> }
      </TableContainer>  
        </>
    )
}
