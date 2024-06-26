import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import PropTypes from "prop-types";
import { TextField } from "@mui/material";
import { useGET, usePOST, usePUT } from "../customHook/CustomHook";
import Loading from "../loading/Loading";
import { toast } from "sonner";

function CreateStore({ show, setShow, user }) {
  const [NameStore, setNameStore] = useState('');
  const [DescriptionStore, setDescriptionStore] = useState('');
  const [ImageStore, setImageStore] = useState('');
  const [ColorStore, setColorStore] = useState(null);

  const handleCloseModalStore = () => {
    setNameStore('')
    setDescriptionStore('')
    setImageStore('')
    setColorStore(null)
    setNameStoreValidate(false);
    setDescriptionStoreValidate(false);
    setImageStoreValidate(false);
    setColorStoreValidate(false);
    setShow(false);
  };

  const [NameStoreValidate, setNameStoreValidate] = useState(false);
  const [DescriptionStoreValidate, setDescriptionStoreValidate] =
    useState(false);
  const [ImageStoreValidate, setImageStoreValidate] = useState(false);
  const [ColorStoreValidate, setColorStoreValidate] = useState(false);

  const [storesData, storesLoandin, storesError] = useGET('http://localhost:3000/stores');

  const [idGenerate, loadingID, errorID] = useGET(
    "https://www.uuidtools.com/api/generate/v1"
  );
  const [PostData, loadingPOST, errorPOST] = usePOST(
    "http://localhost:3000/stores"
  );
  const [UpdatedData, PutData, loadingPUT, errorPUT] = usePUT(
    "http://localhost:3000/users"
  );

  const handleCreateStore = () => {
    if (!NameStore) {
      setNameStoreValidate(true);
      return;
    }
    if (!DescriptionStore) {
      setNameStoreValidate(false);
      setDescriptionStoreValidate(true);
      return;
    }
    if (!ImageStore) {
      setNameStoreValidate(false);
      setDescriptionStoreValidate(false);
      setImageStoreValidate(true);
      return;
    }
    if (!ColorStore) {
      setNameStoreValidate(false);
      setDescriptionStoreValidate(false);
      setImageStoreValidate(false);
      setColorStoreValidate(true);
      return;
    }
    if (
      NameStoreValidate ||
      DescriptionStoreValidate ||
      ImageStoreValidate ||
      ColorStoreValidate
    ) {

      if(storesData.some(s => s.Name === NameStore)) {
        toast.error(`Store ${NameStore} already exists`);
        return;
      }

      setNameStoreValidate(false);
      setDescriptionStoreValidate(false);
      setImageStoreValidate(false);
      setColorStoreValidate(false);

      const storeData = {
        id: idGenerate[0],
        Name: NameStore,
        description: DescriptionStore,
        image: ImageStore,
        color: ColorStore,
        Rating: 0,
        inventory: [],
        seles: [],
        idOwner: user.id,
        Owner: {
          FirstName: user.FirstName,
          LastName: user.LastName,
          Email: user.Email,
        },
      };

      handlePost(storeData);
    }
  };

  const handlePost = async (storeData) => {
    try {
      const response = await PostData(storeData);
      toast.success(`Store ${response.Name} created successfully`);

      const userData = {
        id: user.id,
        FirstName: user.FirstName,
        LastName: user.LastName,
        Email: user.Email,
        Password: user.Password,
        address: {
          street: "Douglas Extension",
          suite: "Suite 847",
          city: "McKenziehaven",
          zipcode: "59590-4157",
          geo: {
            lat: "47.5162",
            lng: "-122.5316",
          },
        },
        RoleId: 2,
        Role: {
          id: 2,
          name: "Seller",
        },

        Store: {
          id: idGenerate[0],
          Name: NameStore,
          description: DescriptionStore,
          image: ImageStore,
          color: ColorStore,
          Rating: 0,
        },
        ProductsPurchased: [],
        ProductsFavorites: [],
        StoresFavorites: [],
      };

      handlePut(user.id, userData);

      console.log("Server response:", response);
    } catch (error) {
      toast.error("Error when trying to create the store");
      console.error("Error posting data:", error);
    }
  };

  const handlePut = async (Id, Data) => {
    try {
      const response = await PutData(Id, Data);
      window.location.reload();
      console.log("Server response:", response);
    } catch (error) {
      console.error("Error posting data:", error);
    }
  };

  if (user) {
    <Loading />;
  }

  return (
    <>
      <Modal
        show={show}
        onHide={handleCloseModalStore}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title">
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            Create your own store on TechnoMarket
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="flex flex-col gap-3">
            {/*name, description, image, color, idOwner, Owner*/}
            <TextField
              error={NameStoreValidate}
              helperText={NameStoreValidate ? "complete required field" : false}
              id="outlined-basic"
              label="Name"
              variant="outlined"
              size="small"
              onChange={(e) => setNameStore(e.target.value)}
            />
            <TextField
              error={DescriptionStoreValidate}
              helperText={
                DescriptionStoreValidate ? "complete required field" : false
              }
              id="outlined-multiline-flexible"
              label="Description"
              multiline
              maxRows={4}
              onChange={(e) => setDescriptionStore(e.target.value)}
            />
            <TextField
              error={ImageStoreValidate}
              helperText={
                ImageStoreValidate ? "complete required field" : false
              }
              id="outlined-basic"
              label="Link image"
              variant="outlined"
              size="small"
              onChange={(e) => setImageStore(e.target.value)}
            />
            <TextField
              error={ColorStoreValidate}
              helperText={
                ColorStoreValidate ? "complete required field" : false
              }
              type="color"
              id="outlined-basic"
              label="Front page color"
              variant="outlined"
              size="small"
              onChange={(e) => setColorStore(e.target.value)}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModalStore}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCreateStore}>
            Create Store
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

CreateStore.propTypes = {
  show: PropTypes.bool.isRequired,
  setShow: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

export default CreateStore;
