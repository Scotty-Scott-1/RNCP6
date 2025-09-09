import { useAuth } from "./authContext.jsx";
import { Navigate, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";

/*PROTECT ROUTE COMPONENT: Wrap protected routes with this component to ensure only authenticated users can access them*/
const ProtectRoute = ({ children }) => {
  const { accessToken } = useAuth();
  const location = useLocation();
  const [isValid, setIsValid] = useState(null);

  /*EFFECT TO VALIDATE TOKEN: On component mount or when accessToken changes, validate the token with the backend*/
  useEffect(() => {
    const validateToken = async () => {
      if (!accessToken) {
        setIsValid(false);
        return;
      }
      /*TRY VALIDATING TOKEN: Send the accessToken to the backend for validation*/
      try {
        const response = await fetch("http://172.19.48.43:5001/api/checkaccess", {
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({ token: accessToken }),
        });
        const data = await response.json();
        setIsValid(data.valid);
        console.log("Token validation response:", data.valid);
      } catch (error) {
        console.error("Error validating token:", error);
        setIsValid(false);
      }
    };
    /*CALL VALIDATE TOKEN: Call the function to validate the token*/
    validateToken();
  }, [accessToken, location.pathname]);


  // While checking token validity, show a loading indicator
  if (isValid === null) return <div>Loading...</div>;

  // If token is invalid, go to login
  if (!isValid) return <Navigate to="/about" replace />;

  // Otherwise show the protected page
  return children;
};

export default ProtectRoute;
