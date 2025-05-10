import React from 'react'
import { Navbar } from '../components/Navbar'
import Carousal from '../components/Carousal'
import { ProductDisplay } from '../components/Product-display'
import Footer from '../components/Footer'


function Homepage() {
  return (
    <div>
       <Navbar />
      <Carousal />
      <ProductDisplay />
      <Footer/>
    </div>
  )
}

export default Homepage
