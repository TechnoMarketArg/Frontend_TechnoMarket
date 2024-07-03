import { useContext } from 'react';
import PropTypes from 'prop-types';
import { AuthenticationContext } from '../../services/authentication/Authentication.context';
import { Navigate } from 'react-router-dom';


const ProtectedSession = ({children}) => {

    const { user } = useContext(AuthenticationContext)

    if (user) {
        return <Navigate to="/" />
    }

    return children
};


ProtectedSession.propTypes = {
    children: PropTypes.node.isRequired
};


export default ProtectedSession;
