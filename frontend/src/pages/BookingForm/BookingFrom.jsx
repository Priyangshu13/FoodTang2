import React, { useState } from 'react';
import './BookingForm.css';

const BookingForm = () => {
  const [city, setCity] = useState('');
  const [personCount, setPersonCount] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!city || !personCount || !date || !time) {
      alert('Please fill in all fields.');
      return;
    }

    try {
      const response = await fetch('http://localhost:4000/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          city,
          personCount: personCount === '4+' ? 4 : parseInt(personCount),
          date,
          time
        })
      });

      const data = await response.json();

      if (response.ok) {
        alert('Booking successful!');
        // Reset form
        setCity('');
        setPersonCount('');
        setDate('');
        setTime('');
      } else {
        alert(data.message || 'Booking failed');
      }
    } catch (error) {
      console.error('Error submitting booking:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div className="Main_bookingcontainer">
      <div className="booking-container">
        <div className="form-section">
          <div className="Formlabels">
            <h1 className="logo">FOODTANG</h1>

            <div className="form-group">
              <label>CITY</label>
              <select value={city} onChange={(e) => setCity(e.target.value)}>
                <option value="">---- SELECT YOUR CITY ----</option>
                <option value="Kolkata">Kolkata</option>
                <option value="Durgapur">Durgapur</option>
                <option value="Asansol">Asansol</option>
              </select>
            </div>

            <div className="form-group">
              <label>PERSON</label>
              <select value={personCount} onChange={(e) => setPersonCount(e.target.value)}>
                <option value="">---- SELECT NUMBER OF PERSON ----</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4+">4+</option>
              </select>
            </div>

            <div className="form-group">
              <label>CHOOSE DATE</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>CHOOSE TIME</label>
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </div>
          </div>

          <div className="bookbtn">
            <button className="book-button" onClick={handleSubmit}>
              BOOK TABLE
            </button>
          </div>
        </div>

        <div className="image-section">
          <p className="image-placeholder">Image here</p>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;
