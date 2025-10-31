import React from 'react'
import ImageSlider from '../components/ImageSlider'
import ProductGrid from '../components/ProductGrid'
import MobileApp from '../components/Mobile_Home'
function Home() {
  return (
    <>
     <ImageSlider />
      {/* Your page content goes here */}
      {/* Mobile view: show simplified mobile app component */}
      <div className="md:hidden block text-center">
        <MobileApp />
      </div>
        <ProductGrid /></>
  )
}

export default Home