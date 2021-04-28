import { createContext, useContext, useState, useEffect } from "react";

const Auth = createContext();

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState("");
  const [loading, setLoading] = useState(false);
  const [userCredentials, setUserCredentials] = useState(null)

  useEffect(() => {
    const loginStatus = JSON.parse(localStorage.getItem("loggedIn"))
    setLoggedIn(loginStatus)
  }, [])

  return (
    <Auth.Provider value={{ loggedIn, setLoggedIn, loading, setLoading, userCredentials, setUserCredentials }}>
      {children}
    </Auth.Provider>
  );
};

export const useAuth = () => {
  return useContext(Auth);
};

export default AuthProvider;