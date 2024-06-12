import { useGET } from './components/customHook/CustomHook.jsx'

function App() {

  const [ProductsData, ProductsLoading, ProductsError]  = useGET('https://api.escuelajs.co/api/v1/products');

  console.log(ProductsData)

  return (
      <div>
       
      </div>
  )

}

export default App
