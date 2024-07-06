import { useContext, useState, useEffect } from "react";
import { AuthenticationContext } from "../../services/authentication/Authentication.context";
import UserNav from "../userNav/UserNav";
import UserNavItem from "../userNavItem/UserNavItem";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import Button from "@mui/material/Button";
import { useUpdateUser } from "../customHook/CustomHook";
import { toast } from "sonner";
import NavBar from "../navBar/NavBar";
import { NavBarContext } from "../navBarContext/NavBarContext";
import { useDarkMode } from "../../services/DarkMode/DarkModeContext";

const UserProfile = () => {
    const { darkMode } = useDarkMode()
  const { user } = useContext(AuthenticationContext);

  const { searchHandler, ShoppingCart, toggleOpen } = useContext(NavBarContext);

  const [showPassword, setShowPassword] = useState(false);
  const [firstName, setFirstName] = useState(user?.FirstName || "");
  const [lastName, setLastName] = useState(user?.LastName || "");
  const [email, setEmail] = useState(user?.email || "");
  const [password, setPassword] = useState(user?.password || "");
  const [activePage, setActivePage] = useState(1);

  const { loading, userUpdate, error, updateUser } = useUpdateUser();

  useEffect(() => {
    if (user) {
      setFirstName(user.FirstName);
      setLastName(user.LastName);
      setEmail(user.Email);
      setPassword(user.Password);
    }
  }, [user]);

  const handleUpdateUser = () => {
    const updatedData = {
      id: user.id,
      FirstName: firstName,
      LastName: lastName,
      Email: email,
      Password: password,
    };
    updateUser(user.id, updatedData);
    toast.success(`Updated user ${user.FirstName} ${user.LastName}`);
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const changePage = (page) => {
    setActivePage(page);
  };

  return (
    <>
      <NavBar
        searchHandler={searchHandler}
        ShoppingCart={ShoppingCart}
        toggleOpen={toggleOpen}
      />
      {user && (
        <div>
          <UserNav>
            <UserNavItem
              changePage={changePage}
              activePage={activePage}
              numPage={1}>
              Your Data
            </UserNavItem>
            <UserNavItem
              changePage={changePage}
              activePage={activePage}
              numPage={2}>
              Buyed Products 
            </UserNavItem>
            <UserNavItem
              changePage={changePage}
              activePage={activePage}
              numPage={3}>
              Favorite Products
            </UserNavItem>
            <UserNavItem
              changePage={changePage}
              activePage={activePage}
              numPage={4}>
              Favorite Stores
            </UserNavItem>
          </UserNav>
          <div
            className={`flex justify-center w-full ${
              activePage === 1 ? "" : "hidden"
            }`}>
            <div className="flex flex-col bg-gray-100">
              <TextField
                label="First Name"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                id="outlined-start-adornment"
                sx={{ m: 1, width: "30ch" }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start"></InputAdornment>
                  ),
                }}
              />
              <TextField
                label="Last Name"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                id="outlined-start-adornment2"
                sx={{ m: 1, width: "30ch" }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start"></InputAdornment>
                  ),
                }}
              />
              <TextField
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                id="outlined-start-adornment2"
                sx={{ m: 1, width: "30ch" }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start"></InputAdornment>
                  ),
                }}
              />

              <FormControl sx={{ m: 1, width: "30ch" }} variant="outlined">
                <OutlinedInput
                  id="outlined-start-adornment2"
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  endAdornment={
                    <InputAdornment position="start">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
              <Button
                variant="contained"
                color="primary"
                onClick={handleUpdateUser}
                sx={{ m: 1 }}
                disabled={loading}>
                {loading ? "Loanding..." : "Save Changes"}
              </Button>
              {error && <p className="text-red-500">{error}</p>}
            </div>
          </div>
          <div
            className={`flex justify-center w-full ${
              activePage === 2 ? "" : "hidden"
            }`}>
            <ul className="flex flex-wrap w-full justify-center">
              {user.ProductsPurchased.map((product) => (
                <li
                key={product.id}
                className={`flex items-center border rounded-lg p-4 mb-4 shadow-md w-[400px] ${darkMode ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-white border-gray-200 text-gray-900'}`}
              >
                <img
                  src={product.images[0]}
                  alt={product.title}
                  className="w-24 h-auto rounded mr-4"
                />
                <div>
                  <h3 className={`text-lg font-bold mb-2 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>{product.title}</h3>
                  <p className={`mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>{product.description}</p>
                  <p className={`font-semibold ${darkMode ? 'text-blue-300' : 'text-blue-600'}`}>Precio: ${product.price}</p>
                </div>
              </li>
              
              
              ))}
            </ul>
          </div>
          <div
            className={`flex justify-center w-full ${
              activePage === 3 ? "" : "hidden"
            }`}>
            <ul className="flex flex-wrap w-full justify-center">
              {user.ProductsFavorites.map((product) => (
                <li
                key={product.id}
                className={`flex items-center border rounded-lg p-4 mb-4 shadow-md w-[400px] ${darkMode ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-white border-gray-200 text-gray-900'}`}
              >
                <img
                  src={product.images[0]}
                  alt={product.title}
                  className="w-24 h-auto rounded mr-4"
                />
                <div>
                  <h3 className={`text-lg font-bold mb-2 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>{product.title}</h3>
                  <p className={`mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>{product.description}</p>
                  <p className={`font-semibold ${darkMode ? 'text-blue-300' : 'text-blue-600'}`}>Precio: ${product.price}</p>
                </div>
              </li>
              
              ))}
            </ul>
          </div>
          <div
            className={`flex justify-center w-full ${
              activePage === 4 ? "" : "hidden"
            }`}>
            <ul>
              {user.StoresFavorites.map((product) => (
                <li key={product.id}>
                  <h3>{product.Name}</h3>
                  <p>{product.description}</p>
                  <img
                    src={product.image}
                    alt={product.title}
                    style={{ width: "100px" }}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

UserProfile.propTypes = {};

export default UserProfile;
