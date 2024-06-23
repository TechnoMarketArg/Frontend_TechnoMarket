import { useState } from 'react';
import { Toaster, toast } from 'sonner';
import PropTypes from "prop-types";


const ImageUpload = ( { setImages, selectedImages, setSelectedImages } ) => {
    

    const handleImageChange = (event) => {
        const files = event.target.files;
        const fileArray = Array.from(files).map((file) => URL.createObjectURL(file));

        // Verificar si la cantidad total de imágenes excede el máximo permitido
        if (selectedImages.length + fileArray.length > 5) {
        toast.error("El Máximo es de 5 Fotos");
        return;
        }

        setSelectedImages((prevImages) => prevImages.concat(fileArray));

        // Liberar la memoria de las URL de archivos anteriores
        Array.from(files).map((file) => URL.revokeObjectURL(file));
        setImages(fileArray);

  };

  const renderPhotos = (source) => {
    return source.map((photo, index) => {
      return <img key={index} src={photo} alt={`Selected ${index}`} style={{ width: '150px', height: '150px', objectFit: 'cover', margin: '10px' }} />;
    });
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <Toaster richColors position='top-center'/>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        multiple
        style={{ display: 'block', margin: '20px auto' }}
      />
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {renderPhotos(selectedImages)}
      </div>
    </div>
  );
};

ImageUpload.propTypes = {
    setImages: PropTypes.func.isRequired,
    selectedImages: PropTypes.array.isRequired,
    setSelectedImages: PropTypes.func.isRequired,
  };
  

export default ImageUpload;