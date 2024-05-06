import React, { useEffect, useRef, useState } from "react";
import editPrice from "../../../assets/editprice.svg";
import { useDispatch, useSelector } from "react-redux";
import { addListener } from "@reduxjs/toolkit";
import { addPackage } from "../../../rtk/Protfolio";
import Swal from "sweetalert2";
import { Alert } from "react-bootstrap";

const Packages = ({ onNextStep, onBackStep }) => {
  const token = localStorage.getItem("token");
  const [editingMode, setEditingMode] = useState(false);
  const [price1, setPrice1] = useState("");
  const [price2, setPrice2] = useState("");
  const [price3, setPrice3] = useState("");
  const [price4, setPrice4] = useState("");
  const [formValid, setFormValid] = useState(false);
  const inputRef = useRef(null);
  const input2Ref = useRef(null);
  const input3Ref = useRef(null);
  const input4Ref = useRef(null);
  const cardPackage = useRef(null);
  const cardPackage2 = useRef(null);
  const cardPackage3 = useRef(null);
  const cardPackage4 = useRef(null);
  const dispatch = useDispatch();
  const { loading, error, packagePriceData } = useSelector(
    (state) => state.Profile
  );

  // Function to toggle editing mode for a specific card
  const toggleEditingMode1 = () => {
    setEditingMode(true);
    if (inputRef.current) {
      inputRef.current.focus();
      inputRef.current.value = "";
      cardPackage.current.classList.add("active-card");
    }
  };
  const handleInputBlur = () => {
    cardPackage.current.classList.remove("active-card");
  };
  const toggleEditingMode2 = () => {
    setEditingMode(true);
    if (input2Ref.current) {
      input2Ref.current.focus();
      input2Ref.current.value = "";
      cardPackage2.current.classList.add("active-card");
    }
  };
  const toggleEditingMode3 = () => {
    setEditingMode(true);
    if (input3Ref.current) {
      input3Ref.current.focus();
      input3Ref.current.value = "";
      cardPackage3.current.classList.add("active-card");
    }
  };
  const toggleEditingMode4 = () => {
    setEditingMode(true);
    if (input4Ref.current) {
      input4Ref.current.focus();
      input4Ref.current.value = "";
      cardPackage4.current.classList.add("active-card");
    }
  };
  const validateForm = () => {
    return price1 !== "" && price2 !== "" && price3 !== "" && price4 !== "";
  };

  const handelFinsh = () => {
    if (validateForm()) {
      dispatch(addPackage({ price1, price2, price3, price4, token })).then(
        (response) => {
          if (response.payload && response.payload.status === true) {
            onNextStep();
          }
        }
      );
    } else {
      // Please fill in all the fields before finishing
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please fill in all the Price before finishing",
      });
    }
  };

  useEffect(() => {
    // Update form validity whenever the input values change
    setFormValid(validateForm());
  }, [price1, price2, price3, price4]);
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
          <h3>Add Your Packages</h3>
          <p>Please note that there is a 10% percentage in favor of the site</p>
        </div>
      </div>
      <div id="packages" className=" container">
        <div className="row d-flex gap-5 flex-column">
          {/* <div className="row d-flex" id="pack"> */}
          <div
            className="card-package col-12  position-relative"
            ref={cardPackage}
          >
            <h4 className="text-center">
              One month <br /> subscription
            </h4>
            <span id="line-package" className="text-center"></span>
            {/* Conditionally render input field based on editing mode */}
            <h1 id="price-package" className="text-center">
              {editingMode ? (
                <input
                  onChange={(e) => {
                    // Only update the state if the entered value is a number
                    const value = e.target.value;
                    if (!isNaN(value)) {
                      setPrice1(value);
                    }
                  }}
                  onKeyDown={(e) => {
                    if (
                      !/^\d+$/.test(e.key) && // Allow numeric characters
                      e.key !== "Backspace" &&
                      e.key !== "Delete" &&
                      e.key !== "ArrowLeft" &&
                      e.key !== "ArrowRight" &&
                      e.key !== "ArrowUp" &&
                      e.key !== "ArrowDown"
                    ) {
                      e.preventDefault();
                    }
                  }}
                  onBlur={handleInputBlur}
                  required
                  id="input-package"
                  type="text"
                  defaultValue="0"
                  ref={inputRef}
                  pattern="[0-9]*"
                  // Focus on input field when editing mode is active
                />
              ) : (
                <input
                  id="input-package"
                  type="text"
                  defaultValue="0"
                  disabled
                />
              )}
              {/* Constant string "L.E" */}
              <span style={{ marginLeft: "4px" }}>L.E</span>
            </h1>
            {/* Edit button to toggle editing mode */}
            <h6
              className="edit-btn"
              onClick={() => {
                toggleEditingMode1();
              }}
              style={{ position: "absolute", top: "10px", right: "10px" }}
            >
              Edit price
              <img src={editPrice} alt="" />
            </h6>
          </div>
          <div
            className="card-package col-12 position-relative"
            ref={cardPackage3}
          >
            <h4 className="text-center">
              Six month <br /> subscription
            </h4>
            <span id="line-package" className="text-center"></span>
            {/* Conditionally render input field based on editing mode */}
            <h1 id="price-package" className="text-center">
              {editingMode ? (
                <input
                  onChange={(e) => {
                    // Only update the state if the entered value is a number
                    const value = e.target.value;
                    if (!isNaN(value)) {
                      setPrice3(value);
                    }
                  }}
                  onBlur={() => {
                    cardPackage3.current.classList.remove("active-card");
                  }}
                  onKeyDown={(e) => {
                    if (
                      !/^\d+$/.test(e.key) && // Allow numeric characters
                      e.key !== "Backspace" &&
                      e.key !== "Delete" &&
                      e.key !== "ArrowLeft" &&
                      e.key !== "ArrowRight" &&
                      e.key !== "ArrowUp" &&
                      e.key !== "ArrowDown"
                    ) {
                      e.preventDefault();
                    }
                  }}
                  required
                  id="input-package"
                  type="text"
                  defaultValue="0"
                  ref={input3Ref}
                  pattern="[0-9]*"
                  // Focus on input field when editing mode is active
                />
              ) : (
                <input
                  id="input-package"
                  type="text"
                  defaultValue="0"
                  disabled
                />
              )}
              {/* Constant string "L.E" */}
              <span style={{ marginLeft: "4px" }}>L.E</span>
            </h1>
            {/* Edit button to toggle editing mode */}
            <h6
              className="edit-btn"
              style={{ position: "absolute", top: "10px", right: "10px" }}
              onClick={() => {
                toggleEditingMode3();
              }}
            >
              Edit price
              <img src={editPrice} alt="" />
            </h6>
          </div>
        </div>
        <div className="row d-flex gap-5 flex-column">
        <div
            className="card-package col-12  position-relative"
            ref={cardPackage2}
          >
            <h4 className="text-center">
              Three month <br /> subscription
            </h4>
            <span id="line-package" className="text-center"></span>
            {/* Conditionally render input field based on editing mode */}
            <h1 id="price-package" className="text-center">
              {editingMode ? (
                <input
                  onChange={(e) => {
                    // Only update the state if the entered value is a number
                    const value = e.target.value;
                    if (!isNaN(value)) {
                      setPrice2(value);
                    }
                  }}
                  onBlur={() => {
                    cardPackage2.current.classList.remove("active-card");
                  }}
                  onKeyDown={(e) => {
                    if (
                      !/^\d+$/.test(e.key) && // Allow numeric characters
                      e.key !== "Backspace" &&
                      e.key !== "Delete" &&
                      e.key !== "ArrowLeft" &&
                      e.key !== "ArrowRight" &&
                      e.key !== "ArrowUp" &&
                      e.key !== "ArrowDown"
                    ) {
                      e.preventDefault();
                    }
                  }}
                  required
                  id="input-package"
                  type="text"
                  defaultValue="0"
                  ref={input2Ref}
                  pattern="[0-9]*"
                  // Focus on input field when editing mode is active
                />
              ) : (
                <input
                  id="input-package"
                  type="text"
                  defaultValue="0"
                  disabled
                />
              )}
              {/* Constant string "L.E" */}
              <span style={{ marginLeft: "4px" }}>L.E</span>
            </h1>
            {/* Edit button to toggle editing mode */}
            <h6
              className="edit-btn"
              style={{ position: "absolute", top: "10px", right: "10px" }}
              onClick={() => {
                toggleEditingMode2();
              }}
            >
              Edit price
              <img src={editPrice} alt="" />
            </h6>
          </div>
          <div
            className="card-package col-12  position-relative"
            ref={cardPackage4}
          >
            <h4 className="text-center">
              One year <br /> subscription
            </h4>
            <span id="line-package" className="text-center"></span>
            {/* Conditionally render input field based on editing mode */}
            <h1 id="price-package" className="text-center">
              {editingMode ? (
                <input
                  onChange={(e) => {
                    // Only update the state if the entered value is a number
                    const value = e.target.value;
                    if (!isNaN(value)) {
                      setPrice4(value);
                    }
                  }}
                  onBlur={() => {
                    cardPackage4.current.classList.remove("active-card");
                  }}
                  onKeyDown={(e) => {
                    if (
                      !/^\d+$/.test(e.key) && // Allow numeric characters
                      e.key !== "Backspace" &&
                      e.key !== "Delete" &&
                      e.key !== "ArrowLeft" &&
                      e.key !== "ArrowRight" &&
                      e.key !== "ArrowUp" &&
                      e.key !== "ArrowDown"
                    ) {
                      e.preventDefault();
                    }
                  }}
                  required
                  id="input-package"
                  type="text"
                  defaultValue="0"
                  ref={input4Ref}
                  pattern="[0-9]*"
                  // Focus on input field when editing mode is active
                />
              ) : (
                <input
                  id="input-package"
                  type="text"
                  defaultValue="0"
                  disabled
                />
              )}
              {/* Constant string "L.E" */}
              <span style={{ marginLeft: "4px" }}>L.E</span>
            </h1>
            {/* Edit button to toggle editing mode */}
            <h6
              className="edit-btn"
              style={{ position: "absolute", top: "10px", right: "10px" }}
              onClick={() => {
                toggleEditingMode4();
              }}
            >
              Edit price
              <img src={editPrice} alt="" />
            </h6>
          </div>
          
        </div>
      </div>

      <div className="row mt-5 ">
        <div className="col-12 d-flex justify-content-center ">
          {loading === true ? <h3 className="loader"></h3> : null}
        </div>
        {packagePriceData && packagePriceData.status === false ? (
          <Alert variant="danger" dismissible>
            <Alert.Heading>Oh! You got an error!</Alert.Heading>

            {Object.keys(packagePriceData.msg).map((key) => (
              <div key={key}>
                {packagePriceData.msg[key].map((msg, index) => (
                  <p key={index}>{msg}</p>
                ))}
              </div>
            ))}
            {packagePriceData.error_msg}
          </Alert>
        ) : null}

        {error && <h4 className="text-danger txt-res">{error}</h4>}
      </div>
      <div id="buttons" className="container">
        <button
          id="back"
          onClick={() => {
            onBackStep();
          }}
        >
          back
        </button>

        <button id="finsh" onClick={handelFinsh}>
          Finsh
        </button>
      </div>
    </>
  );
};

export default Packages;
