import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import logo from "../navBar/logo.jpg";
import ButtonCategories from "../buttonCategories/ButtonCategories";
import ButtonSearch from "../buttonSearch/ButtonSearch";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";
import { useContext } from "react";
import { AuthenticationContext } from "../../services/authentication/Authentication.context";
import ButtonUser from "../buttonUser/ButtonUser";
import ButtonSignUp from "../buttonSignUp/ButtonSignUp";
import { NavBarContext } from "../navBarContext/NavBarContext";

function NavBar() {
  const {
    ShoppingCart,
    searchHandler,
    toggleOpen,
  } = useContext(NavBarContext);

  const { user } = useContext(AuthenticationContext);




  return (
    <Navbar
      expand="lg"
      className="bg-gradient-to-r from-[rgba(15,69,113,1)] via-[rgba(56,109,189,1)] to-[rgba(0,157,221,1)]">
      <Container fluid>
        <Navbar.Brand href="/">
          <img
            src={logo}
            alt="Logo"
            width="40"
            height="20"
            className="d-inline-block align-end rounded-full m-0"
          />
        </Navbar.Brand>
        <Navbar.Brand
          href="/"
          style={{ fontFamily: "monospace" }}
          className="text-white font-bold">
          TechnoMarket
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll>
            <ButtonCategories />
            <ButtonSearch onSearch={searchHandler} />
          </Nav>

          {!user && <ButtonSignUp />}
          {user && <ButtonUser />}
          {user && (
            <div>
              <Button
                variant="outline-warning"
                onClick={toggleOpen}
                className="ml-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M6 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                  <path d="M17 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                  <path d="M17 17h-11v-14h-2" />
                  <path d="M6 5l14 1l-1 7h-13" />
                </svg>
              </Button>
              <span className="absolute top-0 right-0 mt-1 mr-1 bg-green-500 px-2 rounded-full text-white">
                {ShoppingCart.length}
              </span>
            </div>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

NavBar.propTypes = {
  searchHandler: PropTypes.func,
  ShoppingCart: PropTypes.array,
  toggleOpen: PropTypes.func,
};

export default NavBar;
