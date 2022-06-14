import { useContext, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Product } from "../types";
import { IconButton } from "@mui/material/";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

import { ThemeContext } from "../context/theme-context";
import { useGetAllProductsQuery } from "../redux/APIs/productsAPI";
import { addToCart } from "../redux/Slices/CartSlice";

import SearchBar from "../components/SearchBar";
import Carousel from "../components/Carousel";

const Home = () => {
  const { theme } = useContext(ThemeContext);
  const dispatch = useDispatch();
  const { data, isError, isLoading } = useGetAllProductsQuery();
  const [keyword, setKeyword] = useState("");

  const [filteredProducts, setFilteredProducts] = useState(data);

  useEffect(() => {
    setFilteredProducts(data);
  }, [data]);

  useEffect(() => {
    const _tempProducts = data?.filter((data: Product) =>
      data.name.toLowerCase().includes(keyword.toLowerCase())
    );
    setFilteredProducts(_tempProducts);
  }, [keyword, data]);

  const handleAddToCart = (product: Product) => {
    dispatch(addToCart(product));
  };

  const handleSearch = (value: string) => {
    setKeyword(value);
  };

  return (
    <>
      {isLoading ? (
        <p>Loading home page...</p>
      ) : isError ? (
        <p>Error occurred</p>
      ) : (
        <>
          <Carousel />
          <SearchBar handleSearch={handleSearch} />
          <div className={`homePage ${theme} row`}>
            <div className={`homePage__content ${theme}`}>
              {filteredProducts?.map((product) => {
                return (
                  <>
                    <div
                      className={`homePage__content__card ${theme}`}
                      key={product?.name}
                    >
                      <Link to={`/product/${product?._id}`}>
                        <div className="homePage__content__card__img">
                          <img
                            src={product?.img}
                            alt={`${product?.name}'s image`}
                          />
                        </div>
                      </Link>
                      <div className="homePage__content__card__text">
                        <h3 className="">{product?.name}</h3>
                        <div className="">€{product?.price}</div>
                        <p>{product?.description}</p>
                      </div>
                      <IconButton
                        aria-label="add-to-cart"
                        onClick={() => handleAddToCart(product)}
                      >
                        <AddShoppingCartIcon />
                      </IconButton>
                    </div>
                  </>
                );
              })}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Home;
