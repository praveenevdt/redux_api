import React from 'react'
import { Link } from "react-router-dom"

function Header()
{
  return (
    <React.Fragment>
         <nav className="navbar navbar-expand-lg bg-info">
  <div className="container">
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link to="/" className="nav-link active" aria-current="page">Home</Link>
        </li>
        <li className="nav-item">
          <Link to="/userlist" className="nav-link">Userlist</Link>
        </li>
      </ul>
    </div>
  </div>
</nav>
    </React.Fragment>
  );
}

export default Header;