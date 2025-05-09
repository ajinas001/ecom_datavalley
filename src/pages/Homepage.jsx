import React from 'react'
import { Navbar } from '../components/Navbar'
import Carousal from '../components/Carousal'
import { ProductDisplay } from '../components/Product-display'


function Homepage() {
  return (
    <div>
       <Navbar />
      <Carousal />
      <ProductDisplay />
    </div>
  )
}

export default Homepage
