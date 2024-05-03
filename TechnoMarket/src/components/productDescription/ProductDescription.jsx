import React, { useState } from 'react';
import PropTypes from 'prop-types';


const ProductDescription = ({ description }) => {

    const [showMore, setShowMore] = useState(false);

    const toggleShowMore = () => {
        setShowMore(!showMore);
    };

    return (
        <div id='description' className='max-w-[1240px] text-black m-8 p-4 rounded-xl bg-gray-100 border-white border-2'>
            <h4 className='text-xl font-bold text-sky-600'>Description:</h4>
    
                
            <p className={showMore ? 'text-justify text-xl text-gray-500 ' : 'text-justify text-xl text-gray-500 h-32 overflow-hidden'}>
                {description}
                <br />
                <br />
                Disfrutá de la perfecta combinación de rendimiento y diseño con esta notebook Asus TUF Gaming F15 FX506LHB. Encontrarás en ella una excelente herramienta para tus trabajos de todos los días y para tus momentos de entretenimiento. Aprovechá la experiencia extraordinaria que la marca tiene para ofrecerte y optimizá la calidad de tus imágenes y videos.
                <br />
                <br />
                Pantalla con gran impacto visual
                Su pantalla FHD de 15.6`` y 1920x1080 px de resolución te brindará colores más vivos y definidos. Tus películas y series preferidas cobrarán vida, ya que ganarán calidad y definición en cada detalle.
                <br />
                <br />
                Eficiencia a tu alcance
                Su procesador Intel Core i5 de 4 núcleos, está pensado para aquellas personas generadoras y consumidoras de contenidos. Con esta unidad central, la máquina llevará a cabo varios procesos de forma simultánea, desde edición de videos hasta retoques fotográficos con programas profesionales.
                <br />
                <br />
                Potente disco sólido
                El disco sólido de 512 GB hace que el equipo funcione a gran velocidad y por lo tanto te brinda mayor agilidad para operar con diversos programas.
                <br />
                <br />
                Un procesador exclusivo para los gráficos
                Su placa de video NVIDIA GeForce GTX 1650 convierte a este dispositivo en una gran herramienta de trabajo para cualquier profesional del diseño. Te permitirá lograr una gran performance en todos tus juegos y en otras tareas cotidianas que impliquen procesamiento gráfico.
                <br />
                <br />
                Aviso legal
                • La duración de la batería depende del uso que se le dé al producto.</p>
                <div className='w-full flex justify-end bg-transparent'>
                    <button onClick={toggleShowMore} className="text-blue-500 bg-transparent  hover:text-blue-700 font-semibold ">
                        {showMore ? 'Ver menos' : 'Ver más'}
                    </button>
                </div>
        </div>
    );
};


ProductDescription.propTypes = {
    description: PropTypes.string,
};


export default ProductDescription;
