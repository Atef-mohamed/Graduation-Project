import React, { useEffect, useRef, useState } from "react";
import FacebookIcon from "../../assets/Facebook.svg";
import InstagramIcon from "../../assets/Instagram Circle.svg";
import XIcon from "../../assets/TwitterX.svg";
import logoIcon from "../../assets/Asset 6xxxhdpi 3.png";
import signInImg from "../../assets/signIn.png";
import logoBlack from "../../assets/logoBlack.png";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logIn } from "../../rtk/UserSlice";
import { Button, Row } from "react-bootstrap";
import Swal from "sweetalert2";
import "./signIn.css";
const SignIn = () => {
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const [phone, setPhone] = useState();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.User);
  const { userLoginData, error } = useSelector((state) => state.User);

  useEffect(() => {
    if (userLoginData && userLoginData.data === true) {
      localStorage.setItem("phone", phone);
      navigate("/otpInput");
    }
  }, [userLoginData]);
  useEffect(() => {
    if (error) {
      Swal.fire({
        title: "Oops..",
        text: `${error}`,
        icon: "error",
        showConfirmButton: false,
        showDenyButton: false,
        timer: 2000,
        customClass: {
          title: "swal-title-green",
          popup: "swal-popup",
        },
      });
    }
  }, [error]);
  const handleForm = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      // If phone number is valid
      setValidated(true);
      dispatch(logIn({ phone }));
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

  return (
    <>
      <div id="body-signIn">
        {/* <h1 className="mt-5">Sign Up page</h1> */}

        <div id="signIn ">
          <div className="section ">
            <div className=" pic">
              <img src={signInImg} alt="" />
            </div>
            <div className="form-section ">
              <div className="container p-2 text-center d-flex flex-column justify-content-center align-items-center">
                <div className="title text-center">
                  <img
                    src={logoBlack}
                    alt=""
                    width={"170px"}
                    className="mb-3"
                  />
                  <p className="mb-4">Welcome back</p>
                </div>
                <div className="form ">
                  <form
                    onSubmit={handleForm}
                    validated={validated}
                    className="d-flex justify-content-center align-items-center flex-column gap-4"
                  >
                    <label htmlFor="phone" id="form-l">
                      Phone Number
                    </label>
                    <input
                      id="phone"
                      type="text"
                      placeholder="Enter Phone Number"
                      onChange={handlePhoneChange}
                      className="input"
                      pattern="[0-9]{11}"
                    />
                    {loading && (
                      <div className="loader-overlay">
                        <div className="loader-container">
                          <div className="loader"></div>
                        </div>
                      </div>
                    )}
                    <Button type="submit" id="button-signIn">
                      Sign In
                    </Button>

                    {userLoginData && userLoginData.data === false ? (
                      <h2 className="text-danger txt-res phone">
                        {userLoginData.msg.phone && userLoginData.msg.phone[0]
                          ? userLoginData.msg.phone[0]
                          : userLoginData.msg}
                      </h2>
                    ) : null}
                    {/* {error && <h4 className="text-danger txt-res">{error}</h4>} */}
                  </form>
                </div>
                <Row className="mt-2">
                  <p className="txt-login">
                    Create a new account?{" "}
                    <Link to="/signUp" className="login-link">
                      Sign up
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
    </>
  );
};

export default SignIn;
