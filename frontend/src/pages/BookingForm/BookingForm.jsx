import React from 'react';
import './BookingForm.css';

const BookingForm = () => {
    return (
    <div className='Main_bookingcontainer'>
        <div className="booking-container">
            <div className="form-section">
                <h1 className="logo">FOODTANG</h1>
                <div className="form-group">
                <label>CITY</label>
                <select>
                    <option>---- SELECT YOUR CITY ----</option>
                        <option value="Kolkata">Kolkata</option>
                        <option value="Durgapur">Durgapur</option>
                        <option value="Asansol">Asansol</option>
                </select>
                </div>
                <div className="form-group">
                    <label>PERSON</label>
                    <select>
                        <option>---- SELECT NUMBER OF PERSON ----</option>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4+</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>CHOOSE DATE</label>
                    <input type="date" />
                </div>
                <div className="form-group">
                    <label>CHOOSE TIME</label>
                    <input type="time" />
                </div>
                <button className="book-button">BOOK TABLE</button>
            </div>
            <div className="image-section">
                <p className="image-placeholder">Image here</p>
            </div>
        </div>
    </div>
    );
};

export default BookingForm;

