import React, { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import FacebookIcon from "../../assets/Facebook.svg";
import InstagramIcon from "../../assets/Instagram Circle.svg";
import XIcon from "../../assets/TwitterX.svg";
import logoIcon from "../../assets/Asset 6xxxhdpi 3.png";
import logoBlack from "../../assets/logoBlack.png";
import otpPic from "../../assets/otp.png";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import "./OtpInput.css";
import { resend, verifyCode } from "../../rtk/UserSlice";

const OtpInput = () => {
  const length = 4;
  const [otp, setOtp] = useState(new Array(length).fill(""));
  const inputRefs = useRef([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { verifyOtpData, success, loading } = useSelector(
    (state) => state.User
  );
  const location = useLocation();

  // console.log(verifyOtpData);
  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);
  useEffect(() => {
    if (verifyOtpData && verifyOtpData.data.token) {
      localStorage.setItem("token", verifyOtpData.data.token);
      if (verifyOtpData.data.account === "new") {
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "You have been Sign In Successfully",
          showConfirmButton: false,
          timer: 2000,
        });
        navigate("/protfolio");
      } else {
        navigate("/profile");
      }
    }
    //  if( verifyOtpData && verifyOtpData.data === false){
    //   Swal.fire({
    //     icon: "error",
    //     title: "Oops...",
    //     text: `${verifyCode.msg.code && verifyCode.msg.code[0] ? verifyCode.msg.code[0] : verifyCode.msg}`,
    //   });
    //  }
  }, [verifyOtpData]);
  const handelChange = (index, e) => {
    const value = e.target.value;
    if (isNaN(value)) return;

    const newOtp = [...otp];
    // allow only one input
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    // move cursor to the next input
    if (value && index < length - 1 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
  };
  const handelClick = (index) => {
    inputRefs.current[index].setSelectionRange(1, 1);
    // return cursor to inputOne
    if (index > 0 && !otp[index - 1]) {
      inputRefs.current[otp.indexOf("")].focus();
    }
  };
  const hanelKeyDown = (index, e) => {
    // handel if user click on backspace
    if (
      e.key === "Backspace" &&
      !otp[index] &&
      index > 0 &&
      inputRefs.current[index - 1]
    ) {
      inputRefs.current[index - 1].focus();
    }
  };

  //   submit form and convert otp to string
  const phone = localStorage.getItem("phone");
  const handleSubmit = (e) => {
    e.preventDefault();
    const combinedOtp = otp.join("");
    const code = combinedOtp;
    // Dispatch login action with phone number and OTP
    dispatch(verifyCode({ phone, code }));
    // console.log("login successfully", code);
  };
  const handelResend = () => {
    dispatch(resend({ phone }));
    Swal.fire({
      position: "top-center",
      icon: "success",
      title: "Your code Resend agin",
      showConfirmButton: false,
      timer: 1500,
    });
  };
  const handelBackBtn = () => {
    if (location.state && location.state.from === "signIn") {
      window.location.href = "/signUp"; // Navigate back to SignUp component
    } else {
      window.location.href = "/signIn"; // Navigate back to SignIn component
    }
  };
  return (
    <>
      <div id="signUp ">
        <div className="section ">
          <div className=" pic">
            <img src={otpPic} alt="" />
          </div>
          <div className="form-section ">
            <div className="container p-2 text-center d-flex flex-column justify-content-center align-items-center">
              <div className="title text-center">
                <img src={logoBlack} alt="" width={"170px"} className="mb-3" />
                <p className="mb-5">Verification Your number </p>
              </div>
              <div className="form d-flex flex-column">
                <p className="text-white text-bold">
                  We sent you a code, please enter it
                </p>
                <form onSubmit={handleSubmit}>
                  {otp.map((value, index) => {
                    return (
                      <input
                        key={index}
                        type="text"
                        value={value}
                        className={`otpInput ${
                          verifyOtpData && verifyOtpData.data === false
                            ? "error"
                            : ""
                        } ${
                          verifyOtpData && verifyOtpData.data === true
                            ? "right"
                            : ""
                        }`}
                        ref={(input) => (inputRefs.current[index] = input)}
                        onChange={(e) => handelChange(index, e)}
                        onClick={() => handelClick(index)}
                        onKeyDown={(e) => hanelKeyDown(index, e)}
                      />
                    );
                  })}
                  <p id="resend" onClick={handelResend}>
                    Resend it
                  </p>
                  {loading && <div className="loader" id="loader-otp"></div>}

                  <div className="buttons-otp">
                    <button id="btn-back" onClick={handelBackBtn}>
                      Back
                    </button>
                    <button id="btn-submit" type="submit">
                      Continue{" "}
                    </button>
                  </div>
                  {/* <Row>
                    {verifyOtpData && verifyOtpData.data === false ? (
                      <h2 className="text-danger txt-res">
                        {verifyOtpData.msg.code || verifyOtpData.msg}
                      </h2>
                    ) : (
                      <></>
                    )}
                  </Row> */}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer">
        <div className="container foot d-flex  flex-md-row  justify-content-between">
          <div className="logo-icon   ">
            <img src={logoIcon} alt="" />
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
};

export default OtpInput;
