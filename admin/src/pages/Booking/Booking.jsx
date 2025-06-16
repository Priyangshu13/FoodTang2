import React, { useEffect, useState } from 'react';
import './Booking.css';

const Booking = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await fetch('http://localhost:4000/api/booking');
      if (!res.ok) throw new Error('Failed to fetch bookings');
      const data = await res.json();
      setBookings(data);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this booking?')) return;
    try {
      const res = await fetch(`http://localhost:4000/api/booking/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete booking');
      fetchBookings();
    } catch (err) {
      console.error(err);
      alert('Error deleting booking: ' + err.message);
    }
  };

  const handleEdit = async (id) => {
    const newStatus = prompt('Enter new status (pending, confirmed, cancelled):');
    if (!newStatus || !['pending', 'confirmed', 'cancelled'].includes(newStatus)) {
      alert('Invalid status');
      return;
    }
    try {
      const res = await fetch(`http://localhost:4000/api/booking/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      if (!res.ok) throw new Error('Failed to update booking');
      fetchBookings();
    } catch (err) {
      console.error(err);
      alert('Error updating booking: ' + err.message);
    }
  };

  return (
    <div className="admin-dashboard">
      <h1>Booking Dashboard</h1>
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && (
        <table>
          <thead>
            <tr>
              <th>City</th>
              <th>Persons</th>
              <th>Date</th>
              <th>Time</th>
              <th>Status</th>
              <th>Created At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.length > 0 ? (
              bookings.map((b) => (
                <tr key={b._id}>
                  <td>{b.city}</td>
                  <td>{b.personCount}</td>
                  <td>{new Date(b.date).toLocaleDateString()}</td>
                  <td>{b.time}</td>
                  <td>{b.status}</td>
                  <td>{new Date(b.createdAt).toLocaleString()}</td>
                  <td>
                    <button onClick={() => handleEdit(b._id)}>Edit</button>{' '}
                    <button onClick={() => handleDelete(b._id)}>Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7">No bookings found</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Booking;
