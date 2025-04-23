import React from 'react'
import { useState,useEffect } from 'react'
import { useNavigate } from 'react-router'
const Cartcard = (props) => {
    let ele={...props.arr[0]}
    let [counter,setcounter]=useState(props.arr[1])
    let navigate=useNavigate()
    useEffect(() => {
        setcounter(props.arr[1]);
      }, [props.arr]);
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
    function decrease(){
        let currentUser=JSON.parse(localStorage.getItem('currentUser'))
        if (counter==1){
            let updatedCart = currentUser.cart.filter(item => item[0].id !== ele.id);
            currentUser.cart = [...updatedCart];
        }else{
            let updatedCart = currentUser.cart.map(item => {
                if (item[0].id === ele.id) {
                return [item[0], counter-1]; // update count
                }
                return item; // no change
            });
            currentUser.cart = [...updatedCart];
        }
        setcounter(counter-1)
        console.log(currentUser.cart)
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        updateUsersInLocalStorage(currentUser)
        props.update()
        navigate('/cart')
    }
    function increase(){
        let currentUser=JSON.parse(localStorage.getItem('currentUser'))
        let updatedCart = currentUser.cart.map(item => {
            if (item[0].id === ele.id) {
            return [item[0], counter+1]; // update count
            }
            return item; // no change
        });
        currentUser.cart = [...updatedCart];
        setcounter(counter+1)
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        updateUsersInLocalStorage(currentUser)
        props.update()
    }
  return (
    <div className='card'>
    <div className='photo'><img src={ele.thumbnail} alt=""/></div>
    <div className="content">
      <h3>{ele.title}</h3>
      <p>{ele.description}</p>
      <div className='count'>
        <button onClick={decrease} className='decrease'>
            <img src="https://cdn-icons-png.freepik.com/512/1345/1345874.png" alt=""/>
        </button>
        <span>
        {counter}
        </span>
        <button onClick={increase} className='increase'>+</button>
      </div>
    </div>
</div>
  )
}

export default Cartcard