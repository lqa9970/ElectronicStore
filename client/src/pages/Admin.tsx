import { useContext } from "react";
import { ThemeContext } from "../context/theme-context";

import ProductTable from "../components/AdminComponents/ProductTable";
import UserTable from "../components/AdminComponents/UserTable";
import Form from "../components/AdminComponents/Form";
import Authorize from "../Authorize";

const Admin = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <>
      <div className={`adminPage ${theme}`}>
        <Authorize
          perform="admin"
          yes={() => (
            <>
              <div className="adminPage__user-table">
                <UserTable />
              </div>
              <div className="adminPage__product-table">
                <ProductTable />
              </div>
              <div className="adminPage__form">
                <Form />
              </div>
            </>
          )}
          no={() => <h1>Only an admin page can enter</h1>}
        />
      </div>
    </>
  );
};

export default Admin;
