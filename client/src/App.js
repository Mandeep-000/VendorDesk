import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Register, Landing, Error, ProtectedRoute } from './pages'
import {
  Profile,
  SharedLayout,
  Stats,
  AddProduct,
  AllProducts,
  ProductSales,
  ProductPurchase,
  OrderHistory,
} from './pages/dashboard'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/'
          element={
            <ProtectedRoute>
              <SharedLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Stats />} />
      
          <Route path='all-products' element={<AllProducts />} />
          
          <Route path='add-product' element={<AddProduct />} />
          <Route path='sales-purchase' element={<ProductSales />} />
          <Route path='edit-sales' element={<ProductPurchase />} />
          <Route path='order-history' element={<OrderHistory />} />
          <Route path='profile' element={<Profile />} />
        </Route>
        <Route path='/register' element={<Register />} />
        <Route path='/landing' element={<Landing />} />
        <Route path='*' element={<Error />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
