
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Homepage from './pages/Homepage'
import ProductDetails from './pages/ProductDetails'



function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Homepage />}></Route>
          <Route path='/productDetails/:id' element={<ProductDetails />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
