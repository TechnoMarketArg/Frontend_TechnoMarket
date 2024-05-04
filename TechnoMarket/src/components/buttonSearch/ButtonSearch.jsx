import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import PropTypes from "prop-types";
import { useState } from "react";

function ButtonSearch({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");


  const handleSearch = () => {
    onSearch(searchTerm);
  };

  return (
    <>
        <Form className="d-flex" style={{marginLeft: '50px', width: '600px'}}>
            <Form.Control
              type="search"
              placeholder="Buscar Producto..."
              className="me-2"
              aria-label="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button variant="outline-light" onClick={handleSearch}><svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  className="icon icon-tabler icons-tabler-outline icon-tabler-search"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" /><path d="M21 21l-6 -6" /></svg></Button>{' '}
        </Form>
    </>
  )
}

ButtonSearch.propTypes = {
  onSearch: PropTypes.func
};

export default ButtonSearch;
