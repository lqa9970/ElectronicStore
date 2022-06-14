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

import { useGetAllUsersQuery } from "../../../redux/APIs/userAPI";
import { ThemeContext } from "../../../context/theme-context";

import "./userTable.scss";

const UserTable = () => {
  const token = window.localStorage.getItem("accessToken");
  const { theme } = useContext(ThemeContext);
  const { data, isError, isLoading } = useGetAllUsersQuery();

  const handleDeleteUser = async (id: string) => {
    try {
      await axios.delete(`http://localhost:3030/api/v1/users/${id}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="adminPage__user-table">
        <h1>Users list</h1>
        <TableContainer component={Paper}>
          <Table
            sx={{ minWidth: 650 }}
            aria-label="simple table"
            className={`table ${theme}`}
          >
            <TableHead>
              <TableRow>
                <TableCell align="center">First Name</TableCell>
                <TableCell align="center">Last Name</TableCell>
                <TableCell align="center">ID</TableCell>
                <TableCell align="center">Email</TableCell>
                <TableCell align="center">Password</TableCell>
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
                  {data?.map((user: any) => {
                    return (
                      <TableRow
                        className={`table__${theme}`}
                        key={user.id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell align="center">{user.firstName}</TableCell>
                        <TableCell align="center">{user.lastName}</TableCell>
                        <TableCell component="th" scope="row" align="center">
                          {user._id}
                        </TableCell>
                        <TableCell align="center">{user.email}</TableCell>
                        <TableCell align="center">{user.password}</TableCell>
                        <TableCell align="center">
                          <IconButton
                            onClick={() => handleDeleteUser(user._id)}
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
function handleDeleteUser(): void {
  throw new Error("Function not implemented.");
}
