import { useContext } from 'react';
import PropTypes from 'prop-types';
import { AuthenticationContext } from '../../services/authentication/Authentication.context';
import { Navigate } from 'react-router-dom';


const ProtectedRouteAdmin = ({children}) => {

    const { user } = useContext(AuthenticationContext)

    if (user.Role.id === 1 || user.Role.id === 0) {
        return children
    }

    return <Navigate to="/" />
};


ProtectedRouteAdmin.propTypes = {
    children: PropTypes.node.isRequired
};


export default ProtectedRouteAdmin;
