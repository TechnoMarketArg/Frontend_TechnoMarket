import Dropdown from "react-bootstrap/Dropdown";
import { useGET } from "../customHook/CustomHook";
import { Spinner } from "react-bootstrap";
import { button } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";

function ButtonCategories() {
  const [categories, Loanding, Error] = useGET("http://localhost:3000/categories");

  const navegate = useNavigate();

  const navigateCategory = (id, name) => {
    navegate(`/categories/${name}/${id}`, {
      state: {
        category: {
          id,
          name
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
            <Dropdown.Item key={category.id}>
              <button onClick={() => navigateCategory(category.id, category.name)}>
                {category.name}
              </button>
            </Dropdown.Item>
          ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default ButtonCategories;
