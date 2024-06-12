import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../navBar/logo.jpg';
import ButtonCategories from '../buttonCategories/ButtonCategories';
import ButtonSearch from '../buttonSearch/ButtonSearch';
import ButtonLogin from '../buttonLogin/ButtonLogin';
import PropTypes from "prop-types";
import { Button } from 'react-bootstrap';

function NavScrollExample({ searchHandler,ShoppingCart,toggleOpen}) {
  return (
    <Navbar expand="lg" className='bg-gradient-to-r from-[rgba(15,69,113,1)] via-[rgba(56,109,189,1)] to-[rgba(0,157,221,1)]'>
      <Container fluid>
        <Navbar.Brand href="#">
          <img src={logo} alt="Logo" width="40" height="20" className="d-inline-block align-end" style={{ marginRight: '20px', borderRadius: '50%'}} />
        </Navbar.Brand>
        <Navbar.Brand href="#" style={{ fontFamily: 'monospace' }} className='text-white font-bold'>TechnoMarket</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <ButtonCategories/>
            <ButtonSearch onSearch={searchHandler}/>  
          </Nav>
          <ButtonLogin/>
          <div>
            <Button variant="outline-warning" onClick={toggleOpen} className='ml-4'><svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-shopping-cart" width="24" height="24" viewBox="0 0 24 24"  stroke="currentColor" fill="none"  ><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M6 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" /><path d="M17 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" /><path d="M17 17h-11v-14h-2" /><path d="M6 5l14 1l-1 7h-13" /></svg></Button>
            <span className='absolute top-0 right-0 mt-1 mr-1 bg-green-500 px-2 rounded-full text-white'>
              {ShoppingCart.length}
            </span>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

NavScrollExample.propTypes = {
  searchHandler: PropTypes.func,
  ShoppingCart: PropTypes.array,
  toggleOpen: PropTypes.func,
}

export default NavScrollExample;





//<Navbar.Brand href="#">
//<img src={logo} alt="Logo" width="40" height="20" className="d-inline-block align-end" style={{ marginRight: '30px', borderRadius: '50%'}} />
//TechnoMarket 
//</Navbar.Brand>