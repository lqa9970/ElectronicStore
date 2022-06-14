import { useContext, useState, useEffect } from "react";
import axios from "axios";
import { ThemeContext } from "../context/theme-context";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";

type IDType = {
  id: string;
  email: string;
};

const LogIn = () => {
  const { theme } = useContext(ThemeContext);
  const [accessToken, setAccessToken] = useState("");

  const handleSuccess = async (res: any) => {
    try {
      const tokenId = res.credential;
      const response = await axios.post(
        "http://localhost:3030/google-login",
        {},
        {
          headers: {
            Authorization: `Bearer ${tokenId}`,
          },
        }
      );
      console.log(response.data.token);
      setAccessToken(response.data.token);
      console.log("accessToken:", accessToken);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    localStorage.setItem("accessToken", accessToken);
  }, [accessToken]);

  return (
    <div className={`login login__${theme}`}>
      <div className="login__button">
        <GoogleLogin
          onSuccess={handleSuccess}
          onError={() => {
            console.log("Login Failed");
          }}
        />
      </div>
    </div>
  );
};

export default LogIn;
