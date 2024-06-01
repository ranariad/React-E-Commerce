import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let CartContext = createContext()
let userToken = localStorage.getItem('userToken')
let headers = {
    token:userToken
}

function addToCart(id){
    return axios.post(`https://ecommerce.routemisr.com/api/v1/cart`,
    {
        productId:id
    },
    {
        headers
    }).then((response)=> response)
    .catch((error)=> error )
}

function getLockedUserCart(){
    return axios.get(`https://ecommerce.routemisr.com/api/v1/cart`,
    {
        headers
    }).then((response)=> response)
    .catch((error)=> error )
}

function removeCartitems(productId){
   return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId} ` , {headers})
    .then((response)=> response)
    .catch((err)=> err)
}

function updateProductQuantity(productId , count){
   return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}` , 
    {count} , {headers})
    .then((response)=> response)
    .catch((err)=> err)
}



export default function CartContextProvider(props){
    // 66222a8bbe8b523235dc8195
function onlinePayment(shippingAddress){
    return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartID}?url=http://localhost:3000
     ` , 
    {shippingAddress} , {headers})
    .then((response)=> response)
    .catch((err)=> err)
}
const [cartID, setCartID] = useState(null)
const [numOfCartItems, setNumOfCartItems] = useState(null)

async function getInitialCart(){
    let {data} = await getLockedUserCart()
    setNumOfCartItems( data?.numOfCartItems)
    setCartID(data?.data._id)

}

    useEffect(()=>{
        getInitialCart()
    },[])
    return <CartContext.Provider value={{addToCart , getLockedUserCart , removeCartitems , updateProductQuantity , onlinePayment , numOfCartItems, setNumOfCartItems}}>
        {props.children}
    </CartContext.Provider>
}