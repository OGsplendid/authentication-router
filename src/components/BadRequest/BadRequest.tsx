import React from 'react'
import { Link } from 'react-router-dom'

export const BadRequest = () => {
  return (
    <div className='intro-wrapper'>
        <Link to='/'><button>Main page</button></Link>
        <div className='intro'>
            <p className='intro-text'>404 not found</p>
        </div>
    </div>
  )
}
