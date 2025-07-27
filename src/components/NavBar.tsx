"use client";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function NavBar() {
  return (
    <nav className="navbar bg-body-tertiary">
      <div className="container">
        <div className="nav-elements">
          <ul>
            <li>
              <Link to="/expense-tracker">Home</Link>
            </li>
            <li>
              <Link to="/stock-tracker">Stocks</Link>
            </li>
            <li>
              <Link to="/about-me">About Me</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
