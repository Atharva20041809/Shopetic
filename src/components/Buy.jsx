import React from 'react'
import { useLocation, useNavigate } from 'react-router'
const Buy = (props) => {
  const navigate=useNavigate();
    const { state: ele } = useLocation();
    console.log(ele)
  return (
    <div className="order-success">
  <img
    src="https://media.istockphoto.com/id/1133442802/vector/green-checkmark-vector-illustration.jpg?s=612x612&w=0&k=20&c=NqyVOdwANKlbJNqbXjTvEp2wIZWUKbfUbRxm9ROPk6M="
    alt="Success"
    width="50px"
    height="50px"
  />
  <span>Order Placed, thank you!</span>
  <button className='gotohome' onClick={()=>{navigate('/home')}}>
    Go to home
  </button>
</div>

  )
  
}

export default Buy