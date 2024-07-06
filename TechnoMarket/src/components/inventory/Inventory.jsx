import PropTypes from "prop-types";
import { MDBBtn, MDBCheckbox } from "mdb-react-ui-kit";
import InventoryItem from "../inventoryItem/InventoryItem";
import { useEffect, useState } from "react";
import { useDarkMode } from "../../services/DarkMode/DarkModeContext";
import { usePUT } from "../customHook/CustomHook";
import axios from "axios";

const Inventory = ({ inventory, store }) => {
  const { darkMode } = useDarkMode();
  const [activePage, setActivePage] = useState(1);
  const [Inventory, setInventory] = useState([]);

  useEffect(() => {
    if (inventory) {
      setInventory(inventory);
    }
  }, [inventory]);


  const [UpdatedDataProduct, PutDataProduct, loadingProduct, errorProduct] =
  usePUT("http://localhost:3000/products");

  const [UpdatedDataStore, PutDataStore, loadingStore, errorStore] =
  usePUT(`http://localhost:3000/stores`);

  const handleDeactivateProduct = (productId) => {
    // Paso 1: Obtener el producto completo
    axios.get(`http://localhost:3000/products/${productId}`)
      .then((response) => {
        const product = response.data;
  
        // Paso 2: Modificar el estado del producto
        const updatedProduct = { ...product, status: !product.status };
  
        // Paso 3: Actualizar el producto en el servidor
        PutDataProduct(updatedProduct, productId)
          .then((data) => {
            // Mantén los campos `idStore` y `store` si no están en la respuesta de la API
            const finalData = {
              ...updatedProduct, // Combinamos los datos originales modificados con los devueltos por la API
              ...data,
              idStore: data.idStore || product.idStore,
              store: data.store || product.store,
            };
  
            // Actualizar el inventario de la tienda
            const updatedInventory = store.inventory.map((p) =>
              p.id === productId ? finalData : p
            );
  
            const updatedStore = { ...store, inventory: updatedInventory };
  
            // Actualizar el inventario de la tienda en el servidor
            PutDataStore(updatedStore, store.id)
              .then(() => {
                // Actualizar el estado local del inventario si es necesario
                const updatedProducts = Inventory.map((p) =>
                  p.id === productId ? finalData : p
                );
                setInventory(updatedProducts);
              })
              .catch((err) => {
                console.error("Error updating store inventory:", err);
              });
          })
          .catch((err) => {
            console.error("Error updating product:", err);
          });
      })
      .catch((err) => {
        console.error("Error fetching product:", err);
      });
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
      </div>
      <table className={`table-fixed text-center w-full ${darkMode ? "bg-dark text-white" : "bg-white text-dark"}`}>
        <thead>
          <tr className="bg-gray-300 text-sm font-mono">
            <th className="">Image</th>
            <th>Title</th>
            <th>Status</th>
            <th>Inventory</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody className={activePage === 1 ? "" : "hidden"}>
          {Inventory.map((product) => (
            <InventoryItem
              key={product.id}
              product={product}
              handleDeactivateProduct={handleDeactivateProduct}
            />
          ))}
        </tbody>
        <tbody className={activePage === 2 ? "" : "hidden"}>
          {Inventory
            .filter((p) => p.status)
            .map((product) => (
              <InventoryItem
                key={product.id}
                product={product}
              />
            ))}
        </tbody>
        <tbody className={activePage === 3 ? "" : "hidden"}>
          {Inventory
            .filter((p) => !p.status)
            .map((product) => (
              <InventoryItem
                key={product.id}
                product={product}
              />
            ))}
        </tbody>
      </table>
    </div>
  );
};

Inventory.propTypes = {
  inventory: PropTypes.array,
  store: PropTypes.object,
};

export default Inventory;
