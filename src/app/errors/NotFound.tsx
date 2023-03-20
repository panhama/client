import { Button, Container, Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <div>
            <Container component={Paper} sx={{height: 400}}></Container>
            <Typography gutterBottom variant="h3">Oops - we could not find what you are looking for</Typography>
            <Button fullWidth component={Link} to='/catalog'>go back to shop</Button>
        </div>
    )
} 