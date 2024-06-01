import React from 'react'
import Style from './CategorySlider.module.css'
import Slider from "react-slick";
import { useQuery } from 'react-query';
import axios from 'axios';


export default function CategorySlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1,
  };
 
  function getCategories(){
    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
  }
  let {isLoading , isError , data}= useQuery('categorySlider' ,getCategories )
  console.log(data?.data.data );
  return <>
  {data?.data.data ? 
  <div className='py-4'>
    <Slider {...settings}>
    {data?.data.data.map((category)=> <img key={category._id} className='w-100' height={200} src={category.image} />)}
    </Slider>
  </div>
     : ''}
  </>
}
