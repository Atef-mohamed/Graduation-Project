import React, { useEffect, useState } from "react";
import "./signUp.css";
import FacebookIcon from "../../assets/Facebook.svg";
import InstagramIcon from "../../assets/Instagram Circle.svg";
import XIcon from "../../assets/TwitterX.svg";
import logoIcon from "../../assets/Asset 6xxxhdpi 3.png";
import signUpImg from "../../assets/signUp.jpg";
import logoBlack from "../../assets/logoBlack.png";
import otpPic from "../../assets/otp.png";
import { Link, useNavigate } from "react-router-dom";
import { Button, Form, Row } from "react-bootstrap";
import OtpInput from "../OtpInput/OtpInput";
import { signUp, verifyCode } from "../../rtk/UserSlice";
import { useDispatch, useSelector } from "react-redux";

const SignUp = () => {
  const [validated, setValidated] = useState(false);
  // handel data using redux
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [phone, setPhone] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, success, error } = useSelector((state) => state.User);
  const { userSignUpData } = useSelector((state) => state.User);

  useEffect(() => {
    if (userSignUpData && userSignUpData.data === true) {
      localStorage.setItem("phone", phone);
      navigate("/otpInput");
    }
  }, [userSignUpData, phone, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      setValidated(true);
      dispatch(signUp({ fname, lname, phone }));
    }
  };
  const handlePhoneChange = (e) => {
    const input = e.target.value;
    if (!input.match(/^\d{11}$/)) {
      e.target.setCustomValidity("Phone number must be 11 digit");
    } else {
      e.target.setCustomValidity("");
    }
    setPhone(input);
  };
  const handleFnameChange = (e) => {
    const input = e.target.value;
    if (!input.match(/^[a-zA-Z\s]*$/)) {
      e.target.setCustomValidity("Enter validated Name");
    } else {
      e.target.setCustomValidity("");
    }
    setFname(input);
  };

  const handleLnameChange = (e) => {
    const input = e.target.value;
    if (!input.match(/^[a-zA-Z\s]*$/)) {
      e.target.setCustomValidity("Enter validated Name");
    } else {
      e.target.setCustomValidity("");
    }
    setLname(input);
  };

  return (
    <div id="body-signUp">
      <div id="signUp ">
        <div className="section ">
          <div className=" pic">
            <img src={signUpImg} alt="" />
          </div>
          <div className="form-section ">
            <div className="container  d-flex flex-column justify-content-center align-items-center">
              <div className="title text-center">
                <img src={logoBlack} alt="" width={"170px"} className="mb-3" />
                <p>Create a new account</p>
              </div>
              <div className="form container w-75">
                <Form
                  validated={validated}
                  onSubmit={handleSubmit}
                  style={{ width: "95%" }}
                  className="d-flex justify-content-center align-items-center flex-column gap-1"
                >
                  <Row className="mb-1 mt-1">
                    <Form.Group as={Row} md="4" controlId="validationFirstName">
                      <label className="form-l">First name</label>
                      <Form.Control
                        required
                        type="text"
                        placeholder="Enter First Name"
                        className="input"
                        onChange={handleFnameChange}
                      />
                    </Form.Group>
                  </Row>
                  <Row className="mb-1">
                    <Form.Group as={Row} md="4" controlId="validationLastName">
                      <label className="form-l">Last name</label>
                      <Form.Control
                        required
                        type="text"
                        placeholder="Enter Last Name"
                        className="input"
                        onChange={handleLnameChange}
                      />
                    </Form.Group>
                  </Row>
                  <Row className="mb-1">
                    <Form.Group
                      as={Row}
                      md="4"
                      controlId="validationPhoneNumber"
                    >
                      <label className="form-l">Phone number</label>
                      <Form.Control
                        required
                        type="text"
                        placeholder="Enter Phone Number"
                        className="input"
                        pattern="[0-9]{11}"
                        onChange={handlePhoneChange}
                      />
                    </Form.Group>
                  </Row>
                  {loading && (
                    <div className="loader-overlay">
                      <div className="loader-container">
                        <div className="loader"></div>
                      </div>
                    </div>
                  )}
                  <button className="button-submit" type="submit">
                    Sign up
                  </button>

                  {userSignUpData && userSignUpData.data === true ? (
                    <h3 className="text-primary txt-res">
                      User Logged Succesffuly
                    </h3>
                  ) : (
                    <></>
                  )}
                  {userSignUpData && userSignUpData.data === false ? (
                    <h3 className="text-danger txt-res">
                      {userSignUpData.msg}
                    </h3>
                  ) : (
                    <></>
                  )}
                  {error ? (
                    <h4 className="text-danger txt-res">Network error</h4>
                  ) : null}
                </Form>
              </div>
              <Row className="mt-2">
                <p className="txt-login">
                  already have an account?{" "}
                  <Link to="/signIn" className="login-link">
                    sign in
                  </Link>
                </p>
              </Row>
            </div>
          </div>
        </div>
        <div className="footer">
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
      </div>
    </div>
  );
};

export default SignUp;
