import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Navigation extends Component {
  render () {
    return (
      <div className='nav'>
        <div className='nav-logo'>
          <Link to='/'>Home</Link>
        </div>
        <div className='nav-links'>
          <Link to='/add'>Add an article</Link>
          <Link to='/search'>Search articles</Link>
        </div>
      </div>
    )
  }
}

export default Navigation
