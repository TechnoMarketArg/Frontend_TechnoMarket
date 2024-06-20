
import Carousel from 'react-bootstrap/Carousel';


const HoreCarousel = () => {

  const imagenes = [
    'https://http2.mlstatic.com/D_NQ_695442-MLA75596244974_042024-OO.webp',
    'https://http2.mlstatic.com/D_NQ_809188-MLA75592685514_042024-OO.webp',
    'https://http2.mlstatic.com/D_NQ_929486-MLA75730742527_042024-OO.webp'
  ];

  return (

    <div>
    <Carousel>
      {imagenes.map((img, i) => (
        <Carousel.Item key={i} interval={3000} className='h-[400px]'>
          <div className='relative w-full h-full'>
            <img src={img} className='w-full h-full object-cover' alt={`Slide ${i}`} />
            <div className="absolute bottom-0 left-0 w-full h-1/4 bg-gradient-to-b from-transparent to-[#EAF7FD]" ></div>
          </div>
        </Carousel.Item>
      ))}
    </Carousel>
    </div>
  )
}




export default HoreCarousel;