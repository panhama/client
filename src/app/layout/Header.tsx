import { ShoppingCart } from "@mui/icons-material";
import { AppBar, Badge, Box, IconButton, List, ListItem, Switch, Toolbar, Typography } from "@mui/material";
import { Link, NavLink } from "react-router-dom";
import useStoreContext from "../context/StoreContext";

const midLinks = [{ name: "Catalog", path: "/catalog"},
                {name: "About", path: "/about"},
                {name: "Contact", path: "/contact"}];

const navStyle = {
    color: 'white',
    textDecoration: 'none',
    Typography: 'h6',
    '&hover': {
        color: 'grey.500'
    },'&.active': {
        color: 'text.secondary'
    }
}                
export default function Header({mode,handleToggle}:any) {
    const {basket} = useStoreContext();
    const itemCount =basket?.items.reduce((sum,item )=> sum + item.quantity, 0);
    return(
        <>
        <AppBar position="static" sx={{mb:4}}>
            <Toolbar sx={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                <Box>
                <Typography variant="h6" component={NavLink} to='/' sx={navStyle}>
                    React Store   </Typography>
                    <Switch checked={mode} onChange={handleToggle} />
                </Box>
                    <Box>
                    <List sx={{display:"flex"}}>
                    {midLinks.map(({name,path}) => (
                        <ListItem
                        key={name}
                        component={NavLink}
                        to={path}
                        sx={navStyle}
                        >
                            {name.toUpperCase()}
                        </ListItem>
                    ))}
                    <IconButton component={Link} to="/basket"  sx={{ml:2}} color="inherit" aria-label="menu" edge="start"> <Badge badgeContent={itemCount} color="secondary"> <ShoppingCart/> </Badge>
                    </IconButton>   
                    </List>
                    </Box>
            </Toolbar>
        </AppBar>
        </>
    )
}