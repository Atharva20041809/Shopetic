import React from 'react'
import { useLocation, useNavigate } from 'react-router'
import { useEffect,useState } from 'react'
import '../styles/product.css'
const Product = () => {
    const { state: ele } = useLocation();
    const [message, setMessage] = useState("");
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
    let navigate=useNavigate()
    useEffect(() => {
      const variable = document.getElementById("image_contain");
      const imageWidth = 500; // same as mine image width
      let index = 0;
      const interval = setInterval(() => {
        index++;
        if (index >= variable.children.length) index = 0;
        variable.scrollTo({
          left: index * imageWidth,
          behavior: "smooth",
        });
      }, 3000); // change every 3 seconds
  
      return () => clearInterval(interval);
    }, []);
    function handelcart(){
      let currentUser=JSON.parse(localStorage.getItem('currentUser'))
      const isAlreadyInCart = currentUser.cart.some(item => item[0].id === ele.id);
      if (isAlreadyInCart) {
        alert("This item is already in your cart.");
        return;
      }else{
        currentUser.cart.push([ele,1])
        localStorage.setItem('currentUser',JSON.stringify(currentUser))
        updateUsersInLocalStorage(currentUser)
        setMessage("Item added to cart!");
        setTimeout(() => setMessage(""), 2000);
      }
    }
  return (
    <div>
        <button className='back' onClick={()=>{navigate(-1)}}> 
            <img src="https://static.vecteezy.com/system/resources/previews/000/589/654/non_2x/vector-back-icon.jpg" alt="" height="20px" width="20px"/>
        </button>
        {message && <div className='cartmessage'>{message}</div>}
        <div className='singleproduct'>
          <div className='image_contain' id='image_contain'>
            {ele.images.map((wow)=>{
              return <img src={wow}/>
            })}
          </div>
          <div className="buy-details">
            <h1 className="product-title">{ele.title}</h1>
            <h2 className="product-brand">{ele.brand}</h2>
            <p className="product-category"><strong>Category:</strong> {ele.category}</p>
            <p className="product-description">{ele.description}</p>
            <div className="product-meta">
              <p><strong>Availability:</strong> {ele.availabilityStatus}</p>
              <p><strong>Price:</strong> ${ele.price}</p>
              <p><strong>Shipping Info:</strong> {ele.shippingInformation}</p>
              <p><strong>Return Policy:</strong> {ele.returnPolicy}</p>
              <p><strong>Warranty:</strong> {ele.warrantyInformation}</p>
              <p><strong>Dimensions:</strong> {ele.dimensions.width} x {ele.dimensions.height} x {ele.dimensions.depth} cm</p>
            </div>
            <button className="buy-now-btn" onClick={(e) => {navigate(`/buy`, { state: ele })}}>Buy Now</button>
            <button className='addtocart' onClick={handelcart}>Add to cart</button>
          </div>
          </div>
    </div>
  )
}

export default Product