import React, { useContext } from 'react'
import Style from './Navbar.module.css'
import { Link , useNavigate } from 'react-router-dom'
import Logo from '../../Assets/images/freshcart-logo.svg'
import { UserContext } from '../../Context/UserContext'
import { CartContext } from '../../Context/CartContext'





export default function Navbar() {

  let {numOfCartItems} = useContext(CartContext)
  
  let {userToken ,setUserToken} = useContext(UserContext)
  let navigate = useNavigate()

  function logOut(){
    localStorage.removeItem('userToken')
    setUserToken(null)
    navigate('/login')
  }
  
  
  return <>
  <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <Link className="navbar-brand" href="/">
      <img src={Logo} alt="fresh market logo" />
    </Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        
        {userToken !== null ? <><li className="nav-item">
          <Link className="nav-link" to="/">Home </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/products">Products</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/categories">Categories</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/brands">Brands</Link>
        </li>
        
        <li className="nav-item">
          <Link className="nav-link" to="/profile">Profile</Link>
        </li>
        </> : '' }
        
      </ul>
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
      <li className="nav-item d-flex align-items-center">
          <i className='fab fa-facebook mx-2'></i>
          <i className='fab fa-twitter mx-2'></i>
          <i className='fab fa-tiktok mx-2'></i>
          <i className='fab fa-instagram mx-2'></i>
          <i className='fab fa-youtube mx-2'></i>

        </li>
        {userToken !== null ? <>
          <li className="nav-item">
          <span onClick={()=> logOut()} className="cursor-pointer nav-link" >LogOut</span>
        </li>
        <li className="nav-item position-relative">
          <Link className="nav-link" to="/cart">
            <i className='fa fa-shopping-cart '> </i>
            <span className=' bg-main p-1 rounded position-absolute top-0 end-0'>{numOfCartItems}</span>
          </Link>
        </li>
        </> 
        : 
        <><li className="nav-item">
          <Link className="nav-link" to="/login">Login</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/register">Register</Link>
        </li></> }
        
      
        
       
      </ul>
      
    </div>
  </div>
</nav>
  </>
}
