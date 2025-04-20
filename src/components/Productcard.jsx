import React from 'react'
import '../styles/productcard.css'
import { useState,useEffect } from 'react'
import { useNavigate } from 'react-router'
const Productcard = (props) => {
  let navigate=useNavigate()
    let ele={...props.ele}
    return <>
        <div className="home-card" onClick={() => navigate(`/product`, { state: ele })}>
          <img src={ele.thumbnail} alt={ele.title} className="home-card-img" />
          <div className="home-card-info">
            <h3 className="home-card-title">{ele.title}</h3>
            <p className="home-card-desc">{ele.description}</p>
            <div className="home-card-price-row">
              <span className="home-card-price">${ele.price.toFixed(2)}</span>
              <span className="home-card-discount">-{ele.discountPercentage}%</span>
            </div>
            <button className='home-card-buy-btn' onClick={(e) => {e.stopPropagation(); navigate(`/buy`, { state: ele })}}>Buy now</button>
          </div>
        </div>
</>

}

export default Productcard