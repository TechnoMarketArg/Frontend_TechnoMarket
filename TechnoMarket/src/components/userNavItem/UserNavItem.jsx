import PropTypes from 'prop-types';


const UserNavItem = ({ changePage, activePage, numPage, children }) => {
    return (
        <button
            onClick={() => changePage(numPage)}
            className={`hover:text-gray-700 font-bold p-2  ${
              activePage === numPage ? "bg-gray-500/30" : ""
            }`}>
            {children}
          </button>
    );
};


UserNavItem.propTypes = {
    changePage: PropTypes.func.isRequired,
    activePage: PropTypes.number.isRequired,
    numPage: PropTypes.number.isRequired,
    children: PropTypes.node.isRequired,
};


export default UserNavItem;
