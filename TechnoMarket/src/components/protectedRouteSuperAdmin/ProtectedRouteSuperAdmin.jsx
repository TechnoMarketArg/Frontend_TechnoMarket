import { useContext } from 'react';
import PropTypes from 'prop-types';
import { AuthenticationContext } from '../../services/authentication/Authentication.context';
import { Navigate } from 'react-router-dom';


const ProtectedRouteSuperAdmin = ({children}) => {

    const { user } = useContext(AuthenticationContext)

    if (user.Role.id === 0 && user.Role.name == 'Super-Admin' && user.id === "f47ac10b-58cc-4372-a567-0e02b2c3d479") {
        return children
    }

    return <Navigate to="/" />
};


ProtectedRouteSuperAdmin.propTypes = {
    children: PropTypes.node.isRequired
};


export default ProtectedRouteSuperAdmin;
