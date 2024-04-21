import React, { useRef } from "react";
import NavBar from "../NavBar/NavBar";
import "./Main.css";
import { Link } from "react-router-dom";
import serv1 from "../../assets/serv1.png";
import serv2 from "../../assets/serv2.png";
import serv3 from "../../assets/serv3.png";
import phoneIcon from "../../assets/phone-call.svg";
import mailIcon from "../../assets/mail.svg";
import FacebookIcon from "../../assets/Facebook.svg";
import InstagramIcon from "../../assets/Instagram Circle.svg";
import XIcon from "../../assets/TwitterX.svg";
import logoIcon from "../../assets/Asset 6xxxhdpi 3.png";
const MainPage = () => {
  const btnBackToTop = useRef(null);
  window.onscroll = () => {
    if (btnBackToTop.current) {
      if (window.scrollY >= 100) {
        btnBackToTop.current.classList.add("show");
      } else {
        btnBackToTop.current.classList.remove("show");
      }
    }
  };
  const handelClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <>
      <NavBar />
      {/* landing */}
      <section className="landing" id="home">
        <div className="overlay"></div>
        <div className="text container">
          <div className="content">
            <h1>
              The first sports <br /> platform for
              <span className="txt-color"> freelance work</span>
            </h1>
            <p>
              A platform that helps the captain follow up on his clients online
              <br /> through us by providing him with tools and reports to
              follow up on clients.
            </p>
          </div>
          <div className="button-start">
            <Link to={""} className="btn-col">
              Start Now
            </Link>
          </div>
        </div>
      </section>
      {/* our services */}
      <div className="ourServices" id="services">
        <div className="container">
          <div className="main-heading">
            <h2>OUR SERVICES</h2>
          </div>
          <div className="services-container container">
            <div className="serv-box container row text-center text-lg-start">
              <div className="txt-ser col-md-6 col-sm-12">
                <h2>
                  Follow up on your <br /> clients
                </h2>
                <p>Customer follow-up service through one platform</p>
              </div>
              <div className="ser-img col-md-6 col-sm-12">
                <img src={serv1} alt="" />
              </div>
            </div>
            <div
              className="serv-box container  row text-center text-lg-start"
              dir="rtl"
            >
              <div className="txt-ser col-md-6 col-sm-12">
                <h2>Gymnastics</h2>
                <p>
                  Through the platform, you can provide all types of exercises
                  that the client will need, along with full details of the
                  exercise
                </p>
              </div>
              <div className="ser-img col-md-6 col-sm-12">
                <img src={serv2} alt="" />
              </div>
            </div>
            <div className="serv-box container row text-center text-lg-start">
              <div className="txt-ser col-md-6 col-sm-12">
                <h2>Reports</h2>
                <p>
                  You can provide monthly reports to clients through the tools
                  you will use and performance analysis, which makes it easier
                  for you to know the extent of the trainee’s development.
                </p>
              </div>
              <div className="ser-img col-md-6 col-sm-12">
                <img src={serv3} alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Contact Us */}
      <div className="contactUs" id="contactUS">
        <div className="container">
          <div className="main-heading">
            <h2>CONTACT US</h2>
          </div>
          <div className="container row" id="contact">
            <div className="contact-info col-sm-12 col-lg-6">
              <h3>Contact Information</h3>
              <p>Say something to start a live chat!</p>
              <div className="con-details d-flex justify-content-between flex-column">
                <div>
                  <a href="#/">
                    <img src={phoneIcon} alt="" className="m-2" />
                    +01000983617
                  </a>
                </div>
                <div className="pt-3">
                  <a href="#/">
                    <img src={mailIcon} alt="" className="m-2" />
                    demo@gmail.com
                  </a>
                </div>
              </div>
            </div>
            <div id="contact-form" className="col-sm-12 col-lg-6">
              <form>
                <div className="row mt-4">
                  <div className="inp1 col-sm-12 col-lg-6 d-flex flex-column">
                    <label forhtml="first">First Name</label>
                    <input type="text" id="first" />
                  </div>
                  <div className="inp2 col-sm-12 col-lg-6 d-flex flex-column">
                    <label forhtml="last">Last Name</label>
                    <input type="text" id="last" placeholder="Doe" />
                  </div>
                </div>
                <div className="row mt-4">
                  <div className="inp3 col-sm-12 col-lg-6 d-flex flex-column">
                    <label forhtml="mail">Email</label>
                    <input type="email" id="mail" />
                  </div>
                  <div className="inp4 col-sm-12 col-lg-6 d-flex flex-column">
                    <label forhtml="phone">Phone Number</label>
                    <input type="text" id="last" value="+1 012 3456 789" />
                  </div>
                </div>
                <div className="row mt-4">
                  <div className="msg col-12 d-flex flex-column ">
                    <label forhtml="mail">Message</label>
                    <input
                      type="text"
                      id="msg"
                      placeholder="Write your message.."
                    />
                  </div>
                </div>
                <div className="row mt-5 text-center text-lg-end" dir="rtl">
                  <div className="button col-12 ">
                    <button type="submit">Send Message</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div id="footer-main">
        <div className="container foot d-flex flex-column flex-md-row ">
          <div className="logo-icon col-sm-12 col-md-4">
            <img src={logoIcon} alt="" />
          </div>
          <p className="copyRight  col-sm-12 col-md-4">
            &copy;2024
            <span> 5A </span>
             All Right Reserved
          </p>
          <div className="social-icon col-sm-12 col-md-4">
            <a href="#/" >
              <img src={FacebookIcon} alt="" id="facebook"/>
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
      <button
        type="button"
        className="btn btn-floating btn-md"
        id="btn-back-to-top"
        ref={btnBackToTop}
        onClick={handelClick}
      >
        <i className="fas fa-arrow-up"></i>
      </button>
    </>
  );
};

export default MainPage;
