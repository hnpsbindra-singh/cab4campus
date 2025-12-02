import React from "react";

const Navbar = ({ user, onLogout }) => {
  return (
    <header className="nav">
      <div className="nav-logo">CampusCab @ Thapar</div>
      <div className="nav-right">
        {user && (
          <>
            <span className="nav-user">
              {user.name} ({user.role})
            </span>
            <button className="btn btn-outline" onClick={onLogout}>
              Logout
            </button>
          </>
        )}
      </div>
    </header>
  );
};

export default Navbar;
