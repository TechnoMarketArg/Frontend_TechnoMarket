import { InputAdornment, TextField } from "@mui/material";
import PropTypes from "prop-types";
import { useState } from "react";

const OffersItem = ({ product }) => {
  const [DiscountProduct, setDiscountProduct] = useState(
    product?.discount || ""
  );
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
        <TextField
          label="Discount"
          type="text"
          value={DiscountProduct * 100}
          onChange={(e) => setDiscountProduct(e.target.value)}
          id="outlined-start-adornment2"
          sx={{ m: 1, width: "10ch" }}
          InputProps={{
            startAdornment: <InputAdornment position="start">%</InputAdornment>,
          }}
        />
      </td>
      <td className="text-center text-sm">
        <span className="mx-2 font-semibold">
          <TextField
            label="Stock"
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
        <span className="mx-2 font-semibold">${product.price}</span>
      </td>
    </tr>
  );
};

OffersItem.propTypes = {
  product: PropTypes.object,
};

export default OffersItem;
