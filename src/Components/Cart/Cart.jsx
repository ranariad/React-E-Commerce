import React, { useContext, useEffect, useState } from 'react'
import Style from './Cart.module.css'
import { CartContext } from '../../Context/CartContext'
import {  Audio } from 'react-loader-spinner'
import { Link } from 'react-router-dom'



export default function Cart() {

  let {getLockedUserCart , removeCartitems , updateProductQuantity ,setNumOfCartItems } = useContext(CartContext)
  const [cartDetails, setCartDetails] = useState(null)

  async function updateCount(id , count){
    let {data} = await updateProductQuantity(id , count)

    setCartDetails(data);
  }

  async function removeItem(id){
    let {data} = await removeCartitems(id)
    setNumOfCartItems(data.numOfCartItems)

    setCartDetails(data);
  }

  async function getCart(){
    let {data} = await getLockedUserCart()
    setNumOfCartItems(data.numOfCartItems)
    setCartDetails(data);
  }

  useEffect(()=>{
    getCart()
  },[])

  return <>
  
  {cartDetails?<div className="w-75 my-2 p-3 mx-auto bg-main-light">

<h3>Shopping Cart</h3>
<h4 className='h6 text-main fw-bolder'>Cart Items :{cartDetails.numOfCartItems}</h4>
<h4 className='h6 text-main fw-bolder mb-4'>Total Cart Price :{cartDetails.data.totalCartPrice}</h4>
{cartDetails.data.products.map((product)=> <div key={product.product.id} className='row border-bottom py-2 px-2'>
  <div className="col-md-1">
    <img className='w-100' src={product.product.imageCover} alt="" />
  </div>
  <div className="col-md-11">
    <div className="d-flex justify-content-between align-items-center">
      <div>
        <h3 className='h6'>{product.product.title.split(' ').slice(0,3).join(" ")}</h3>
        <h6 className='text-main'>Price : {product.price} EGP</h6>
      </div>
      <div>
        <button onClick={()=>updateCount(product.product.id , product.count +1)} className="btn brder-main p-1">+</button>
        <span className='mx-2'>{product.count}</span>
        <button onClick={()=>updateCount(product.product.id , product.count -1)} className='btn brder-main p-1'>-</button>

      </div>
    </div>
    <button onClick={()=> removeItem(product.product.id)} className='btn p-0'><i className='text-danger font-sm fas fa-trash-can'></i> Remove</button>
  </div>
</div>)}

<Link className='btn bg-main w-100 mt-5 text-white' to={"/checkout"}>Checkout</Link>


</div>:<section id='loading' className='d-flex justify-content-center align-items-center'>
<Audio
  height="80"
  width="80"
  radius="9"
  color="green"
  ariaLabel="three-dots-loading"
  wrapperStyle
  wrapperClass
/>
  </section>}

  
  </>
}
