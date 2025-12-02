import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

const RiderDashboard = ({ user }) => {
  const [rides, setRides] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const fetchRides = async () => {
    try {
      const res = await api.get("/rides/available/list/all");
      setRides(res.data.rides);
    } catch (err) {
      setError("Could not load rides.");
    }
  };

  useEffect(() => {
    fetchRides();
    const interval = setInterval(fetchRides, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleAccept = async (rideId) => {
    try {
      const res = await api.post(`/rides/${rideId}/accept`, {
        riderId: user._id,
      });
      navigate(`/rider/ride/${res.data.ride._id}`);
    } catch (err) {
      setError("Could not accept ride.");
    }
  };

  return (
    <div className="page">
      <div className="card">
        <h2 className="title">Available Rides</h2>
        <p className="subtitle">Click accept to take a ride</p>
        {error && <div className="alert">{error}</div>}

        {rides.length === 0 && (
          <div className="info-box">No pending rides right now.</div>
        )}

        <div className="ride-list">
          {rides.map((ride) => (
            <div key={ride._id} className="ride-item">
              <p>
                <strong>Pickup:</strong> {ride.pickupLocation}
              </p>
              <p>
                <strong>Drop:</strong> {ride.dropLocation}
              </p>
              <p>
                <strong>Student:</strong> {ride.student?.name} (
                {ride.student?.phone})
              </p>
              <p>
                <strong>Fare:</strong> ₹{ride.fare}
              </p>
              <button
                className="btn btn-primary"
                onClick={() => handleAccept(ride._id)}
              >
                Accept Ride
              </button>
            </div>
          ))}
        </div>

        <button className="btn btn-secondary" onClick={fetchRides}>
          Refresh
        </button>
      </div>
    </div>
  );
};

export default RiderDashboard;
