import { useState, createContext } from "react";
import PropTypes from "prop-types";

const AuthenticationContext = createContext({});



const AuthenticationContextProvider = ({ children }) => {
    const userValueString = localStorage.getItem("user");
    const userValue = userValueString ? JSON.parse(userValueString) : null;

    const [user, setUser] = useState(userValue);



    const handleLogin = (email) => {
        localStorage.setItem("user", JSON.stringify({ email }));
        setUser({ email });
    };

    const handleLogout = () => {
        localStorage.removeItem("user");
        setUser(null);
    };

    const handleRegister = (fullName, email, password) => {
        const newUser = { fullName, email, password };
        localStorage.setItem("user", JSON.stringify(newUser));
        setUser(newUser);
    };

    return (
        <AuthenticationContext.Provider value={{ user, handleLogin, handleLogout, handleRegister }}>
            {children}
        </AuthenticationContext.Provider>
    );
};

AuthenticationContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export { AuthenticationContext, AuthenticationContextProvider };
