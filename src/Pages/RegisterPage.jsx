import React from 'react'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'

export default function RegisterPage({user, onLogout}) {
  return (
    <>
        <Navbar user={user} onLogout={onLogout}/>

          


        <Footer/>
    </>
  )
}
