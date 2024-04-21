import React, { useEffect, useRef, useState } from "react";
import "./css/Account.css";
import camera from "../../../assets/Camera.svg";
import namelogo from "../../../assets/name.svg";
import emaillogo from "../../../assets/email.svg";
import clocklogo from "../../../assets/clock.svg";
import uploadlogo from "../../../assets/Upload.svg";
import { useDispatch, useSelector } from "react-redux";
import { submitProfileData } from "../../../rtk/Protfolio";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
const AccountInformation = ({ onNextStep }) => {
  const [validated, setValidated] = useState(false);
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [BOD, setBOD] = useState("");
  const [exp, setExp] = useState("");
  const [personal_img, setPersonalImg] = useState(null);
  const [ssn_img, setSsnImg] = useState(null);
  const dayRef = useRef();
  const srcRef = useRef();
  const dispatch = useDispatch();
  const { loading, success, error } = useSelector((state) => state.Profile);
  const { userProfileData } = useSelector((state) => state.Profile);
  const navigate = useNavigate();
  // useEffect(() => {
  //   if (userProfileData && userProfileData.status) {
  //     navigate("/signin"); // Redirect to the sign-in page
  //   }
  // }, [userProfileData, navigate]);
  // console.log(userProfileData);
  const handelFile = (e) => {
    const file = e.target.files[0];
    if (!file) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please select a JPG, JPEG, or PNG file",
      });
    } else {
      const fileExtension = file.name.split(".").pop().toLowerCase();
      if (
        !(
          fileExtension === "jpg" ||
          fileExtension === "jpeg" ||
          fileExtension === "png"
        )
      ) {
        e.target.setCustomValidity("Please select a JPG, JPEG, or PNG file");
      } else {
        e.target.setCustomValidity("");
        const imga = URL.createObjectURL(file); // Create URL for preview
        const image = document.getElementById("output");
        image.src = imga;
        console.log(file);
        setPersonalImg(file);
      }
    }
  };

  const handelNationalFile = (e) => {
    const file = e.target.files[0];
    if (!file) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please select a JPG, JPEG, or PNG file",
      });
    } else {
      const fileExtension = file.name.split(".").pop().toLowerCase();
      if (
        !(
          fileExtension === "jpg" ||
          fileExtension === "jpeg" ||
          fileExtension === "png"
        )
      ) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Please select a JPG, JPEG, or PNG file",
        });
      } else {
        e.target.setCustomValidity("");
        srcRef.current.textContent = file.name;
        setSsnImg(file);
      }
    }
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
  const handleExpChange = (e) => {
    let input = e.target.value;
    // Remove any non-digit characters
    input = input.replace(/\D/g, "");

    // Limit input to two digits
    input = input.slice(0, 2);

    e.target.value = input; // Update the input field value

    if (!input.match(/^\d{0,2}$/)) {
      e.target.setCustomValidity("Please enter a maximum of 2 digits");
    } else {
      e.target.setCustomValidity("");
    }

    setExp(input);
  };

  const token = localStorage.getItem("token");
  const handelSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
    } else {
      setValidated(true);
      // Gather form data
      const formData = new FormData(form);
      formData.append("fname", fname);
      formData.append("lname", lname);
      formData.append("email", email);
      formData.append("BOD", BOD);
      formData.append("exp", exp);
      formData.append("personal_img", personal_img);
      formData.append("ssn_img", ssn_img);
      formData.append("token", token);
      // Dispatch form data
      dispatch(submitProfileData(formData)).then((response) => {
        if (response.payload && response.payload.status === true) {
          // Redirect to the next step if data is successfully submitted
          if (response.payload.error_msg) {
            Swal.fire({
              title: "The Internet?",
              text: "That thing is still around?",
              icon: "question",
            });
          } else {
            onNextStep();
          }
        } else {
          // Handle error case if needed

          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Please select Personal Img as JPG,JPEG,PNG file",
          });
        }
      });
    }
  };

  return (
    <>
      <div
        className="container d-flex flex-column justify-content-center align-items-center"
        id="line-form"
      >
        <div
          id="personal-txt"
          className="d-flex justify-content-center flex-column align-items-center mt-3 text-center"
        >
          <h3>Personal information</h3>
          <p>Please fill the form below to complete the account creation</p>
        </div>
        <div className="container mb-3 d-flex justify-content-center align-items-center flex-column">
          <label htmlFor="file" className="custum-file-upload">
            <img src={camera} alt="" id="camera" />
            <img id="output" />
            <input
              required
              id="file"
              type="file"
              name="personal-file"
              accept="image/png, image/jpg, image/jpeg"
              onChange={handelFile}
            />
          </label>
        </div>
        <div id="form-acc" className="">
          <form className="p-5" validated={validated} onSubmit={handelSubmit}>
            <div className="row mt-4">
              <div className=" col-sm-12 col-md-6">
                <label htmlFor="fname">First Name</label>
                <div className="input-logo">
                  <input
                    id="fname"
                    type="text"
                    placeholder="Enter first name "
                    required
                    value={fname}
                    onChange={handleFnameChange}
                  />
                  <img src={namelogo} alt="" />
                </div>
              </div>
              <div className=" col-sm-12 col-md-6">
                <label htmlFor="lname">Last Name</label>
                <div className="input-logo">
                  <input
                    id="lname"
                    type="text"
                    placeholder="Enter last name "
                    required
                    value={lname}
                    onChange={handleLnameChange}
                  />
                  <img src={namelogo} alt="" />
                </div>
              </div>
            </div>
            <div className="row mt-4">
              <div className="col-sm-12 col-md-6">
                <label htmlFor="email">Email</label>
                <div className="input-logo">
                  <input
                    required
                    id="email"
                    type="email"
                    placeholder="Email address"
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                  <img src={emaillogo} alt="" id="email-logo" />
                </div>
              </div>
              <div className="col-sm-12 col-md-6">
                <label htmlFor="exp">Years of experience</label>
                <div className="input-logo">
                  <input
                    id="exp"
                    type="text"
                    placeholder="Number of years"
                    required
                    onChange={handleExpChange}
                  />
                  <img src={clocklogo} alt="" id="email-logo" />
                </div>
              </div>
            </div>
            <div className="row mt-4">
              <div className="col-12 col-md-6">
                <label htmlFor="BD">Date of birth</label>
                <div className="birthday-input">
                  <input
                    required
                    type="date"
                    id="day"
                    maxLength="2"
                    placeholder="DD"
                    onChange={(e) => {
                      setBOD(e.target.value);
                    }}
                    ref={dayRef}
                  />
                  {/* <input
                    type="text"
                    id="month"
                    maxLength="2"
                    placeholder="MM"
                    ref={monthRef}
                    className="text-center"
                    onChange={(e) => {
                      setMonth(e.target.value);
                    }}
                  />

                  <input
                    type="text"
                    id="year"
                    maxLength="4"
                    placeholder="YYYY"
                    ref={yearRef}
                    onChange={(e) => {
                      setYear(e.target.value);
                    }} */}
                  {/* /> */}
                </div>
              </div>
            </div>
            <div className="row mt-4">
              <div className="col-12 d-flex flex-column">
                <label htmlFor="national-id">Upload your national id</label>
                <label htmlFor="id-file" className="">
                  <div className="input-logo" id="natoinal-id">
                    <input
                      required
                      id="id-file"
                      name="id-file"
                      type="file"
                      onChange={handelNationalFile}
                    />
                    <img src={uploadlogo} alt="" id="id-logo" />
                    <p ref={srcRef}></p>
                  </div>
                </label>
              </div>
            </div>
            <div className="row mt-5 ">
              <div className="col-12 d-flex justify-content-center ">
                {loading === true ? <h3 className="loader"></h3> : null}
              </div>
              {userProfileData && userProfileData.status === false ? (
                <h2 className="text-danger text-center txt-res phone">
                  {Object.keys(userProfileData.msg).map((key) => (
                    <div key={key}>
                      {userProfileData.msg[key].map((msg, index) => (
                        <div key={index}>{msg}</div>
                      ))}
                      {userProfileData.error_msg}
                    </div>
                  ))}
                </h2>
              ) : null}

              {error && <h4 className="text-danger txt-res">{error}</h4>}
            </div>
            <button
              className="button-submit"
              id="btn-nextStepper"
              type="submit"
              // onClick={handelSubmit}
            >
              Submit
            </button>
          </form>
        </div>
        <div className="container"></div>
      </div>
    </>
  );
};

export default AccountInformation;
