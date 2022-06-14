import { useState, useEffect } from "react";
import { useGetUserByIdQuery } from "../redux/APIs/userAPI";

const UserProfile = () => {
  const [userID, setUserID] = useState("");

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("accessToken") || "");
    if (data) {
      setUserID(data);
    }
  }, []);

  const { data, isError, isLoading } = useGetUserByIdQuery(userID);

  console.log("data:", data);

  return (
    <>
      <div className="userPage"></div>
    </>
  );
};

export default UserProfile;
