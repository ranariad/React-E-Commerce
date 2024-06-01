import React, { useContext } from 'react'
import Style from './Profile.module.css'
import { jwtDecode } from 'jwt-decode'
import { UserContext } from '../../Context/UserContext'


export default function Profile() {

  let {userData} = useContext(UserContext) 
  // let encodedToken = jwtDecode(localStorage.getItem("userToken"))
  // let decodedToken = jwtDecode(encodedToken)
  return <>
  <h1>Hello : { userData?.name}</h1>
  <h1>Hello : { userData?.email}</h1>

  </>
}
