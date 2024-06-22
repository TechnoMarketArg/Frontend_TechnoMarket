
import Carousel from 'react-bootstrap/Carousel';


const HoreCarousel = () => {

  const imagenes = [
    'https://http2.mlstatic.com/D_NQ_695442-MLA75596244974_042024-OO.webp',
    'https://http2.mlstatic.com/D_NQ_929486-MLA75730742527_042024-OO.webp',
    'https://http2.mlstatic.com/storage/splinter-admin/o:f_webp,q_auto:best/1686686623447-main-sliderdesktopcelusultimo.jpg',
    'https://http2.mlstatic.com/storage/splinter-admin/o:f_webp,q_auto:best/1693599360344-mainsliderdesktopultimo.png',
    'https://http2.mlstatic.com/storage/splinter-admin/o:f_webp,q_auto:best/1695998834038-mainsliderdesktop.png',
    'https://http2.mlstatic.com/storage/splinter-admin/o:f_webp,q_auto:best/1693600048144-home-sliderdesktop2x.jpg'
  ];

  return (

    <div>
    <Carousel>
      {imagenes.map((img, i) => (
        <Carousel.Item key={i} interval={3000} className='h-[400px]'>
          <>
            <img src={img} className='w-full h-full object-cover' alt={`Slide ${i}`} />
            <div className="absolute bottom-0 left-0 w-full h-1/4 bg-gradient-to-b from-transparent to-gray-100" ></div>
          </>
        </Carousel.Item>
      ))}
    </Carousel>
    </div>
  )
}




export default HoreCarousel;