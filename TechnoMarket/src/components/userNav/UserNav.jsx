import PropTypes from "prop-types";
import { MDBBtn } from "mdb-react-ui-kit";

const UserNav = ({ children }) => {
  return (
    <div className="sticky top-0 z-10">
      <div className="flex justify-between items-center px-8 bg-gray-300">
        <div className="flex gap-24">
          {children}
        </div>
        
      </div>
    </div>
  );
};

UserNav.propTypes = {
  children: PropTypes.node.isRequired,
};

export default UserNav;
