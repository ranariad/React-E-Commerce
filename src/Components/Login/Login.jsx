import React, { useContext, useState } from 'react'
import Style from './Login.module.css'
import { useFormik } from 'formik'

import * as Yup from 'yup'
import axios from 'axios'
import  {Link, useNavigate}   from  'react-router-dom'
import { FidgetSpinner } from 'react-loader-spinner'
import { UserContext } from '../../Context/UserContext'





export default function Login() {

  let {setUserToken , setUserData} = useContext(UserContext)
  let navigate = useNavigate()
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  async function loginSubmit(values){
    setIsLoading(true)
   let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`,values)
   .catch((err) => {
    setIsLoading(false)
    setError(err.response.data.message)
  })
   if (data.message === 'success'){
    setIsLoading(false)
    localStorage.setItem('userToken', data.token)
    setUserToken(data.token)
    setUserData(data.user)
    navigate('/')
   }
  }


  let validationSchema = Yup.object({
    email:Yup.string().email('email is invalid').required('emai is required'),
    password:Yup.string().matches(/^[A-Z][a-z0-9]{5,10}$/,'password start with uppercase').required('password is required'),
  })

  let formik = useFormik({
    initialValues:{
      name:"",
      email:"",
      password:"",
      rePassword:"",
      phone:""
    },validationSchema,
    onSubmit:loginSubmit
  })

  return <>
  <div className="w-75 mx-auto py-4">
    {error !== null ?<div className='alert alert-danger'>{error}</div> : '' }
    
    <h2 className='text-center'>Login Now</h2>
    <form onSubmit={formik.handleSubmit}>

      <label htmlFor="email">Email :</label>
      <input className='form-control mb-2' id='email' name="email" type='email' value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} />
      {formik.errors.email && formik.touched.email ? <div className='alert mt-2 p-2 alert-danger'>{formik.errors.email}</div>:''}



      <label htmlFor="password">Password :</label>
      <input className='form-control mb-2' id='password' name="password" type='password' value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} />
      {formik.errors.password && formik.touched.password ? <div className='alert mt-2 p-2 alert-danger'>{formik.errors.password}</div>:''}



      {isLoading ?<button type='button'  className='btn bg-main text-white mt-2 '>
        
        <FidgetSpinner
        visible={true}
        height="30"
        width="80"
        ariaLabel="fidget-spinner-loading"
        wrapperStyle={{}}
        wrapperClass="fidget-spinner-wrapper"
        />
      </button> : 
           <>
            <div className='d-flex align-items-center'>
            <button disabled={!(formik.isValid &&formik.dirty)} type='submit' className='btn bg-main text-white mt-2 '>Login</button>
            <Link className='btn' to={"/register"}>Register Now</Link>
            </div>
           </>

       }
     
      
    
    </form>

  </div>
 
  </>
}

