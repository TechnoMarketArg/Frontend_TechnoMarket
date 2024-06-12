import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import PropTypes from "prop-types";
import { MDBFile } from "mdb-react-ui-kit";
import { useState } from "react";

function ModalChangeImageStore({ show, handleClose, toast, setImgStore }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);

      // Crear una URL temporal para la vista previa de la imagen
      const fileUrl = URL.createObjectURL(file);
      setPreviewUrl(fileUrl);
    }
  };

  const handleSave = (event) => {
    event.preventDefault();
    if (selectedImage) {
      handleClose();
      toast.success("Store profile image updated successfully");
      setImgStore(previewUrl);
      setPreviewUrl(null);
      setSelectedImage(null);
    } else {
      toast.warning("Please select an image to upload");
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Change store profile image</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5 className="font-bold text-lg">Preview</h5>
          <div className="w-full flex justify-center p-4">
            <img
              src={previewUrl}
              alt=""
              className={previewUrl && "w-64 h-64 rounded-full object-cover"}
            />
          </div>

          <MDBFile
            label="Select the image of type .png or .jpg"
            id="#"
            onChange={handleImageChange}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

ModalChangeImageStore.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  toast: PropTypes.func.isRequired,
  setImgStore: PropTypes.func.isRequired,
};

export default ModalChangeImageStore;
