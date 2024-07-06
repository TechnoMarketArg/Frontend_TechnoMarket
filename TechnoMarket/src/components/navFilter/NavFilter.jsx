import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import PropTypes from "prop-types";
import SortBy from '../sortBy/SortBy';

const NavFilter = ({ optSourtBy }) => {
  return (
    <div>
      <Navbar bg="#90E0EF" style={{ borderRadius: '70px' }}>
        <Container>
          <div className="ms-auto me-4">
            <SortBy setOpt={optSourtBy} />
          </div>
        </Container>
      </Navbar>
    </div>
  )
}

NavFilter.propTypes = {
  optSourtBy: PropTypes.func,
}

export default NavFilter;

