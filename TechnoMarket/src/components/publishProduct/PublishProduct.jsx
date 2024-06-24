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
import Box from '@mui/material/Box';

import PropTypes from 'prop-types';

import { useState, useContext } from "react";
import { Toaster, toast } from 'sonner';
import { useGET, usePOST } from "../customHook/CustomHook";
import DropDownCategories from "../dropDown/DropDownCategories";
import { AuthenticationContext } from "../../services/authentication/Authentication.context.jsx";

const PublishProduct = ({ optSmModal, setOptSmModal, toggleOpen }) => {
    const [Data, Loading, Error] = useGET(
        "https://www.uuidtools.com/api/generate/v1"
    );

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [inventory, setInventory] = useState("");
    const [imageLink, setImageLink] = useState("");
    const [images, setImages] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [variantsOptions, setVariantsOptions] = useState([]);
    const [variantTitle, setVariantTitle] = useState([]);
    const [showVariantsInputs, setShowVariantsInputs] = useState(false); // Estado para mostrar/ocultar inputs de variantes
    const [status, setStatus] = useState(true);
    
    const [variant, setVariant] = useState({});

    const { user } = useContext(AuthenticationContext);

    const { publishProduct, loading } = usePOST();

    const handleTitle = (event) => {
        setTitle(event.target.value);
    };

    const handleDescription = (event) => {
        setDescription(event.target.value);
    };

    const handlePrice = (event) => {
        setPrice(event.target.value);
    };

    const handleInventory = (event) => {
        setInventory(event.target.value);
    };

    const handleImageLink = (event) => {
        setImageLink(event.target.value);
    };

    const addImageLink = (event) => {
        event.preventDefault();
        if (imageLink.trim() !== "") {
            setImages([...images, imageLink]);
            setImageLink("");
        }
    };

    const handleVariantTitle = (event) => {
        setVariantTitle(event.target.value);
    };


    const handleAddVariant = (event) => {
        event.preventDefault();
        setShowVariantsInputs(true);
        setVariantsOptions([...variantsOptions, { name: '', price: '', quantity: '' }]);
    };

    /*const handleVariantChange = (index, field, value) => {
        const newVariants = [...variantsOptions];
        newVariants[index][field] = value;
        setVariantsOptions(newVariants);
    };*/

    const handleVariantChange = (index, field, value) => {
        const newVariants = [...variantsOptions];
        // Convertir el valor a float si el campo es 'price'
        if (field === 'price') {
            newVariants[index][field] = parseFloat(value);
        } else if (field === 'quantity') {
            // Convertir el valor a entero si el campo es 'quantity'
            newVariants[index][field] = parseInt(value);
        } else {
            newVariants[index][field] = value; // Mantener otros campos sin conversión
        }
        setVariantsOptions(newVariants);
    };

    const handleAddOptVariantInput = (event) => {
        event.preventDefault();

        // Validar si hay variantes con campos vacíos
        for (let i = 0; i < variantsOptions.length; i++) {
            const { name, price, quantity } = variantsOptions[i];
            if (!name || !price || !quantity) {
                toast.error(`La variante ${i + 1} está incompleta. Por favor, completa todos los campos antes de agregar una nueva variante.`);
                return;
            }
        }

        if (variantsOptions.length < 3) {
            setVariantsOptions([...variantsOptions, { name: '', price: '', quantity: '' }]);
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

        if (variantTitle.trim() === "") {
            toast.error("El título de la variante no puede estar vacío");
            return;
        }

        // Validar variantes vacías
        for (let i = 0; i < variantsOptions.length; i++) {
            const { name, price, quantity } = variantsOptions[i];
            if (!name || !price || !quantity) {
                toast.error(`La variante ${i + 1} está incompleta. Por favor, completa todos los campos.`);
                return;
            }
        }



        setVariant({ 
            [variantTitle]: [variantsOptions]
        });

        console.log(variantsOptions);
        console.log(variant);
        console.log(variantTitle);

        const productData = {
            id: Data[0],
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
            variants: variant,
            comment: []
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
            setSelectedCategories([]);
            setVariantsOptions([]);
            setShowVariantsInputs(false);
            setVariantTitle("");
            setVariant({});
        } catch (error) {
            // Manejar error si es necesario
        }
    };

    return (
        <>
            {!Loading &&
                <MDBModal open={optSmModal} tabIndex='-1' setOpen={setOptSmModal} >
                    <MDBModalDialog size='xl'>
                        <MDBModalContent>
                            <MDBModalHeader>
                                <MDBModalTitle>Publicar Producto</MDBModalTitle>
                                <MDBBtn className='btn-close' color='none' onClick={toggleOpen}></MDBBtn>
                            </MDBModalHeader>
                            <Toaster richColors position='top-center' />
                            <MDBModalBody className="max-h-[70vh] overflow-y-auto" >
                                <form>
                                    <MDBInput id='Name' wrapperClass='mb-4' label='Nombre' value={title} onChange={handleTitle} disabled={loading} />
                                    <MDBTextArea type='text' id='description' wrapperClass='mb-4' label='Descripción'
                                        value={description}
                                        onChange={handleDescription}
                                        disabled={loading}
                                    />
                                    <MDBInput wrapperClass='mb-4' id='price' label='Precio' type="number" value={price} onChange={handlePrice} disabled={loading} />
                                    <MDBInput wrapperClass='mb-4' id='Quantity' label='Stock' type="number" value={inventory} onChange={handleInventory} disabled={loading} />


                                    <DropDownCategories selectedCategories={selectedCategories} setSelectedCategories={setSelectedCategories} />

                                    {/* Campo para agregar el enlace de imagen */}
                                    <MDBInput wrapperClass='mb-4' id='imageLink' label='Enlace de Imagen' type="text" value={imageLink} onChange={handleImageLink} disabled={loading} />
                                    <MDBBtn className='mb-4' onClick={addImageLink} disabled={loading}>Agregar Enlace de Imagen</MDBBtn>

                                    {/* Mostrar los enlaces de imágenes agregados */}
                                    <ul className='mb-4'>
                                        {images.map((image, index) => (
                                            <li key={index}>{image}</li>
                                        ))}
                                    </ul>

                                    <Box
                                        my={4}
                                        display="flex"
                                        flexDirection="column"
                                        alignItems="center"
                                        gap={4}
                                        p={2}
                                        sx={{
                                            border: '2px solid grey',
                                            overflowY: 'auto'
                                        }}
                                        className='mb-4'
                                    >
                                        {/* Botón para agregar variantes */}
                                        <MDBBtn className='mb-4' onClick={handleAddVariant} disabled={loading}>
                                            Agregar Variante
                                        </MDBBtn>

                                        {/*handleVariant */}

                                        {showVariantsInputs &&
                                            <div className="mb-4">
                                                <MDBInput
                                                    type='text' id='variant-title' wrapperClass='mb-2' label='Titulo de Variante'
                                                    value={variantTitle}
                                                    onChange={handleVariantTitle}
                                                    disabled={loading}
                                                />
                                            </div>
                                        }

                                        {showVariantsInputs &&
                                            variantsOptions.map((variant, index) => (
                                                <div key={index} className="mb-4">
                                                    <MDBInput
                                                        wrapperClass='mb-2'
                                                        label={`Nombre Variante ${index + 1}`}
                                                        type="text"
                                                        value={variant.name}
                                                        onChange={(e) => handleVariantChange(index, 'name', e.target.value)}
                                                        disabled={loading}
                                                    />
                                                    <MDBInput
                                                        wrapperClass='mb-2'
                                                        label={`Precio Variante ${index + 1}`}
                                                        type="number"
                                                        value={variant.price}
                                                        onChange={(e) => handleVariantChange(index, 'price', e.target.value)}
                                                        disabled={loading}
                                                    />
                                                    <MDBInput
                                                        wrapperClass='mb-2'
                                                        label={`Stock Variante ${index + 1}`}
                                                        type="number"
                                                        value={variant.quantity}
                                                        onChange={(e) => handleVariantChange(index, 'quantity', e.target.value)}
                                                        disabled={loading}
                                                    />
                                                </div>
                                            ))}

                                        {/* Botón "+" para agregar más inputs de variantes */}
                                        {showVariantsInputs &&
                                            <MDBBtn className='mb-4' onClick={handleAddOptVariantInput} disabled={loading}>
                                                +
                                            </MDBBtn>
                                        }

                                    </Box>
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
