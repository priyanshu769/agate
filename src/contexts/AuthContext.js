import { createContext, useContext, useState } from "react";

const Auth = createContext();

const AuthProvider = ({ children }) => {
  const [isUserLoggedin, setLogin] = useState(false);
  return (
    <Auth.Provider value={{ isUserLoggedin, setLogin }}>
      {children}
    </Auth.Provider>
  );
};

export const useAuth = () => {
  return useContext(Auth);
};

export default AuthProvider;