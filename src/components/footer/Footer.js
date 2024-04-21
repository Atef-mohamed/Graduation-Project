import React from "react";
import FacebookIcon from "../../assets/Facebook.svg";
import InstagramIcon from "../../assets/Instagram Circle.svg";
import XIcon from "../../assets/TwitterX.svg";
import logoIcon from "../../assets/Asset 6xxxhdpi 3.png";
import { useNavigate } from "react-router-dom";
import "./footer.css";
function Footer() {
  const navigate = useNavigate();
  return (
    <>
      <div id="sub-footer">
        <div className="container foot d-flex  flex-md-row  justify-content-between">
          <div className="logo-icon   ">
            <img
              src={logoIcon}
              alt=""
              onClick={() => navigate("/")}
              style={{ cursor: "pointer" }}
            />
          </div>
          {/* <p className="copyRight  col-sm-12 col-md-4">
              &copy;2024
              <span> 5A </span>
              All Right Reserved
            </p> */}
          <div className="social-icon  ">
            <a href="#/">
              <img src={FacebookIcon} alt="" id="facebook" />
            </a>
            <a href="#/">
              <img src={InstagramIcon} alt="" />
            </a>
            <a href="#/">
              <img src={XIcon} alt="" />
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
