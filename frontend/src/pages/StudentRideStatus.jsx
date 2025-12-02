import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api";

const StudentRideStatus = () => {
  const { id } = useParams();
  const [ride, setRide] = useState(null);
  const [message, setMessage] = useState("");

  const fetchRide = async () => {
    const res = await api.get(`/rides/${id}`);
    setRide(res.data.ride);
  };

  useEffect(() => {
    fetchRide();
    const interval = setInterval(fetchRide, 4000); // simple polling
    return () => clearInterval(interval);
  }, [id]);

  const handlePayment = async (method) => {
    await api.post(`/rides/${id}/payment`, { method });
    await fetchRide();
    setMessage("Ride booked successfully!");
  };

  if (!ride) return <div className="page">Loading...</div>;

  const rider = ride.rider;

  return (
    <div className="page">
      <div className="card">
        <h2 className="title">Ride Status</h2>
        <p className="subtitle">
          Fare: ₹{ride.fare} | Status: {ride.status.toUpperCase()}
        </p>
        <p>
          <strong>Pickup:</strong> {ride.pickupLocation}
        </p>
        <p>
          <strong>Drop:</strong> {ride.dropLocation}
        </p>

        {ride.status === "pending" && (
          <div className="info-box">Waiting for a rider to accept…</div>
        )}

        {ride.status === "accepted" && rider && (
          <>
            <div className="info-box success">
              Rider found! Check details below.
            </div>
            <p>
              <strong>Rider Name:</strong> {rider.name}
            </p>
            <p>
              <strong>Rider Phone:</strong> {rider.phone}
            </p>

            {!ride.paymentMethod && (
              <div className="btn-row">
                <button
                  className="btn btn-primary"
                  onClick={() => handlePayment("online")}
                >
                  Pay Online (₹10)
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() => handlePayment("cash")}
                >
                  Pay Cash on Spot (₹10)
                </button>
              </div>
            )}

            {ride.paymentMethod && (
              <div className="info-box success">
                Booked Ride – Payment: {ride.paymentMethod.toUpperCase()}
              </div>
            )}
          </>
        )}

        {message && <div className="info-box success">{message}</div>}
      </div>
    </div>
  );
};

export default StudentRideStatus;
