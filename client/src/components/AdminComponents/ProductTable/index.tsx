import { useContext } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material/";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

import { useGetAllProductsQuery } from "../../../redux/APIs/productsAPI";
import { ThemeContext } from "../../../context/theme-context";

import "./productTable.scss";

const UserTable = () => {
  const { theme } = useContext(ThemeContext);

  const { data, isError, isLoading } = useGetAllProductsQuery();

  const handleDeleteProduct = async (id: string) => {
    try {
      await axios.delete(`http://localhost:3030/api/v1/products/${id}`);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="Product-table">
        <h1>Product list</h1>
        <TableContainer component={Paper}>
          <Table
            sx={{ minWidth: 650 }}
            aria-label="simple table"
            className={`table ${theme}`}
          >
            <TableHead>
              <TableRow>
                <TableCell align="center">Image</TableCell>
                <TableCell align="center">Name</TableCell>
                <TableCell align="center">ID</TableCell>
                <TableCell align="center">Categories</TableCell>
                <TableCell align="center">Price</TableCell>
                <TableCell align="center">Quantity</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <td>Table loading...</td>
                </TableRow>
              ) : isError ? (
                <td>Table load failed</td>
              ) : (
                <>
                  {data?.map((product: any) => {
                    return (
                      <TableRow
                        className={`table__${theme}`}
                        key={product.name}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell align="center">
                          <img
                            src={product.img}
                            alt={`${product.name}'s image`}
                          />
                        </TableCell>
                        <TableCell align="center">{product.name}</TableCell>
                        <TableCell component="th" scope="row" align="center">
                          {product._id}
                        </TableCell>
                        <TableCell align="center">
                          {product.categories.map((category: string) => {
                            return <p key={category}>{category}</p>;
                          })}
                        </TableCell>
                        <TableCell align="center">€{product.price}</TableCell>
                        <TableCell align="center">{product.quantity}</TableCell>
                        <TableCell align="center">
                          <IconButton
                            onClick={() => handleDeleteProduct(product._id)}
                          >
                            <HighlightOffIcon color="error" />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
};

export default UserTable;
