import React, { useState } from 'react'
import Style from './Register.module.css'
import { useFormik } from 'formik'

import * as Yup from 'yup'
import axios from 'axios'
import  {useNavigate}   from  'react-router-dom'
import { FidgetSpinner } from 'react-loader-spinner'




export default function Register() {
  let navigate = useNavigate()
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  async function submitRegister(values){
    setIsLoading(true)
   let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`,values)
   .catch((err) => {
    setIsLoading(false)
    setError(err.response.data.message)
  })
   if (data.message === 'success'){
    setIsLoading(false)
      navigate('/login')
   }
  }

  let phoneRegExp = /^01[0125][0-9]{8}$/

  let validationSchema = Yup.object({
    name:Yup.string().min(3,'name minlength is 3').max(10,'name maxlength is 10').required('name is required'),
    email:Yup.string().email('email is invalid').required('emai is required'),
    phone:Yup.string().matches(phoneRegExp, 'phone is invalid').required('phone is requied'),
    password:Yup.string().matches(/^[A-Z][a-z0-9]{5,10}$/,'password start with uppercase').required('password is required'),
    rePassword:Yup.string().oneOf([Yup.ref('password')],'password and repassword dont match ').required('rePassword is required')
  })

  let formik = useFormik({
    initialValues:{
      name:"",
      email:"",
      password:"",
      rePassword:"",
      phone:""
    },validationSchema,
    onSubmit:submitRegister
  })

  return <>
  <div className="w-75 mx-auto py-4">
    {error !== null ?<div className='alert alert-danger'>{error}</div> : '' }
    
    <h2 className='text-center'>Register Now</h2>
    <form onSubmit={formik.handleSubmit}>
      <label htmlFor="name">Name :</label>
      <input className='form-control mb-2' id='name' name="name" type='text' value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} />
      {formik.errors.name && formik.touched.name ? <div className='alert mt-2 p-2 alert-danger'>{formik.errors.name}</div>:''}

      <label htmlFor="email">Email :</label>
      <input className='form-control mb-2' id='email' name="email" type='email' value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} />
      {formik.errors.email && formik.touched.email ? <div className='alert mt-2 p-2 alert-danger'>{formik.errors.email}</div>:''}

      <label htmlFor="phone">Phone :</label>
      <input className='form-control mb-2' id='phone' name="phone" type='tel' value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} />
      {formik.errors.phone && formik.touched.phone ? <div className='alert mt-2 p-2 alert-danger'>{formik.errors.phone}</div>:''}


      <label htmlFor="password">Password :</label>
      <input className='form-control mb-2' id='password' name="password" type='password' value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} />
      {formik.errors.password && formik.touched.password ? <div className='alert mt-2 p-2 alert-danger'>{formik.errors.password}</div>:''}


      <label htmlFor="rePassword">rePassword :</label>
      <input className='form-control mb-2' id='rePassword' name="rePassword" type='password' value={formik.values.rePassword} onChange={formik.handleChange} onBlur={formik.handleBlur} />
      {formik.errors.rePassword && formik.touched.rePassword ? <div className='alert mt-2 p-2 alert-danger'>{formik.errors.rePassword}</div>:''}

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
            <button disabled={!(formik.isValid &&formik.dirty)} type='submit' className='btn bg-main text-white mt-2 '>Submit</button>

       }
     
      
    
    </form>

  </div>
 
  </>
}
