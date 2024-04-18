
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
        <Carousel.Item key={i} interval={3000} style={{ height: '400px' }}>
          <div style={{ position: 'relative', width: '100%', height: '100%' }}>
            <img src={img} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt={`Slide ${i}`} />
            <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '25%', background: 'linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,1))' }}></div>
          </div>
        </Carousel.Item>
      ))}
    </Carousel>
    </div>
  )
}




export default HoreCarousel;