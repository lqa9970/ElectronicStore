import { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { Product } from "../types";

import { useGetProductByIdQuery } from "../redux/APIs/productsAPI";
import { ThemeContext } from "../context/theme-context";

type ProductParam = {
  productId: string;
};

const SingleProduct = () => {
  // const [isLoading, setIsLoading] = useState(false);
  // const [product, setProduct] = useState<Product>();
  const { theme } = useContext(ThemeContext);

  const { productId } = useParams<ProductParam>();
  console.log("id", productId);

  const { data, isError, isLoading } = useGetProductByIdQuery(productId!);

  console.log("data.categories: ", data?.categories);

  return (
    <>
      {isLoading ? (
        <p>Loading home page...</p>
      ) : isError ? (
        <p>Error occurred</p>
      ) : (
        <div className={`productPage ${theme}`}>
          <div className="">{data?.name}</div>
          <div className="productPage__image">
            <img src={data?.img} alt={`${data?.name}'s image`} />
          </div>
          <br />
          <div className="">Price: €{data?.price}/unit</div>
          <div className="">Number left in stock: {data?.quantity}</div>
          <br />
          <div className="">
            Categories:{" "}
            {data?.categories.map((category) => {
              return <p>{category}</p>;
            })}
          </div>
          <br />
          <div className="">Product description: {data?.description}</div>
        </div>
      )}
    </>
  );
};

export default SingleProduct;
