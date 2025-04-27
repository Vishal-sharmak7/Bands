import React from 'react'
import Header from './components/Header'
import {Routes , Route} from "react-router-dom"
import Home from './pages/Home'
import Footer from './components/Footer'
import Booking from './pages/Booking'
import About from './pages/About'
import Event from './pages/Event'
import Store from './pages/Store'
import Song from './pages/Song'
import Booknow from './pages/Booknow'



const App = () => {
  return (
    <>
    <Header/>
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/booking' element={<Booking/>} />
      <Route path='/about' element={<About/>} />
      <Route path='/concerts' element={<Event/>} />
      <Route path='/store' element={<Store/>} />
      <Route path='/songs' element={<Song/>} />
      <Route path='/booknow' element={<Booknow/>} />
   </Routes>
   
   <Footer/>
    </>
  )
}

export default App