import './App.css'
import {createBrowserRouter,RouterProvider} from "react-router";
import Home from './components/Home';
import Product from './components/product';
import Cart from './components/Cart.jsx'
import Buy from './components/Buy.jsx'
import Signup from './components/Signup.jsx';
import Login from './components/Login.jsx';
import { useEffect } from 'react';
function App() {
  useEffect(() => {
    const existingUsers = localStorage.getItem("users");
    if (!existingUsers) {
      localStorage.setItem("users", JSON.stringify([]));
    }
  }, []);
  let router=createBrowserRouter([
    {
      path:'/',
      element:<Signup/>
    },
    {
      path:'/logout',
      element: <Login/>
    },
    {
      path: "/home",
      element: <Home/>
    },
    {
      path: '/product',
      element: <Product/>
    },
    {
      path:'/cart',
      element : <Cart/>
    },
    {
      path:'/buy',
      element: <Buy/>
    }
  ])
  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
