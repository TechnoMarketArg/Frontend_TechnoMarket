import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBTextArea,
  MDBInput,
} from "mdb-react-ui-kit";
import Box from "@mui/material/Box";
import { Toaster, toast } from "sonner";
import { useGET, usePOST, usePUT } from "../customHook/CustomHook";
import DropDownCategories from "../dropDown/DropDownCategories";
import { AuthenticationContext } from "../../services/authentication/Authentication.context.jsx";
import { useNavigate } from "react-router-dom";

const PublishProduct = ({ optSmModal, setOptSmModal, toggleOpen }) => {
  const [Data, Loading, Error] = useGET(
    "https://www.uuidtools.com/api/generate/v1"
  );
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [inventory, setInventory] = useState("");
  const [imageLink, setImageLink] = useState("");
  const [images, setImages] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [variantsOptions, setVariantsOptions] = useState([]);
  const [variantTitle, setVariantTitle] = useState([]);
  const [showVariantsInputs, setShowVariantsInputs] = useState(false);
  const [status, setStatus] = useState(true);

  const { user } = useContext(AuthenticationContext);


  const [store, loadingStore, errorStore] = useGET(`http://localhost:3000/stores/${user.Store.id}`)
  const [PostData, loading] = usePOST("http://localhost:3000/products");
  const [UpdatedData, PutData, loadingStorePut, error] = usePUT("http://localhost:3000/stores")

  const handleTitle = (event) => setTitle(event.target.value);
  const handleDescription = (event) => setDescription(event.target.value);
  const handlePrice = (event) => setPrice(event.target.value);
  const handleInventory = (event) => setInventory(event.target.value);
  const handleImageLink = (event) => setImageLink(event.target.value);

  const addImageLink = (event) => {
    event.preventDefault();
    if (imageLink.trim() !== "") {
      setImages([...images, imageLink]);
      setImageLink("");
    }
  };

  const handleAddVariant = (event) => {
    event.preventDefault();
    setShowVariantsInputs(true);
    setVariantsOptions([
      ...variantsOptions,
      { name: "", price: "", quantity: "" },
    ]);
  };

  const handleVariantChange = (index, field, value) => {
    const newVariants = [...variantsOptions];
    if (field === "price") {
      newVariants[index][field] = parseFloat(value);
    } else if (field === "quantity") {
      newVariants[index][field] = parseInt(value);
    } else {
      newVariants[index][field] = value;
    }
    setVariantsOptions(newVariants);
  };

  const handleAddOptVariantInput = (event) => {
    event.preventDefault();
    for (let i = 0; i < variantsOptions.length; i++) {
      const { name, price, quantity } = variantsOptions[i];
      if (!name || !price || !quantity) {
        toast.error(
          `La variante ${
            i + 1
          } está incompleta. Por favor, completa todos los campos antes de agregar una nueva variante.`
        );
        return;
      }
    }
    if (variantsOptions.length < 3) {
      setVariantsOptions([
        ...variantsOptions,
        { name: "", price: "", quantity: "" },
      ]);
    } else {
      toast.error("Solo se pueden agregar 3 variantes");
      return;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (title === "" || title.length <= 1) {
      if (title.length <= 1) {
        toast.error("El Nombre debe contener más de un caracter");
        return;
      }
      toast.error("El Nombre no puede estar vacío");
      return;
    }

    if (description === "" || description.length >= 400) {
      if (description.length >= 400) {
        toast.error("La Descripción no puede tener más de 400 caracteres");
      } else if (description === "") {
        toast.error("La Descripción no puede estar vacía");
      }
      return;
    }

    if (price === "") {
      toast.error("El Precio no puede estar vacío");
      return;
    }

    if (inventory === "") {
      toast.error("El Stock no puede estar vacío");
      return;
    }

    if (images.length === 0) {
      toast.error("El Producto debe Contener al Menos una Imagen");
      return;
    }

    if (variantTitle === "") {
      toast.error("El título de la variante no puede estar vacío");
      return;
    }

    for (let i = 0; i < variantsOptions.length; i++) {
      const { name, price, quantity } = variantsOptions[i];
      if (!name || !price || !quantity) {
        toast.error(
          `La variante ${
            i + 1
          } está incompleta. Por favor, completa todos los campos.`
        );
        return;
      }
    }

    let Variant = '';

    if (variantTitle != "") {
      Variant = {
        [variantTitle]: variantsOptions,
      };
    }

    const id = Data[0];

    const productData = {
      id: id,
      title,
      description,
      price: parseFloat(price),
      status,
      images,
      category: selectedCategories,
      Rating: 0,
      quantity: parseInt(inventory),
      offer: false,
      discount: 0,
      variants: Variant,
      comment: [],
      IdStore: user.Store.id,
      store: user.Store,
    };

    const storeData = {
        id: store.id,
        Name: store.Name,
        description: store.description,
        image: store.image,
        color: store.color,
        Rating: store.Ranting,
        inventory: [...store.inventory, productData],
        seles: store.seles,
        idOwner: user.id,
        Owner: {
          FirstName: user.FirstName,
          LastName: user.LastName,
          Email: user.Email,
        },
      }

    try {
        const idStore = store.id
        console.log(idStore)
      await PostData(productData);
      PutData(storeData, idStore)
      setTitle("");
      setDescription("");
      setPrice("");
      setInventory("");
      setImages([]);
      setStatus(true);
      setOptSmModal(false);
      setSelectedCategories([]);
      setVariantsOptions([]);
      setShowVariantsInputs(false);
      setVariantTitle("");

      navigate(`/products/${id}`, {
        state: {
          product: {
            id,
          },
        },
      });
      
    } catch (error) {
      console.log("Error al enviar el producto:", error);
    }
  };

  return (
    <>
      {!Loading && (
        <MDBModal open={optSmModal} tabIndex="-1" setOpen={setOptSmModal}>
          <MDBModalDialog size="xl">
            <MDBModalContent>
              <MDBModalHeader>
                <MDBModalTitle>Publicar Producto</MDBModalTitle>
                <MDBBtn
                  className="btn-close"
                  color="none"
                  onClick={toggleOpen}></MDBBtn>
              </MDBModalHeader>
              <Toaster richColors position="top-center" />
              <MDBModalBody className="max-h-[70vh] overflow-y-auto">
                <form>
                  <MDBInput
                    id="Name"
                    wrapperClass="mb-4"
                    label="Nombre"
                    value={title}
                    onChange={handleTitle}
                    disabled={loading}
                  />
                  <MDBTextArea
                    type="text"
                    id="description"
                    wrapperClass="mb-4"
                    label="Descripción"
                    value={description}
                    onChange={handleDescription}
                    disabled={loading}
                  />
                  <MDBInput
                    wrapperClass="mb-4"
                    id="price"
                    label="Precio"
                    type="number"
                    value={price}
                    onChange={handlePrice}
                    disabled={loading}
                  />
                  <MDBInput
                    wrapperClass="mb-4"
                    id="Quantity"
                    label="Stock"
                    type="number"
                    value={inventory}
                    onChange={handleInventory}
                    disabled={loading}
                  />
                  <MDBInput
                    wrapperClass="mb-4"
                    id="image"
                    label="Enlace de la Imagen"
                    value={imageLink}
                    onChange={handleImageLink}
                    disabled={loading}
                  />
                  <MDBBtn
                    type="button"
                    className="mb-4"
                    color="primary"
                    onClick={addImageLink}
                    disabled={loading}>
                    Añadir Imagen
                  </MDBBtn>
                  <div className="mb-4 flex flex-wrap gap-2">
                    {images.map((link, index) => (
                      <img
                        key={index}
                        src={link}
                        alt={`Imagen ${index + 1}`}
                        className="max-w-[200px] max-h-[200px] object-cover"
                      />
                    ))}
                  </div>
                  <DropDownCategories
                    selectedCategories={selectedCategories}
                    setSelectedCategories={setSelectedCategories}
                  />
                  <Box>
                    <div className="mb-3">
                      <MDBBtn
                        color="primary"
                        onClick={handleAddVariant}
                        disabled={loading}>
                        Añadir Variantes
                      </MDBBtn>
                      {showVariantsInputs && (
                        <>
                          <div className="mt-3">
                            <MDBInput
                              wrapperClass="mb-4"
                              label="Título de la variante"
                              value={variantTitle}
                              onChange={(e) => setVariantTitle(e.target.value)}
                              disabled={loading}
                            />
                            {variantsOptions.map((variant, index) => (
                              <div key={index} className="mb-3">
                                <MDBInput
                                  label={`Nombre de la opción ${index + 1}`}
                                  value={variant.name}
                                  onChange={(event) =>
                                    handleVariantChange(
                                      index,
                                      "name",
                                      event.target.value
                                    )
                                  }
                                  disabled={loading}
                                />
                                <MDBInput
                                  label={`Precio de la opción ${index + 1}`}
                                  type="number"
                                  value={variant.price}
                                  onChange={(event) =>
                                    handleVariantChange(
                                      index,
                                      "price",
                                      event.target.value
                                    )
                                  }
                                  disabled={loading}
                                />
                                <MDBInput
                                  label={`Cantidad de la opción ${index + 1}`}
                                  type="number"
                                  value={variant.quantity}
                                  onChange={(event) =>
                                    handleVariantChange(
                                      index,
                                      "quantity",
                                      event.target.value
                                    )
                                  }
                                  disabled={loading}
                                />
                              </div>
                            ))}
                          </div>
                          <MDBBtn
                            color="primary"
                            onClick={handleAddOptVariantInput}
                            disabled={loading}>
                            Añadir otra opción
                          </MDBBtn>
                        </>
                      )}
                    </div>
                  </Box>
                  <MDBBtn
                    className="w-100 mb-4"
                    color="primary"
                    onClick={handleSubmit}
                    disabled={loading}>
                    Publicar Producto
                  </MDBBtn>
                </form>
              </MDBModalBody>
            </MDBModalContent>
          </MDBModalDialog>
        </MDBModal>
      )}
    </>
  );
};

PublishProduct.propTypes = {
  optSmModal: PropTypes.bool.isRequired,
  setOptSmModal: PropTypes.func.isRequired,
  toggleOpen: PropTypes.func.isRequired,
};

export default PublishProduct;
