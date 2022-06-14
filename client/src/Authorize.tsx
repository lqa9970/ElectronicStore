import axios from "axios";
import { useState, useEffect } from "react";
import { RBAC_RULES } from "./roles";

const check = (rules: any, role: any, action: any) => {
  const permissions = rules[role];
  if (!permissions) {
    return false;
  }

  const staticPermissions = permissions.view;
  if (staticPermissions && staticPermissions.includes(action)) {
    return true;
  }

  const dynamicPermissions = permissions.actions;
  if (dynamicPermissions) {
    const permissionsCondition = dynamicPermissions.includes(action);
    if (!permissionsCondition) {
      return false;
    } else return true;
  } else return false;
};

const Authorize = ({ perform, yes, no }: any) => {
  console.log("perform", perform);
  const [userRole, setUserRole] = useState("");

  const handleVerifyToken = async () => {
    const token = window.localStorage.getItem("accessToken");

    const res = await axios.post(
      "http://localhost:3030/verify-token",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("res:", res.data.user.role);
    setUserRole(res.data.user.role.toLowerCase());
  };

  useEffect(() => {
    handleVerifyToken();
  }, []);

  if (!userRole) {
    return <p>Loading...</p>;
  }

  return check(RBAC_RULES, userRole, perform) ? yes() : no();
};

Authorize.defaultProps = {
  yes: () => null,
  no: () => null,
  role: "",
  perform: "",
};

export default Authorize;
