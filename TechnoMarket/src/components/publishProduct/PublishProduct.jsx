import {
    MDBBtn,
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBTextArea,
    MDBInput
} from "mdb-react-ui-kit";
import PropTypes from 'prop-types';
import ImageUpload from "../imageUpload/ImageUpload";
import { useState } from "react";
import { Toaster, toast } from 'sonner';
import { usePOST } from "../customHook/CustomHook";
 // Importa el custom hook

const PublishProduct = ({ optSmModal, setOptSmModal, toggleOpen }) => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [inventory, setInventory] = useState("");
    const [image, setImage] = useState([]);
    const [selectedImages, setSelectedImages] = useState([]);

    const { publishProduct, loading } = usePOST(); // Usa el custom hook

    const handleName = (event) => {
        event.preventDefault();
        setName(event.target.value);
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

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (name === "" || name.length <= 1) {   
            if (name.length <= 1) {
                toast.error("El Nombre debe Contener mas de Un Caracter");
                return;
            }
            toast.error("El Nombre no puede estar vacio");
            return;
        }

        if (description === "" || description.length >= 400) {
            if (description.length >= 400) {
                toast.error("La Descripcion no Puede tener mas de 400 Caracteres");
            } else if (description === "") {
                toast.error("La Descripcion no Puede estas Vacia");
            }
            return;
        }

        if (price === "") {
            toast.error("El Precio no puede estar vacio");
            return;
        }

        if (inventory === "") {
            toast.error("El Stock no puede estar vacio");
            return;
        }

        const productData = {
            name,
            description,
            price,
            inventory,
            images: image
        };

        try {
            await publishProduct(productData);
            setName("");
            setDescription("");
            setPrice("");
            setInventory("");
            setSelectedImages([]);
            // Close the modal
            setOptSmModal(false);
        } catch (error) {
            // Handle error if needed
        }
    };

    return (
        <>
            <MDBModal open={optSmModal} tabIndex='-1' setOpen={setOptSmModal}>
                <MDBModalDialog size='xl'>
                    <MDBModalContent>
                        <MDBModalHeader>
                            <MDBModalTitle>Publish Product</MDBModalTitle>
                            <MDBBtn className='btn-close' color='none' onClick={toggleOpen}></MDBBtn>
                        </MDBModalHeader>
                        <Toaster richColors position='top-center'/>
                        <MDBModalBody>
                            <form>
                                <MDBInput id='Name' wrapperClass='mb-4' label='Name' value={name} onChange={handleName} disabled={loading} />
                                <MDBTextArea type='text' id='description' wrapperClass='mb-4' label='Description' 
                                    value={description}
                                    onChange={handleDescription}
                                    disabled={loading}
                                />
                                <MDBInput wrapperClass='mb-4' id='price' label='Price' type="number" value={price} onChange={handlePrice} disabled={loading} />
                                <MDBInput wrapperClass='mb-4' id='Quantity' label='Stock' type="number" value={inventory} onChange={handleInventory} disabled={loading} />
                                <ImageUpload setImages={setImage} selectedImages={selectedImages} setSelectedImages={setSelectedImages} />

                                <MDBBtn type='submit' className='mb-4' block onClick={handleSubmit} disabled={loading}>
                                    {loading ? 'Cargando...' : 'Subir'}
                                </MDBBtn>
                            </form>
                        </MDBModalBody>
                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>
        </>
    );
};

PublishProduct.propTypes = {
    optSmModal: PropTypes.bool,
    setOptSmModal: PropTypes.func,
    toggleOpen: PropTypes.func,
}

export default PublishProduct;
