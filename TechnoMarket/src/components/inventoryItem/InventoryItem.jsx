import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { MDBBtn } from "mdb-react-ui-kit";
import { InputAdornment, TextField } from "@mui/material";

const InventoryItem = ({ product, handleDeactivateProduct }) => {
  const [PriceProduct, setPriceProduct] = useState(product.price || "");
  const [QuantityProduct, setQuantityProduct] = useState(
    product?.quantity || ""
  );

  return (
    <tr>
      <td className="flex justify-center items-center py-2 bg-white">
        <img
          src={product.images[0]}
          alt=""
          className="w-20 h-20 object-contain rounded-2xl"
        />
      </td>
      <td className="text-center text-xs py-4">
        <h4>{product.title}</h4>
      </td>
      <td className="text-center">
        <MDBBtn
          size="sm"
          color={product.status ? "success" : "danger"}
          onClick={() => handleDeactivateProduct(product.id)}>
          {product.status ? "Active" : "Disabled"}
        </MDBBtn>
      </td>
      <td className="text-center text-sm">
        <span className="mx-2 font-semibold">
          <TextField
          className="bg-white"
            label="Stock"
            color="secondary"
            type="text"
            value={QuantityProduct}
            onChange={(e) => setQuantityProduct(e.target.value)}
            id="outlined-start-adornment2"
            sx={{ m: 1, width: "15ch" }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">Stock</InputAdornment>
              ),
            }}
          />
        </span>
      </td>
      <td className="text-center text-sm">
        <span className="mx-2 font-semibold">
          <TextField
          className="bg-white"
            label="Price"
            type="text"
            value={PriceProduct}
            onChange={(e) => setPriceProduct(e.target.value)}
            id="outlined-start-adornment2"
            sx={{ m: 1, width: "15ch" }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
          />
        </span>
      </td>
    </tr>
  );
};

InventoryItem.propTypes = {
  product: PropTypes.object,
  IsChecked: PropTypes.bool,
  handleDeactivateProduct: PropTypes.func,
};

export default InventoryItem;
