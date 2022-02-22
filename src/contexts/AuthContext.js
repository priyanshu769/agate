import { createContext, useContext, useState } from "react";

const Auth = createContext();

const AuthProvider = ({ children }) => {
  const [loggedInToken, setLoggedInToken] = useState(null);
  const [user, setUser] = useState(null);

  return (
    <Auth.Provider value={{ loggedInToken, user, setLoggedInToken, setUser }}>
      {children}
    </Auth.Provider>
  );
};

export const useAuth = () => {
  return useContext(Auth);
};

export default AuthProvider;