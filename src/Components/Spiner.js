import React from 'react'
import loading from '../loading.gif'

export default function spinner() {
  
  return (
    <div className="text-center my-3" style={{marginTop:110}}>
      <img src={loading} alt="loading"/>
    </div>
  )  
}
