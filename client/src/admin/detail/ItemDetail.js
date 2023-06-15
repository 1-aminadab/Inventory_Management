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
  return (
    <div className='item-detail-container'>
      <section className='item-info-section'>
        <div onClick={()=>{
          console.log("clicked");
          setOpenHistory(true)}} className='list-widget'>
          <WidgetsIcon />
        </div>
        <div className='item-img'>
          <img src={Addis}alt="addis ababa" />
        </div>
        <div className='item-info'>
          <h4>Name:</h4>
          <h3>{`test`}</h3>
        </div>
        <div className='item-info'>
          <h4>total Quantity:</h4>
          <h3>{`test`}</h3>
        </div>
        <div className='item-info'>
          <h4>reamining Quantity:</h4>
          <h3>{`test`}</h3>
        </div>
        <div className='item-info'>
          <h4>Catagory:</h4>
          <h3>{`test`}</h3>
        </div>
        <div className='item-info'>
          <h4>Type:</h4>
          <h3>{`test`}</h3>
        </div>
        <div className='item-info'>
          <h4>Description:</h4>
          <h3>{`test`}</h3>
        </div>
        <div className='item-info'>
          <h4>Added by:</h4>
          <h3>{`test`}</h3>
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