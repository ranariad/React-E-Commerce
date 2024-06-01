
import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import  { Toaster } from 'react-hot-toast';

import Layout from './Components/Layout/Layout'
import Home from './Components/Home/Home'
import Cart from './Components/Cart/Cart'
import Login from './Components/Login/Login'
import Register from './Components/Register/Register'
import NotFound from './Components/NotFound/NotFound'
import Categories from './Components/Categories/Categories'
import Products from './Components/Products/Products'
import Brands from './Components/Brands/Brands'
import Profile from './Components/Profile/Profile'
import Checkout from './Components/Checkout/Checkout'
import AllOrders from './Components/AllOrders/AllOrders'



import ProductDetails from './Components/ProductDetails/ProductDetails'
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import CartContextProvider from './Context/CartContext';





let routers = createBrowserRouter([
  {path:'/', element:<Layout/> , children:[
    {index:true , element:<ProtectedRoute><Home /></ProtectedRoute> },
    {path:'login' , element:<Login />},
    {path:'register' , element:<Register />},
    {path:'products' , element:<ProtectedRoute><Products /></ProtectedRoute>},
    {path:'cart' , element:<ProtectedRoute><Cart /></ProtectedRoute>},
    {path:'profile' , element:<ProtectedRoute><Profile /></ProtectedRoute>},

    {path:'brands' , element:<ProtectedRoute><Brands /></ProtectedRoute>},
    {path:'categories' , element:<ProtectedRoute><Categories /></ProtectedRoute>},
    {path:'productdetails/:id' , element:<ProtectedRoute><ProductDetails /></ProtectedRoute>},
    {path:'checkout' , element:<ProtectedRoute><Checkout /></ProtectedRoute>},
    {path:'allorders' , element:<ProtectedRoute><AllOrders /></ProtectedRoute>},


    {path:'*' , element:<NotFound />},

  ]}
])

function App() {
  return <CartContextProvider>
    <RouterProvider router={routers}></RouterProvider>
    <Toaster />
  </CartContextProvider> 

  
  
}

export default App;
