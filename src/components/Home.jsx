import React from 'react'
import '../styles/home.css'
import { useState,useEffect } from 'react'
import { useNavigate } from 'react-router'
import Productcard from './Productcard'
const Home = () => {
  let navigate=useNavigate()
  let [cartcounter,setcounter]=useState(0)
  let [products,setproducts]=useState([])
  let [page,setpage]=useState(1)
  const [loading, setLoading] = useState(false)
  async function fetcher() {
    setLoading(true)
    try{
      let fetching=await fetch(`https://dummyjson.com/products?limit=20&skip=${(page-1)*20}`)
      let data=await fetching.json()
      setproducts(data.products)
      setTimeout(() => {
        setLoading(false)
      }, 700);
    }catch(error){
      console.log(error)
    }
  }
  useEffect(()=>{
    let currentUser=JSON.parse(localStorage.getItem('currentUser'))
    setcounter(currentUser.cart.length)
  },[])
  useEffect(()=>{fetcher()},[page])
  useEffect(() => {
    const variable = document.getElementById("image_container");
    const imageWidth = 1000; // same as mine image width
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

  function handelprev(){
    setpage(page-1)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }
  function handelnext(){
    setpage(page+1)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }
  function updatecart(increase){
    if (increase){
      setcounter(cartcounter+1)
    }else{
      setcounter(cartcounter-1)
    }
  }
  function handelcart(){
    navigate('/cart')
  }

  return (
    <>
    <div className='container'>
      <div className="header">
      <div className='navbar'>
        <div className='home'>
          <img src="https://cdn-icons-png.flaticon.com/512/25/25694.png" alt="" height="40px" width="40px"/>
        </div>
        <div className='shopetic'>Shopetic</div>
        <div className='cart' onClick={handelcart}>
          <div className="cartcount">
          {cartcounter}
          </div>
          <img src="https://cdn-icons-png.flaticon.com/512/1413/1413908.png" alt="" height="40px" width="40px"/>
        </div> 
      </div>
      </div>
     
      <div className='image_container' id='image_container'>
        {
          products.map((ele,index)=>{
            // return <img src={"https://dummyimage.com/1600x400/333/fff&text=Slide+"+index}/>
            return <img src={'https://picsum.photos/seed/'+index+'/1600/900'}/>
          })
        }
      </div>
      {loading? <div className="loader"></div>
      :
      <div className='productcontainer'>
    {products.map((ele, index) => (
      <Productcard ele={ele} />
    ))}
   </div>}
    
   <div className="pagecontent">
   {!loading ?<><p>Page:{page}</p>
  {page>1? <button onClick={handelprev}>prev</button>:null}
  {page<10? <button onClick={handelnext}>next</button>:null}
  </>
  :null}
   </div>
    </div>
    </>
    
  )
}

export default Home
