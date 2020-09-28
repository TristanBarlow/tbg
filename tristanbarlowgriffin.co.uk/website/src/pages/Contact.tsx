import React from 'react'

export default function Contact () {
  return (
    <div className="tile is-parent">
      <div className="title"></div>
      <div className="tile is-child center-a col flex">
        <p className="title is-1  is-size-4-mobile">Contact</p>
        <div className="title">
          <p style={ { maxWidth: '520px' } } className="title is-5 is-size-7-mobile">If you do want to contact me for whatever reason send me an email. I will try to respond as soon as I can :)</p>
        </div>
        <p className="title is-4 is-size-6-mobile">tristanbarlowg@gmail.com</p>
      </div>
    </div>
  )
}