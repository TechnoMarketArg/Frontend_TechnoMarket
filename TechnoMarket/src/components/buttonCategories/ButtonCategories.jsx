import Dropdown from "react-bootstrap/Dropdown";
import { useGET } from "../customHook/CustomHook";
import { Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function ButtonCategories() {
  const [categories, Loanding, Error] = useGET(
    "http://localhost:3000/categories"
  );

  const navigate = useNavigate();

  const navigateCategory = (name) => {
    navigate(`/categories/${name}`, {
      state: {
        category: {
          name,
        },
      },
    });
  };

  return (
    <Dropdown>
      <Dropdown.Toggle variant="outline-light" id="dropdown-basic">
        Categorias
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {Loanding && <Spinner />}

        {!Loanding &&
          categories.map((category) => (
            <Dropdown.Item
              onClick={() => navigateCategory(category.name)}
              key={category.id}>
              {category.name}
            </Dropdown.Item>
          ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default ButtonCategories;
