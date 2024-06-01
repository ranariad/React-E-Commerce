import React, { useContext } from 'react'
import Style from './ProductDetails.module.css'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useQuery } from 'react-query'
import Slider from "react-slick";
import { CartContext } from '../../Context/CartContext'
import toast from 'react-hot-toast';



export default function ProductDetails() {
  let {addToCart , setNumOfCartItems} = useContext(CartContext)
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay:true
  };
  let params = useParams()
  function getProductDetails(id){
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
  }
  
  async function addCart(id){
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
  }

  let {isLoading , isError , data} = useQuery('productdetails' ,()=>getProductDetails(params.id))
  console.log(data?.data.data);
  
 
  return <>
  {data?.data.data ? <div className='row py-2 align-items-center '>
    <div className="col-md-4">
      <Slider {...settings}>
        {data?.data.data.images.map((ele,index)=>  <img className='w-100' key={index} src={ele} alt='' />)}
      </Slider>    
    </div>
    <div className="col-md-8">
      <h2 className="h5">{data?.data.data.title}</h2>
      <p>{data?.data.data.description}</p>
      <h6 className='text-main'>{data?.data.data.category.name}</h6>
      <h6 className='text-main'>Price :{data?.data.data.price}</h6>
      <div className="d-flex justify-content-between">
        <span>ratingsQuantity :{data?.data.data.ratingsQuantity}</span>
        <span><i className='fas fa-star rating-color'></i> {data?.data.data.ratingsAverage}</span>
      </div>
      <button onClick={()=> addCart(data?.data.data._id)} className='btn bg-main text-white mt-2 w-100 '>Add to Cart</button>
    </div>
  </div> : ''}
  </>
}
