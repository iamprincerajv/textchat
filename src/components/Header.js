import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header className='d-flex justify-content-between'>
      <p className='ps-5 ms-5'>HelloChat</p>
      <Link className='me-5 mt-1' to='/login'>Log in</Link>
    </header>
  )
}

export default Header
