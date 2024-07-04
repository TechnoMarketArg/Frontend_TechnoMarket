import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";
import { Fragment, useContext, useState } from "react";
import { AuthenticationContext } from "../../services/authentication/Authentication.context";
import { useNavigate } from "react-router-dom";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import CreateStore from "../createStore/CreateStore";
import { RiAdminFill } from "react-icons/ri";
import { MdAdminPanelSettings } from "react-icons/md";

function ButtonUser() {
  const { user, handleLogout } = useContext(AuthenticationContext);

  const [show, setShow] = useState(false);

  const handleShowModalStore = () => setShow(true);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogoutHandler = () => {
    handleLogout();
  };

  const navigate = useNavigate();

  const handleClickStore = () => {
    const id = user.Store.id;
    navigate(`/stores/${id}`, {
      state: {
        stores: {
          id,
        },
      },
    });
  };
  const handleClickUser = () => {
    const id = user.id;

    navigate(`/users/${id}`, {
      state: {
        stores: {
          id,
        },
      },
    });
  };
  const handleClickUserAdmin = () => {
    const id = user.id;

    navigate(`/admin/${id}`, {
      state: {
        stores: {
          id,
        },
      },
    });
  };
  const handleClickUserSuperAdmin = () => {
    const id = user.id;

    navigate(`/super-admin/${id}`, {
      state: {
        stores: {
          id,
        },
      },
    });
  };

  return (
    <>
      <CreateStore show={show} setShow={setShow} user={user} />
      <Fragment>
        <div>
          <Tooltip title="Account settings">
            <IconButton
              onClick={handleClick}
              size="small"
              sx={{ ml: 2 }}
              aria-controls={open ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}>
              <Avatar sx={{ width: 32, height: 32 }}>
                {user.FirstName[0]}
              </Avatar>
            </IconButton>
          </Tooltip>
        </div>
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&::before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}>
          <MenuItem onClick={handleClickUser}>
            <Avatar /> {user.FirstName} {user.LastName}
          </MenuItem>
          {user.RoleId === 2 && (
            <MenuItem onClick={handleClickStore}>
              <Avatar>
                <LocalGroceryStoreIcon fontSize="small" />
              </Avatar>
              My Store
            </MenuItem>
          )}
          {user.RoleId === 1 && (
            <MenuItem onClick={handleClickUserAdmin}>
              <Avatar>
                <RiAdminFill />
              </Avatar>
              Profile Admin
            </MenuItem>
          )}
          {user.RoleId === 0 && (
            <MenuItem onClick={handleClickUserSuperAdmin}>
              <Avatar>
                <MdAdminPanelSettings />
              </Avatar>
              Profile Super-Admin
            </MenuItem>
          )}
          <Divider />
          {user.RoleId === 3 && (
            <MenuItem onClick={handleShowModalStore}>
              <ListItemIcon>
                <AddBusinessIcon fontSize="small" />
              </ListItemIcon>
              Open my Store
            </MenuItem>
          )}
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <Settings fontSize="small" />
            </ListItemIcon>
            Settings
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            <button onClick={handleLogoutHandler}>Logout</button>
          </MenuItem>
        </Menu>
      </Fragment>
    </>
  );
}

export default ButtonUser;
