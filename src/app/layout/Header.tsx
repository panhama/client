import { ShoppingCart } from "@mui/icons-material";
import { AppBar, Badge, Box, IconButton, List, ListItem, Switch, Toolbar, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";

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
                    <IconButton sx={{ml:2}} color="inherit" aria-label="menu" edge="start"> <Badge badgeContent="4" color="secondary"> <ShoppingCart/> </Badge>
                    </IconButton>   
                    </List>
                    </Box>
            </Toolbar>
        </AppBar>
        </>
    )
}