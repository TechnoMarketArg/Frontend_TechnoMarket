import PropTypes from "prop-types";
import { FaCircle } from "react-icons/fa";
import { MDBBtn, MDBBtnGroup } from "mdb-react-ui-kit";
import { useEffect, useState } from "react";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";

const ProductInformation = ({ product }) => {
  const [selectedVariants, setSelectedVariants] = useState({});

  const handleSelection = (variantType, option) => {
    setSelectedVariants({
      ...selectedVariants,
      [variantType]: option,
    });
  };

  const features = [
    { brand: "ASUS" },
    { condition: "New" },
    { Color: "Black" },
    { Graphic: "NVIDIA GeForce GTX 1650" },
  ];

  const rating = 3.5;

  return (
    <div className="w-[380px] min-h-[380px] bg-gray-50 p-6 flex flex-col gap-2 rounded-xl">
      {/*<span className='text-sm text-blue-400 cursor-pointer hover:text-blue-500'>{product.category.name}</span>*/}
      <h2 className="text-xl font-semibold">{product.title}</h2>
      <div className="flex">
        <div className=" text-sm mr-2">{rating}</div>
        <Stack spacing={1}>
          <Rating
            name="half-rating"
            readOnly
            size="small"
            precision={0.5}
            defaultValue={rating}
          />
        </Stack>
        <div className="text-sm ml-2">(10)</div>
      </div>
      <div className="text-2xl font-semibold">${product.price}</div>
      <hr />
      <table className="min-w-[200px] overflow-y-scroll scrollbar-thumb-gray-500 scrollbar-track-gray-200 text-xs">
        {features.map((feature, index) => (
          <tbody key={index}>
            {Object.entries(feature).map(([key, value], index) => (
              <tr key={index}>
                <td className="font-bold ">{key}:</td>
                <td>{value}</td>
              </tr>
            ))}
          </tbody>
        ))}
      </table>
      <div>
        {product.variants && Object.keys(product.variants).map((variantType) => (
          <div className="flex flex-col my-4" key={variantType}>
            <h5 className="text-sm font-bold">{variantType}:</h5>
            <MDBBtnGroup shadow="10">
              {product.variants[variantType].map((option) => (
                <MDBBtn
                  outline={
                    !selectedVariants[variantType] ||
                    selectedVariants[variantType] !== option.name
                  }
                  color={
                    selectedVariants[variantType] === option.name
                      ? "primary"
                      : "secondary"
                  }
                  onClick={() => handleSelection(variantType, option.name)}
                  key={option.name}
                  className="text-[9.6px] font-bold">
                  {option.name}
                </MDBBtn>
              ))}
            </MDBBtnGroup>
          </div>
        ))}
      </div>
      <div>
        <a
          href="#description"
          className="text-sm font-semibold text-blue-400 cursor-pointer hover:text-blue-500 underline">
          General description
        </a>
        {/*<div className='max-h-[120px] overflow-y-scroll scrollbar-thumb-gray-500 scrollbar-track-gray-200 p-1'>
          <p className='text-xs text-justify'>{product.description}</p>
        </div>*/}
      </div>
    </div>
  );
};

ProductInformation.propTypes = {
  product: PropTypes.object.isRequired,
};

export default ProductInformation;
