import { useState, createContext, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { useAuth } from "../../components/customHook/CustomHook";

const AuthenticationContext = createContext({});

const AuthenticationContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [Authentication, LUser, EUser ] = useAuth()

  // Recuperar usuario del Local Storage
  useEffect(() => {
    const email = localStorage.getItem("email");
    const password = localStorage.getItem("password");

    if (email && password) {
      validateUser(email, password);
    }
  }, []);

  const validateUser = async (email, password) => {
    try {
      const foundUser = await Authentication(email, password);
      if (foundUser && foundUser[0] && foundUser[0].status === true) {
        handleLogin(foundUser[0]);
      } else {
        handleLogout();
      }
    } catch (error) {
      console.error("Error validating user:", error);
      handleLogout();
    }
  };

  const handleLogin = (user) => {
    setUser(user);
    localStorage.setItem("email", user.email);
    localStorage.setItem("password", user.password);
  };

  const handleLogout = () => {
    localStorage.removeItem("email");
    localStorage.removeItem("password");
    localStorage.removeItem('cart')
    setUser(null);
  };

  const handleRegister = (fullName, email, password) => {
    const newUser = { fullName, email, password };
    localStorage.setItem("email", email);
    localStorage.setItem("password", password);
    localStorage.removeItem('cart')
    setUser(newUser);
  };

  return (
    <AuthenticationContext.Provider
      value={{ user, handleLogin, handleLogout, handleRegister }}>
      {children}
    </AuthenticationContext.Provider>
  );
};

AuthenticationContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { AuthenticationContext, AuthenticationContextProvider };