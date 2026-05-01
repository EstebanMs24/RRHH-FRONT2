import React from 'react'
import Navbar from '../Components/Navbar'
import Aspirantes from '../Components/Aspirantes'

export default function AspirantesPage({ user, onLogout }) {
  return (
    <>
      <Navbar user={user} onLogout={onLogout} />
      <Aspirantes />
    </>
  )
}
