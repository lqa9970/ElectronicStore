import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
} from "@mui/material/";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { Link } from "react-router-dom";

const ProductCard = (product: any) => {
  return (
    <Link to={`/product/${product._id}`} key={product.name}>
      <Card sx={{ maxWidth: 345 }}>
        <img src={product.img} alt={`${product.name}'s image`} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {product.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            €{product.price}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {product.description}
          </Typography>
        </CardContent>
        <CardActions>
          <IconButton aria-label="add-to-cart">
            <AddShoppingCartIcon />
          </IconButton>
        </CardActions>
      </Card>
    </Link>
  );
};

export default ProductCard;
