import Dropdown from 'react-bootstrap/Dropdown';
import { useGET } from '../customHook/CustomHook';
import { Spinner } from 'react-bootstrap';

function ButtonCategories() {

  const [Data, Loanding, Error ] = useGET("https://cvrdqj9p-3000.brs.devtunnels.ms/categories")

  return (
    <Dropdown>
      <Dropdown.Toggle variant="outline-light" id="dropdown-basic" >
        Categorias
      </Dropdown.Toggle>

      <Dropdown.Menu>
      {Loanding && <Spinner/>}

        {Data.map((category) => (

          <Dropdown.Item key={category.id} href={`/category/${category.id}`}>{category.name}</Dropdown.Item>
        ))}

      </Dropdown.Menu>
    </Dropdown>
  );
}

export default ButtonCategories;