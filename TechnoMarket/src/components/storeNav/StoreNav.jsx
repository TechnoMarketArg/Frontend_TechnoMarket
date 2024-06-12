import PropTypes from "prop-types";
import { MDBBtn } from "mdb-react-ui-kit";

const StoreNav = ({ children }) => {
  return (
    <div className="sticky top-0 z-10">
      <div className="flex justify-between items-center px-8 bg-gray-300">
        <div className="flex gap-24">
          {children}
        </div>
        <div className="my-2">
          <MDBBtn color="info">Post</MDBBtn>
        </div>
      </div>
    </div>
  );
};

StoreNav.propTypes = {
  children: PropTypes.node.isRequired,
};

export default StoreNav;
