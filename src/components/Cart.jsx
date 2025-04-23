import React from 'react'
import { useNavigate } from 'react-router'
import { useEffect,useState } from 'react'
import '../styles/cart.css'
import Cartcard from './Cartcard'
const Cart = () => {
    let navigate=useNavigate();
    let [cartitems,setcartitems]=useState([])
    let [cartcounter,setcounter]=useState(0)
    useEffect(()=>{update()},[])
    function update(){
      let currentUser=JSON.parse(localStorage.getItem('currentUser'))
      setcartitems(currentUser.cart)
      setcounter(currentUser.cart.length)
    }
    useEffect(()=>{
      let currentUser=JSON.parse(localStorage.getItem('currentUser'))
      setcounter(currentUser.cart.length)
    },[])
    function handelcartsec(){
      navigate('/cart')
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
      setcounter(currentUser.cart.length)
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
      return <div className='main'>
         {/* ****************************** */}
         <div className="header">
      <div className='navbar'>
        <div className='home' onClick={()=>{navigate('/home')}}>
          <img src="https://cdn-icons-png.flaticon.com/512/25/25694.png" alt="" height="40px" width="40px"/>
        </div>
        <div className='shopetic'>Shopetic</div>
        <div className='cart' onClick={handelcartsec}>
          <div className="cartcount">
          {cartcounter}
          </div>
          <img src="https://cdn-icons-png.flaticon.com/512/1413/1413908.png" alt="" height="40px" width="40px"/>
        </div> 
      </div>
      </div>
        {/* ****************************** */}
        <div className='shopingcart'>
          <h1>Shopping Cart</h1>
          <button onClick={handeldeselect}>Deselect all items</button>
          <div className="cartitems">
          {cartitems.map((arr)=>{
          return <Cartcard arr={arr} update={update}/>
        })}
      </div>
      </div>
      </div>
    }
}

export default Cart