import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router'
import '../styles/signup.css'
const Signup = () => {
  const navigate=useNavigate();
  let [userdata,setuserdata]=useState({username:'',email:'',password:'',cart:[]});
  function handelusername(event){
    let newobj={...userdata}
    newobj.username=event.target.value 
    setuserdata(newobj)
  }
  function handelemail(event){
    let newobj={...userdata}
    newobj.email=event.target.value 
    setuserdata(newobj)
  }
  function handelpassword(event){
    let newobj={...userdata}
    newobj.password=event.target.value
    setuserdata(newobj)
  }
  function handelclick(event){
    event.preventDefault();
    if(userdata.password.length==0 || userdata.email.length==0 || userdata.username.length==0 || !userdata.email.includes('@gmail.com')){
      if(!userdata.email.includes('@gmail.com')){
        alert('email must include @gmail.com')
      }else{
        alert("Please fill the details properly")
      }
    }else{
      let users=JSON.parse(localStorage.getItem("users"))
      users.push(userdata)
      localStorage.setItem("users",JSON.stringify(users))
      localStorage.setItem("currentUser", JSON.stringify(userdata));
      navigate('/home')
    }
  }
  return (
    <div className='signup'>
      <form>
        <h2>Sign Up</h2>
        <input type="text" placeholder='Username' onChange={handelusername}/>
        <input type="email" placeholder='Email' onChange={handelemail}/>
        <input type="password" placeholder='Password' onChange={handelpassword}/>
        <button onClick={handelclick}>
          Sign Up
        </button>
        <div className='login-toggle'>
          Already a user? <NavLink to='/logout'>Login</NavLink>
        </div>
      </form>
    </div>
  )
}

export default Signup