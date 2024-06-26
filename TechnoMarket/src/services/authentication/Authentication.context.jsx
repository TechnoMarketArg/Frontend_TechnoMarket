import { useState, createContext, useEffect, useContext } from "react";
import PropTypes from "prop-types";

const AuthenticationContext = createContext({});

const AuthenticationContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Recuperar usuario del Local Storage al montar el componente
  useEffect(() => {
    const email = localStorage.getItem("email");
    const password = localStorage.getItem("password");

    if (email && password) {
      // Aquí debes implementar la lógica para validar el usuario
      validateUser(email, password);
    }
  }, []);

  const validateUser = async (email, password) => {
    // Lógica para validar el usuario con los datos almacenados
    // Esta lógica debe incluir la llamada al backend para validar al usuario
    const response = await fetch("http://localhost:3000/users");
    const users = await response.json();
    const foundUser = users.find(user => user.Email === email && user.Password === password);

    if (foundUser) {
      setUser(foundUser);
    } else {
      handleLogout();
    }
  };

  const handleLogin = (foundUser) => {
    setUser(foundUser);
    localStorage.setItem("email", foundUser.Email);
    localStorage.setItem("password", foundUser.Password);
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
  return (
    <AuthenticationContext.Provider
      value={{ user, handleLogin, handleLogout, handleRegister }}>
      {children}
    </AuthenticationContext.Provider>
  );
};

AuthenticationContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
  children: PropTypes.node.isRequired,
};

export { AuthenticationContext, AuthenticationContextProvider };