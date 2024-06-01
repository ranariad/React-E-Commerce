import React, { useContext, useEffect, useState } from 'react'
import Style from './FeatureProducts.module.css'
import  axios  from 'axios'
import { FidgetSpinner ,  Audio } from 'react-loader-spinner'

import {useQuery} from 'react-query'
import { Link } from 'react-router-dom'
import { CartContext } from '../../Context/CartContext'
import toast from 'react-hot-toast';



export default function FeatureProducts() {

  let {addToCart , setNumOfCartItems} = useContext(CartContext)

  async function addProductToCart(id){

   let response = await addToCart(id)
   if(response.data.status === 'success')
   {
    toast.success('product successfully added',{
      duration: 4000,
      icon: '👏',
    })
    setNumOfCartItems( response.data.numOfCartItems)


   }else
   {
    toast.error('Error adding product')

   }
   console.log(response);

  }

  function getFeaturedProducts(){
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
  }

  let {isLoading , isFetching , isError , data} = useQuery ('featuredProducts' , getFeaturedProducts)
console.log(data?.data.data);
  
  return <>
 
  {isLoading ? <div className="d-flex w-100 py-5 justify-content-center align-items-center">
  <Audio
  height="80"
  width="80"
  radius="9"
  color="green"
  ariaLabel="three-dots-loading"
  wrapperStyle
  wrapperClass
/>
</div>  : <div className="container py-5">
  <h2 >Featured Products</h2>
    {isLoading ? <div className="d-flex w-100 py-5 justify-content-center align-items-center">
    <FidgetSpinner
        visible={true}
        height="80"
        width="80"
        ariaLabel="fidget-spinner-loading"
        wrapperStyle={{}}
        wrapperClass="fidget-spinner-wrapper"
      />
    </div>  :<div className="row">

{data?.data.data.map((ele)=><div key={ele.id} className="col-md-2">
    
    <div className="product cursor-pointer px-2 py-3">
    <Link to={`/productdetails/${ele.id}`}>
    <img src={ele.imageCover} className='w-100' alt="" />
    <p className='text-main'>category</p>
    <h6>{ele.title.split(" ").slice(0,2).join(" ")}</h6>
    <div className="d-flex justify-content-between">
      <p>{ele.price} EGP</p>
      <p>
        <i className='fa fa-star rating-color'></i>
        {ele.ratingsAverage}
      </p>
    </div>
    </Link>
    <button onClick={()=> addProductToCart(ele.id)} className='btn bg-main text-white w-100'>Add To Cart</button>
    </div>
    
  </div>)}
  
</div> }
    
    
  </div> }
 
  
  </>
}
