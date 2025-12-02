import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

const StudentDashboard = ({ user }) => {
  const [pickup, setPickup] = useState("");
  const [drop, setDrop] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleCreateRide = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await api.post("/rides", {
        studentId: user._id,
        pickupLocation: pickup,
        dropLocation: drop,
      });
      const rideId = res.data.ride._id;
      navigate(`/student/ride/${rideId}`);
    } catch (err) {
      setError("Could not create ride.");
    }
  };

  return (
    <div className="page">
      <div className="card">
        <h2 className="title">Book E-Rickshaw</h2>
        <p className="subtitle">Fixed Fare: ₹10 inside campus</p>
        {error && <div className="alert">{error}</div>}

        <form className="form" onSubmit={handleCreateRide}>
          <textarea
            placeholder="Pickup location (e.g. Hostel J Gate)"
            value={pickup}
            onChange={(e) => setPickup(e.target.value)}
            required
          />
          <textarea
            placeholder="Drop location (e.g. COS Building)"
            value={drop}
            onChange={(e) => setDrop(e.target.value)}
            required
          />

          <button className="btn btn-primary" type="submit">
            Request Ride
          </button>
        </form>
      </div>
    </div>
  );
};

export default StudentDashboard;
