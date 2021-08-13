import React from "react";
import { NavLink } from "react-router-dom"; // NavLink is like an anchor tag

const Header = () => {
  const activeStyle = { color: "#F15B2A" };
  return (
    <div>
      <nav>
        <NavLink to="/" activeStyle={activeStyle} exact>
          Home
        </NavLink>
        {" | "}
        <NavLink to="/courses" activeStyle={activeStyle}>
          Courses
        </NavLink>
        {" | "}
        <NavLink to="/about" activeStyle={activeStyle}>
          About
        </NavLink>
      </nav>
    </div>
  );
};

export default Header;
