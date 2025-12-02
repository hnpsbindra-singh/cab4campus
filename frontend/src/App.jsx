import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import StudentDashboard from "./pages/StudentDashboard.jsx";
import StudentRideStatus from "./pages/StudentRideStatus.jsx";
import RiderDashboard from "./pages/RiderDashboard.jsx";
import RiderRideAccepted from "./pages/RiderRideAccepted.jsx";
import Footer from "./components/footer.jsx";

const App = () => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("campusUser");
    return saved ? JSON.parse(saved) : null;
  });

  const handleLogin = (u) => {
    setUser(u);
    localStorage.setItem("campusUser", JSON.stringify(u));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("campusUser");
  };

  return (
    <div className="app">
      <Navbar user={user} onLogout={handleLogout} />

      <Routes>
        <Route
          path="/"
          element={
            user ? (
              user.role === "student" ? (
                <Navigate to="/student" />
              ) : (
                <Navigate to="/rider" />
              )
            ) : (
              <LoginPage onLogin={handleLogin} />
            )
          }
        />

        <Route
          path="/student"
          element={
            user && user.role === "student" ? (
              <StudentDashboard user={user} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/student/ride/:id"
          element={
            user && user.role === "student" ? (
              <StudentRideStatus />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        <Route
          path="/rider"
          element={
            user && user.role === "rider" ? (
              <RiderDashboard user={user} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/rider/ride/:id"
          element={
            user && user.role === "rider" ? (
              <RiderRideAccepted />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
       <Footer />
    </div>
  );
};

export default App;
