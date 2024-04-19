import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../navBar/logo.jpg';
import ButtonCategories from '../buttonCategories/ButtonCategories';
import ButtonSearch from '../buttonSearch/ButtonSearch';
import ButtonLogin from '../buttonLogin/ButtonLogin';

function NavScrollExample() {
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
            <ButtonSearch/>  
          </Nav>
          <ButtonLogin/>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavScrollExample;





//<Navbar.Brand href="#">
//<img src={logo} alt="Logo" width="40" height="20" className="d-inline-block align-end" style={{ marginRight: '30px', borderRadius: '50%'}} />
//TechnoMarket 
//</Navbar.Brand>