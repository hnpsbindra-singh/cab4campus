import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api";

const RiderRideAccepted = () => {
  const { id } = useParams();
  const [ride, setRide] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRide = async () => {
      const res = await api.get(`/rides/${id}`);
      setRide(res.data.ride);
    };
    fetchRide();
  }, [id]);

  if (!ride) return <div className="page">Loading...</div>;

  return (
    <div className="page">
      <div className="card">
        <h2 className="title">Ride Accepted</h2>
        <div className="info-box success">
          You have accepted this ride.
        </div>
        <p>
          <strong>Student Name:</strong> {ride.student?.name}
        </p>
        <p>
          <strong>Student Phone:</strong> {ride.student?.phone}
        </p>
        <p>
          <strong>Pickup:</strong> {ride.pickupLocation}
        </p>
        <p>
          <strong>Drop:</strong> {ride.dropLocation}
        </p>
        <p>
          <strong>Fare:</strong> ₹{ride.fare}
        </p>

        <button
          className="btn btn-primary"
          onClick={() => navigate("/rider")}
        >
          Accept More Rides
        </button>
      </div>
    </div>
  );
};

export default RiderRideAccepted;
