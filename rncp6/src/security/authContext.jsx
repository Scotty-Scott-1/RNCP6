import React, { createContext, useState, useContext } from "react";

const AuthContext = createContext({
  accessToken: null,
  setAccessToken: () => {}
});

export const AuthProvider = ({ children }) => {
  console.log("AuthProvider rendering");
  const [accessToken, setAccessToken] = useState(null);
  console.log("accessToken state:", accessToken);

  return (
    <AuthContext.Provider value={{ accessToken, setAccessToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
