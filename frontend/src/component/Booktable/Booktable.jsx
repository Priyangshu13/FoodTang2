
 import React from 'react'
import './Booktable.css'
import { Link } from 'react-router-dom';

const Booktable = () => {

  return (
    <div className="Maincontainer">
      <div className="booktable">
        <select className='locationbox' name="Location" id="" >
          <option value="">Choose your Location</option>
          <option value="Kolkata">Kolkata</option>
          <option value="Durgapur">Durgapur</option>
          <option value="Asansol">Asansol</option>
        </select>
        {/* <button className='booktable-btn'>Book Table</button> */}

        <Link to="/bookingform">

          <button className="booktable-btn">
            Book Table
          </button>

        </Link>
      </div>
    </div>
  )

}

export default Booktable
