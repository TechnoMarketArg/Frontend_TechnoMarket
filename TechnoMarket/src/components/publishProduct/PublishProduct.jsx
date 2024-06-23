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
import PropTypes from 'prop-types';

import { useState } from "react";
import { Toaster, toast } from 'sonner';
import { useGET, usePOST } from "../customHook/CustomHook";

const PublishProduct = ({ optSmModal, setOptSmModal, toggleOpen }) => {
    const [Data, Loading, Error] = useGET(
        "https://www.uuidtools.com/api/generate/v1"
      );
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [inventory, setInventory] = useState("");
    const [imageLink, setImageLink] = useState(""); // Para el enlace de imagen individual
    const [images, setImages] = useState([]); // Para almacenar múltiples enlaces de imágenes

    const [status, setStatus] = useState(true);

    const { publishProduct, loading } = usePOST(); // Usa el custom hook

    const handleTitle = (event) => {
        event.preventDefault();
        setTitle(event.target.value);
    };

    const handleDescription = (event) => {
        event.preventDefault();
        setDescription(event.target.value);
    };

    const handlePrice = (event) => {
        event.preventDefault();
        setPrice(event.target.value);
    };

    const handleInventory = (event) => {
        event.preventDefault();
        setInventory(event.target.value);
    };

    const handleImageLink = (event) => {
        event.preventDefault();
        setImageLink(event.target.value);
    };

    const addImageLink = (event) => {
        event.preventDefault();
        if (imageLink.trim() !== "") {
            setImages([...images, imageLink]);
            setImageLink("");
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

        const productData = {
            id: Data[0],
            title,
            description,
            price: parseFloat(price),
            inventory: parseInt(inventory),
            images,
            status,
        };

        try {
            await publishProduct(productData);
            setTitle("");
            setDescription("");
            setPrice("");
            setInventory("");
            setImages([]);
            setStatus(true);
            setOptSmModal(false);
        } catch (error) {
            // Manejar error si es necesario
        }
    };

    return (
        <>
            {!Loading && 
            <MDBModal open={optSmModal} tabIndex='-1' setOpen={setOptSmModal}>
                <MDBModalDialog size='xl'>
                    <MDBModalContent>
                        <MDBModalHeader>
                            <MDBModalTitle>Publicar Producto</MDBModalTitle>
                            <MDBBtn className='btn-close' color='none' onClick={toggleOpen}></MDBBtn>
                        </MDBModalHeader>
                        <Toaster richColors position='top-center' />
                        <MDBModalBody>
                            <form>
                                <MDBInput id='Name' wrapperClass='mb-4' label='Nombre' value={title} onChange={handleTitle} disabled={loading} />
                                <MDBTextArea type='text' id='description' wrapperClass='mb-4' label='Descripción'
                                    value={description}
                                    onChange={handleDescription}
                                    disabled={loading}
                                />
                                <MDBInput wrapperClass='mb-4' id='price' label='Precio' type="number" value={price} onChange={handlePrice} disabled={loading} />
                                <MDBInput wrapperClass='mb-4' id='Quantity' label='Stock' type="number" value={inventory} onChange={handleInventory} disabled={loading} />
                                
                                {/* Campo para agregar el enlace de imagen */}
                                <MDBInput wrapperClass='mb-4' id='imageLink' label='Enlace de Imagen' type="text" value={imageLink} onChange={handleImageLink} disabled={loading} />
                                <MDBBtn onClick={addImageLink} disabled={loading}>Agregar Enlace de Imagen</MDBBtn>
                                
                                {/* Mostrar los enlaces de imágenes agregados */}
                                <ul>
                                    {images.map((image, index) => (
                                        <li key={index}>{image}</li>
                                    ))}
                                </ul>

                                <MDBBtn type='submit' className='mb-4' block onClick={handleSubmit} disabled={loading}>
                                    {loading ? 'Cargando...' : 'Subir'}
                                </MDBBtn>
                            </form>
                        </MDBModalBody>
                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>
            }
        </>
    );
};

PublishProduct.propTypes = {
    optSmModal: PropTypes.bool,
    setOptSmModal: PropTypes.func,
    toggleOpen: PropTypes.func,
}

export default PublishProduct;
