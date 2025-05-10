import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Homepage from './pages/Homepage'
import ProductDetails from './pages/ProductDetails'
import { Provider } from 'react-redux'
import { store } from './redux/Store'
import ComparePage from './pages/ComparePage'
import CartPage from './pages/CartPage'

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/productDetails/:id' element={<ProductDetails />} />
          <Route path="/compare" element={<ComparePage />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}

export default App
