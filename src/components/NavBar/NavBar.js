import React, { useRef, useState } from "react";
import "./NavBar.css";
// import logo from "../../assets/logo.svg";
import logo from "../../assets/Asset 6xxxhdpi 3.png";
import { Link } from "react-router-dom";
function NavBar() {
  const navToggle = useRef();
  const navMenu = useRef();
  const navClose = useRef();
  const navLink = useRef();
  const [activeLink, setActiveLink] = useState(null);
  const handelToggle = () => {
    if (navToggle.current) {
      navMenu.current.classList.add("show-menu");
      navToggle.current.classList.add("hide");
    }
  };
  const handelClose = () => {
    if (navClose.current) {
      navMenu.current.classList.remove("show-menu");
      navToggle.current.classList.remove("hide");
    }
  };
  const linkAction = (index) => {
    setActiveLink(index);
    if (navMenu.current) {
      navMenu.current.classList.remove("show-menu");
      navToggle.current.classList.remove("hide");
    }
  };

  return (
    <>
      <header className="header" id="header">
        <nav className="nav containeer">
          <div className="logo">
            <a href="#home" className="nav-logo">
              <img src={logo} alt="logo" />
            </a>
          </div>
          <div className="nav-menu" id="nav-menu" ref={navMenu}>
            <ul className="nav-list">
              <li className="nav-item">
                <a
                  href="#home"
                  ref={navLink}
                  className={`nav-link ${activeLink === 0 ? "activeNavBar" : ""}`}
                  onClick={() => linkAction(0)}
                >
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a
                  href="#services"
                  className={`nav-link ${activeLink === 1 ? "activeNavBar" : ""}`}
                  onClick={() => linkAction(1)}
                  ref={navLink}
                >
                  Services
                </a>
              </li>
              <li className="nav-item">
                <a
                  href="#contactUS"
                  ref={navLink}
                  className={`nav-link ${activeLink === 3 ? "activeNavBar" : ""}`}
                  onClick={() => linkAction(3)}
                >
                  Contact Us
                </a>
              </li>
              <span className="line"></span>
              <div className="nav-btn">
                <div className="signUp">
                  <Link to="/signUp" className="button text-white">
                    Sign Up
                  </Link>
                </div>
                <div className="signIn">
                  <Link to="/signIn" className="sign">
                    Sign in
                  </Link>
                </div>
              </div>
            </ul>
            <div
              className="nav-close"
              id="nav-close"
              ref={navClose}
              onClick={handelClose}
            >
              <i className="fa-solid fa-x"></i>
            </div>
          </div>
          <div className="nav-toggle" ref={navToggle} onClick={handelToggle}>
            <i className="fa-solid fa-bars"></i>
          </div>
        </nav>
      </header>
    </>
  );
}

export default NavBar;
