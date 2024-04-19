import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';



function ButtonSearch() {
  return (
    <>
        <Form className="d-flex" style={{marginLeft: '50px', width: '600px'}}>
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              
            />
            <Button variant="outline-light"><svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-search"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" /><path d="M21 21l-6 -6" /></svg></Button>{' '}
        </Form>
    </>
  )
}


export default ButtonSearch;
