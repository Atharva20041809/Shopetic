import React from 'react'
import { useNavigate } from 'react-router'
import { useEffect,useState } from 'react'
import '../styles/cart.css'
import Cartcard from './Cartcard'
const Cart = () => {
    let navigate=useNavigate();
    let [cartitems,setcartitems]=useState([])
    useEffect(()=>{update()},[])
    function update(){
      let currentUser=JSON.parse(localStorage.getItem('currentUser'))
      setcartitems(currentUser.cart)
    }
    function updateUsersInLocalStorage(currentUser) {
      let users = JSON.parse(localStorage.getItem("users")) || [];
      const userIndex = users.findIndex(user => user.username === currentUser.username);
      if (userIndex !== -1) {
        users[userIndex] = currentUser;
      } else {
        users.push(currentUser);
      }
      localStorage.setItem("users", JSON.stringify(users));
    }
    function handeldeselect(){
      let currentUser=JSON.parse(localStorage.getItem('currentUser'))
      setcartitems([])
      currentUser.cart=[]
      localStorage.setItem('currentUser',JSON.stringify(currentUser))
      updateUsersInLocalStorage(currentUser)
    }
    
    if(cartitems.length==0){
      return <div className="empty">
        <div className='shopingcart-other'>
          <h1>Shopping Cart</h1>
        </div>
        Please add something in cart.
        <button className='gotohome' onClick={()=>{navigate('/home')}}>
    Go to home
  </button>
      </div>
    }else{
      return <div className='shopingcart'>
          <h1>Shopping Cart</h1>
          <button onClick={handeldeselect}>Deselect all items</button>
          <div className="cartitems">
          {cartitems.map((arr)=>{
          return <Cartcard arr={arr} update={update}/>
        })}
      </div>
        </div>
        
    }
}

export default Cart