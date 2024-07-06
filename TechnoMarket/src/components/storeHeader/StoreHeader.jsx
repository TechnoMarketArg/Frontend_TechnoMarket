import { Rating } from "@mui/material";
import PropTypes from "prop-types";

import ModalChangeImageStore from "../modalChangeImageStore/ModalChangeImageStore";
import { Toaster, toast } from "sonner";
import { useState } from "react";

const StoreHeader = ({
  store,
  user,
  isFollower,
  handleToggleFollower,
  loading,
}) => {
  const [show, setShow] = useState(false);
  const [ImgStore, setImgStore] = useState(store.image);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Toaster richColors position="top-center" />
      <ModalChangeImageStore
        show={show}
        handleClose={handleClose}
        toast={toast}
        setImgStore={setImgStore}
      />
      <div
        className="flex justify-between items-center px-4 p-3"
        style={{ backgroundColor: store.color }}>
        <div className="flex items-center gap-12 ">
          <div className="relative rounded-full overflow-hidden">
            <img src={ImgStore} alt="" className="w-32 h-32 object-cover" />
            {user.RoleId == 2 && user.Store.id == store.id ? (
              <button
                onClick={handleShow}
                className="absolute cursor-pointer bottom-0 text-center py-1 text-white/50 bg-gray-500/40 hover:bg-gray-500/60 hover:text-white/70 w-32">
                change
              </button>
            ) : (
              <></>
            )}
          </div>
          {user.Store?.id !== store.id ? (
            <div className="flex flex-col">
              <div className="flex gap-4 items-center">
                <h2 className="text-3xl font-black font-kanit">{store.Name}</h2>
                <div className="cursor-pointer animate-zoom-in bg-gray-100/30 rounded-lg hover:bg-gray-100/40">
                  <button
                    className={`cursor-pointer animate-zoom-in p-1 rounded-lg flex justify-center items-center ${
                      isFollower
                        ? "bg-gray-100/30 hover:bg-gray-100/40"
                        : "bg-gray-400"
                    }`}
                    onClick={handleToggleFollower}
                    disabled={loading}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill={isFollower ? "#c81414" : "none"}
                      stroke={isFollower ? "#c81414" : "#ffffff"}
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M12 20l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.96 6.053" />
                      <path d="M16 19h6" />
                      <path d="M19 16v6" />
                    </svg>
                  </button>
                </div>
              </div>
              <p className="text-lg font-medium">0 followers</p>
            </div>
          ) : (
            <></>
          )}
        </div>
        <div className="flex items-center gap-2">
          <h3 className="font-bold text-2xl">{store.Rating}</h3>
          <div className="p-2 bg-gray-500/30 rounded-2xl flex">
            <Rating
              name="half-rating"
              readOnly
              size="large"
              precision={0.5}
              defaultValue={store.Rating}
            />
          </div>
        </div>
      </div>
    </>
  );
};

StoreHeader.propTypes = {
  store: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  isFollower: PropTypes.bool.isRequired,
  handleToggleFollower: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default StoreHeader;
