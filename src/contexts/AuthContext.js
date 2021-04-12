import { createContext, useContext, useState, useEffect } from "react";

const Auth = createContext();

const AuthProvider = ({ children }) => {
  const [isUserLoggedin, setLogin] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(()=> {
    const loginStatus = JSON.parse(localStorage.getItem("loggedIn"))
    if (loginStatus) {
        setLogin(loginStatus.isUserLoggedin)
    }
}, [])

  return (
    <Auth.Provider value={{ isUserLoggedin, setLogin, loading, setLoading }}>
      {children}
    </Auth.Provider>
  );
};

export const useAuth = () => {
  return useContext(Auth);
};

export default AuthProvider;