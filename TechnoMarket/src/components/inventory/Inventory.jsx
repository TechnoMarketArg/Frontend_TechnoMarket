import PropTypes from "prop-types";
import { MDBBtn, MDBCheckbox } from "mdb-react-ui-kit";
import InventoryItem from "../inventoryItem/InventoryItem";
import { useState } from "react";

const Inventory = ({ inventory }) => {
  const [AllChecked, setAllChecked] = useState(false);
  const [activePage, setActivePage] = useState(1);

  const handleClickCheckbox = (productId, isChecked) => {
    // Aquí deberías actualizar el estado de IsChecked para el producto específico
    console.log(`Checkbox clicked for product ${productId}, checked: ${isChecked}`);
  };

  const handleClickActive = (productId, isActive) => {
    // Aquí deberías actualizar el estado de Active para el producto específico
    console.log(`Active button clicked for product ${productId}, active: ${isActive}`);
  };

  const changePage = (page) => {
    setActivePage(page);
  };

  return (
    <div className="font-mono w-[1000px] min-h-[80vh] mb-8">
      <div className="flex justify-between px-4 py-2 bg-gray-400 mt-6 rounded-t-2xl font-bold">
        <div className="flex gap-2">
          <MDBBtn
            color="tertiary"
            className={`hover:text-gray-700 font-bold  ${activePage === 1 ? "bg-blue-300/30" : ""}`}
            onClick={() => changePage(1)}>
            All
          </MDBBtn>
          <MDBBtn
            color="tertiary"
            className={`hover:text-gray-700 font-bold  ${activePage === 2 ? "bg-blue-300/30" : ""}`}
            onClick={() => changePage(2)}>
            Active
          </MDBBtn>
          <MDBBtn
            color="tertiary"
            className={`hover:text-gray-700 font-bold  ${activePage === 3 ? "bg-blue-300/30" : ""}`}
            onClick={() => changePage(3)}>
            Disabled
          </MDBBtn>
        </div>
        {AllChecked && (
          <div className="flex gap-8 animate-fade-in">
            <MDBBtn
              onClick={() => setAllChecked(!AllChecked)}
              color="danger"
              className="px-8">
              Disable all
            </MDBBtn>
          </div>
        )}
      </div>
      <table className="table-fixed text-center w-full">
        <thead>
          <tr className="bg-gray-300 text-sm font-mono">
            <th className="lg:px-4 md:px-3 sm:px-2 p-2 w-20">
              <MDBCheckbox
                checked={AllChecked}
                onChange={() => setAllChecked(!AllChecked)}
              />
            </th>
            <th className="">Image</th>
            <th>Title</th>
            <th>Status</th>
            <th>Inventory</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody className={activePage === 1 ? "" : "hidden"}>
          {inventory.map((product) => (
            <InventoryItem
              key={product.id}
              product={product}
              IsChecked={AllChecked}
              handleClickCheckbox={handleClickCheckbox}
              handleClickActive={handleClickActive}
            />
          ))}
        </tbody>
        <tbody className={activePage === 2 ? "" : "hidden"}>
          {inventory
            .filter((p) => p.status)
            .map((product) => (
              <InventoryItem
                key={product.id}
                product={product}
                IsChecked={AllChecked}
                handleClickCheckbox={handleClickCheckbox}
                handleClickActive={handleClickActive}
              />
            ))}
        </tbody>
        <tbody className={activePage === 3 ? "" : "hidden"}>
          {inventory
            .filter((p) => !p.status)
            .map((product) => (
              <InventoryItem
                key={product.id}
                product={product}
                IsChecked={AllChecked}
                handleClickCheckbox={handleClickCheckbox}
                handleClickActive={handleClickActive}
              />
            ))}
        </tbody>
      </table>
    </div>
  );
};

Inventory.propTypes = {
  inventory: PropTypes.array,
};

export default Inventory;
