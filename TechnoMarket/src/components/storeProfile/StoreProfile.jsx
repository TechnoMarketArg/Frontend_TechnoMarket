import PropTypes from "prop-types";
import Inventory from "../inventory/Inventory";
import StoreHeader from "../storeHeader/StoreHeader";
import StoreNav from "../storeNav/StoreNav";
import { useState } from "react";
import StoreNavItem from "../storeNavItem/StoreNavItem";

const StoreProfile = ({ ProductsData }) => {
  const [activePage, setActivePage] = useState(1);

  const changePage = (page) => {
    setActivePage(page);
  };

  const store = {
    name: "DIGITAL STORE",
    img: "https://img.freepik.com/vector-premium/logotipo-tienda-digital-o-logotipo-productos-electronicos-o-logotipo-comercio-electronico_372882-55.jpg",
    description: "La mejor tienda digital del pais",
    followers: 1000,
    rating: 4.5,
    reviews: 28,
    bgHeader: "bg-sky-500",
  };

  const user1 = {
    id: "1e9bb4ab-eab0-424a-8248-4c53f5cef2d7",
    first_name: "Sebastian",
    last_name: "Almiron",
    email: "sebastian@gmail.com",
    password: "seba123",
    active: true,
    city: "rosario",
    RoleId: 2,
  };
  const user2 = {
    id: "1e9bb4ab-eab0-424a-8248-4c53f5cef2d7",
    first_name: "Sebastian",
    last_name: "Almiron",
    email: "sebastian@gmail.com",
    password: "seba123",
    active: true,
    city: "rosario",
    RoleId: 3,
  };

  const user = user1;

  return (
    <div>
      <StoreHeader store={store} user={user} />
      <StoreNav>
        <StoreNavItem
          changePage={changePage}
          activePage={activePage}
          numPage={1}>
          {user.RoleId != 3 ? "inventory" : "Products"}
        </StoreNavItem>
        <StoreNavItem
          changePage={changePage}
          activePage={activePage}
          numPage={2}>
          {user.RoleId != 3 ? "My Offers" : "Offers"}
        </StoreNavItem>
        <StoreNavItem
          changePage={changePage}
          activePage={activePage}
          numPage={3}>
          {user.RoleId != 3 ? "Seles" : "Best sellers"}
        </StoreNavItem>
      </StoreNav>
      <div
        className={` flex justify-center w-full  ${
          activePage === 1 && user.RoleId != 3 ? "" : "hidden"
        }`}>
        <Inventory products={ProductsData} />
      </div>
    </div>
  );
};

StoreProfile.propTypes = {
  ProductsData: PropTypes.array,
};

export default StoreProfile;
