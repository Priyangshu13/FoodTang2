import React from 'react'
import './BookTable.css'

const BookTable = () => {
  return (
    <div className="Maincontainer">
      <div className="booktable">
        <select className='locationbox' name="Location" id="" >
          <option value="">Choose your Location</option>
          <option value="Kolkata">Kolkata</option>
          <option value="Durgapur">Durgapur</option>
          <option value="Asansol">Asansol</option>
        </select>
        <button className='booktable-btn'>Book Table</button>
      </div>
    </div>
  )
}

export default BookTable
