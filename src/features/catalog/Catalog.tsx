import { Button } from "@mui/material";
import { useState, useEffect } from "react";
import agent from "../../app/api/agent";
import LoadingComponent from "../../app/layout/LoadingComponents";
import { Product } from "../../app/models/product";
import ProductList from "./ProductList";



export default function Catalog({addProduct}: any) {
    
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
      agent.Catalog.list()
      .then(products => setProducts(products))
      .finally( ()=> setLoading(false))
    },[]);
    if(loading) return <> <LoadingComponent message="test" /> </>
    return(<>
  <ProductList products={products}/>
    </>)
}