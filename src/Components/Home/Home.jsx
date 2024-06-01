import React, { useContext } from 'react'
import Style from './Home.module.css'
import { CounterContext } from '../../Context/CounterContext'
import FeatureProducts from '../FeatureProducts/FeatureProducts'
import CategorySlider from '../CategorySlider/CategorySlider'
import MainSlider from '../MainSlider/MainSlider'




export default function Home() {
  return <>
     <MainSlider />
    <CategorySlider />
    <FeatureProducts />
  
  </>
}
