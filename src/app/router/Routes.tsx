import { createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import Catalog from "../../features/catalog/Catalog";
import ProductDetails from "../../features/catalog/ProductDetails";
import AboutPage from "../../features/about/AboutPage";
import ServerError from "../errors/ServerError";
import NotFound from "../errors/NotFound";
import BasketPage from "../../features/basket/BasketPage";

export const Routes = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {   path: "catalog", element: <Catalog/> },
            { path: "catalog/:productId", element: <ProductDetails/> },
            { path:"about", element: <AboutPage/>},
            { path:'server-error', element: <ServerError/>}, 
            { path: "basket", element: <BasketPage/>},
            { path: "*", element: <NotFound />},
             ]}     
    ]);