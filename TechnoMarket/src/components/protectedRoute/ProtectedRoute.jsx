import { useContext } from 'react';
import PropTypes from 'prop-types';
import { AuthenticationContext } from '../../services/authentication/Authentication.context';
import { Navigate } from 'react-router-dom';


const ProtectedRoute = ({children}) => {

    const { user } = useContext(AuthenticationContext)

    if (user) {
        return children
    }

    return <Navigate to="/" />
};


ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired
};


export default ProtectedRoute;
