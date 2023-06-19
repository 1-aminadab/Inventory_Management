import React, { useEffect, useState } from 'react'
import './Detail.css'
import Addis from '../../assets/addis.jpeg'
import OrderHistory from '../history/OrderHistory'
import WidgetsIcon from '@mui/icons-material/Widgets';
function itemDetail() {
     const [openHistory, setOpenHistory] = useState(false)
     const changeDirection = (send)=>{
      setOpenHistory(send)
     }
     const image = "https://www.tradeinn.com/f/13824/138245554/hp-250-15.6-r3-3250u-8gb-256gb-ssd-laptop.jpg"
  return (
    <div className='item-detail-container'>
      <section className='item-info-section'>
        <div onClick={()=>{
          console.log("clicked");
          setOpenHistory(true)}} className='list-widget'>
          <WidgetsIcon />
        </div>
        <div className='item-img'>
          <img src={image}alt="addis ababa" />
        </div>
        <div className='item-info'>
          <h4>Name:</h4>
          <h3>{`test`}</h3>
        </div>
        <div className='item-info'>
          <h4>total Quantity:</h4>
          <h3>Hp</h3>
        </div>
        <div className='item-info'>
          <h4>reamining Quantity:</h4>
          <h3>3</h3>
        </div>
        <div className='item-info'>
          <h4>Catagory:</h4>
          <h3>Electronic</h3>
        </div>
        <div className='item-info'>
          <h4>Type:</h4>
          <h3>C</h3>
        </div>
        <div className='item-info'>
          <h4>Description:</h4>
          <h3>No Description</h3>
        </div>
        <div className='item-info'>
          <h4>Added by:</h4>
          <h3>Amanuel Tadesse</h3>
        </div>
      </section>
       <section className='item-detail-section'>
           <div className='order-history-table'>
            <OrderHistory change = {changeDirection} open={openHistory}/>
           </div>
       </section>
    </div>
  )
}

export default itemDetail