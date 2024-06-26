import React, { useEffect, useRef, useState } from "react";
import "../Protfolio/pages/css/Account.css";
import camera from "../../assets/Camera.svg";
import namelogo from "../../assets/name.svg";
import emaillogo from "../../assets/email.svg";
import clocklogo from "../../assets/clock.svg";
import uploadlogo from "../../assets/Upload.svg";
import profilelogo from "../../assets/myprofile.svg";
import editProfilelogo from "../../assets/editProfile.svg";
import { useDispatch, useSelector } from "react-redux";
import url from "../../url.json";
import {
  editProfileData,
  fetchProfileData,
  submitProfileData,
} from "../../rtk/Protfolio";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "./css/Editprofile.css";
const EditProfile = () => {
  const [validated, setValidated] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [BOD, setBOD] = useState("");
  const [exp, setExp] = useState("");
  const [personal_img, setPersonalImg] = useState(null);
  const [paybal, setPaybal] = useState(null);
  const [ssn_img, setSsnImg] = useState(null);
  const dayRef = useRef();
  const srcRef = useRef();
  const dispatch = useDispatch();
  const { CoachProfileData, editProfiledata, loading, success, error } =
    useSelector((state) => state.Profile);
  const { userProfileData } = useSelector((state) => state.Profile);
  const navigate = useNavigate();
  const fnameInput = useRef();
  const lnameInput = useRef();
  const emailInput = useRef();
  const expInput = useRef();
  const persolanimgInput = useRef();
  const paypalCode = useRef();
  const ss_imgInput = useRef();
  const phone = localStorage.getItem("phone");
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
        setPersonalImg(file);
      }
    }
  };

  const handelNationalFile = (e) => {
    const file = e.target.files[0];
    if (!file) {
      // User didn't choose a new image, use the default ssn_img
      setSsnImg(null); // Reset the ssn_img state to null
    } else {
      // User chose a new image
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
        setSsnImg(file); // Set the selected image to ssnImg state
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
  console.log(CoachProfileData?.msg?.ssn_img);
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
      formData.append("fname", fnameInput.current.value);
      formData.append("lname", lnameInput.current.value);
      formData.append("email", emailInput.current.value);
      formData.append("BOD", dayRef.current.value);
      formData.append("exp", expInput.current.value);
      formData.append("paypal", paypalCode.current.value);
      formData.append("phone", phone);
      if (personal_img) {
        formData.append("personal_img", personal_img);
      }

      // Check if ssn_img has been modified, if not, use the default value
      if (ssn_img) {
        formData.append("ssn_img", ssn_img);
      }
      formData.append("token", token);
      // Dispatch form data
      Swal.fire({
        title: "Are you sure to save edit?",
        showDenyButton: true,
        confirmButtonText: "yes",
        denyButtonText: `No`,
        customClass: {
          title: "swal-title",
          confirmButton: "swal-deny-button",
          denyButton: " swal-confirm-button",
          popup: "swal-popup",
        },
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(editProfileData(formData));
          dispatch(fetchProfileData({ token }));
        } else if (result.isDenied) {
          Swal.fire({
            title: "The edit not saved",
            icon: "error",
            showConfirmButton: false,
            showDenyButton: false,
            timer: 1500,
            customClass: {
              title: "swal-title-green",
              popup: "swal-popup",
            },
          });
        }
      });
    }
  };
  const handleFocus = () => {
    const fileInput = document.getElementById("id-file");
    if (fileInput) {
      fileInput.focus();
    }
  };
  const handleEditModeToggle = () => {
    setEditMode(!editMode);
  };
  useEffect(() => {
    // Focus the input when editMode becomes true
    if (editMode && fnameInput.current) {
      fnameInput.current.focus();
    }
  }, [editMode]);
  useEffect(() => {
    if (error) {
      Swal.fire({
        title: `${error}`,
        icon: "error",
        showConfirmButton: false,
        showDenyButton: false,
        timer: 1500,
        customClass: {
          title: "swal-title-green",
          popup: "swal-popup",
        },
      });
    }
  }, [editProfiledata]);
  return (
    <>
      <div className="ms-5 ">
        <img src={profilelogo} alt="MyProfile" />
      </div>
      <div
        className="container d-flex flex-column justify-content-center align-items-center"
        id="line-formm"
      >
        <div className="container mb-3 d-flex justify-content-center align-items-center flex-column">
          <label htmlFor="file" className="custum-file-upload">
            <img src={camera} alt="" id="camera" />
            <img
              id="output"
              src={`${url.url}/img/${CoachProfileData?.msg?.personal_img}`}
            />
            <input
              required
              id="file"
              type="file"
              name="personal-file"
              accept="image/png, image/jpg, image/jpeg"
              onChange={handelFile}
              // defaultValue={files[0]}
              ref={persolanimgInput}
            />
          </label>
        </div>
        <div className="editProfile " onClick={handleEditModeToggle}>
          <img
            src={editProfilelogo}
            alt="Edit Pofile"
            style={{ cursor: "pointer" }}
          />
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
                    defaultValue={CoachProfileData?.msg?.fname}
                    onChange={handleFnameChange}
                    disabled={!editMode} // Disable input based on edit mode
                    ref={fnameInput}
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
                    defaultValue={CoachProfileData?.msg?.lname}
                    onChange={handleLnameChange}
                    disabled={!editMode}
                    ref={lnameInput}
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
                    defaultValue={CoachProfileData?.msg?.email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    disabled={!editMode}
                    ref={emailInput}
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
                    defaultValue={CoachProfileData?.msg?.exp}
                    disabled={!editMode}
                    onChange={handleExpChange}
                    ref={expInput}
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
                    defaultValue={CoachProfileData?.msg?.BirhOfDate}
                    disabled={!editMode}
                    onChange={(e) => {
                      setBOD(e.target.value);
                    }}
                    ref={dayRef}
                  />
                </div>
              </div>
              <div className="col-12 col-md-6">
                <label htmlFor="paypal">Paypal account email</label>
                <div className="paybal-input">
                  <input
                    required
                    type="email"
                    id="paypal"
                    // maxLength="2"
                    defaultValue={CoachProfileData?.msg?.paypal}
                    disabled={!editMode}
                    onChange={(e) => {
                      setPaybal(e.target.value);
                    }}
                    ref={paypalCode}
                  />
                </div>
              </div>
            </div>
            {/* <div className="row mt-4">
              <div className="col-12 d-flex flex-column">
                <label htmlFor="national-id">Upload your national id</label>
                <label htmlFor="id-file" className="">
                  <div className="input-logo" id="natoinal-id">
                    <div>
                      <input
                        id="id-file"
                        name="id-file"
                        type="file"
                        accept="image/png, image/jpg, image/jpeg"
                        onChange={handelNationalFile}
                      />
                    </div>

                    <img src={uploadlogo} alt="" id="id-logo" />
                    <p ref={srcRef} id="nationalColor">
                      {CoachProfileData?.msg?.ssn_img}
                    </p>
                  </div>
                </label>
              </div>
            </div> */}
            <div className="row mt-5 ">
              {loading && (
                <div className="loader-overlay">
                  <div className="loader-container">
                    <div className="loader"></div>
                  </div>
                </div>
              )}

              {editProfiledata &&
                editProfiledata?.msg &&
                editProfiledata.status === false && (
                  <h2 className="text-danger text-center txt-res phone">
                    {Object.keys(editProfiledata.msg).map((key) => (
                      <div key={key}>
                        {editProfiledata.msg[key].map((msg, index) => (
                          <div key={index}>{msg}</div>
                        ))}
                      </div>
                    ))}
                  </h2>
                )}
              {/* {error && <h4 className="text-danger txt-res">{error}</h4>} */}
            </div>
            <div className="row mt-4">
              <div className="col-12 d-flex flex-column">
                <label htmlFor="national-id">Upload your national id</label>
                <label htmlFor="id-file" className="">
                  <div className="input-logo" id="natoinal-id">
                    <div>
                      <input
                        id="id-file"
                        name="id-file"
                        type="file"
                        accept="image/png, image/jpg, image/jpeg"
                        onChange={handelNationalFile}
                      />
                    </div>

                    <img src={uploadlogo} alt="" id="id-logo" />
                    <p ref={srcRef} id="nationalColor">
                      {CoachProfileData?.msg?.ssn_img}
                    </p>
                  </div>
                </label>
              </div>
            </div>
            <div className="d-flex justify-content-center align-items-center">
              {editMode && (
                <button
                  className="button-submit-editProfile "
                  type="submit"
                  // onClick={handelSubmit}
                >
                  Save Edit
                </button>
              )}
            </div>
          </form>
        </div>
        <div className="container"></div>
      </div>
    </>
  );
};

export default EditProfile;
