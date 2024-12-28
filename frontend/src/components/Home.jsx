import React from 'react'
import Map from './Map'

const Home = () => {
  return (
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
  <div class="p-4 h-screen">
    <Map/>
  </div>
  <div class="p-4">Right Section</div>
</div>

  )
}

export default Home