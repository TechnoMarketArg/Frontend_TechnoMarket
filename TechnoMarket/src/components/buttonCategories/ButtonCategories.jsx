import Dropdown from 'react-bootstrap/Dropdown';

function ButtonCategories() {
  return (
    <Dropdown>
      <Dropdown.Toggle variant="outline-light" id="dropdown-basic" >
        Categorias
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="/Computing">Computing</Dropdown.Item>
        <Dropdown.Item href="/Consoles-And-Videogames">Consoles and Videogames</Dropdown.Item>
        <Dropdown.Item href="/Smartphone">Smartphone</Dropdown.Item>
        <Dropdown.Item href="/Audio-And-Video">Audio and Video</Dropdown.Item>
        <Dropdown.Item href="/PC-Components">PC Components</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default ButtonCategories;