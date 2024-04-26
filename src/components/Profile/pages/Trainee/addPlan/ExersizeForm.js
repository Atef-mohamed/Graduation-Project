import React, { useEffect, useState } from "react";
import "../../css/ExierSizeForm.css";
import { Row } from "react-bootstrap";
import { Form } from "react-bootstrap";

const ExersizeForm = ({ selectedGif, isOpen, day, trainingName }) => {
  console.log(trainingName);
  console.log(isOpen);
  console.log(selectedGif);
  console.log(day);
    const trainingname = trainingName;
    console.log(trainingname)
  const [validated, setValidated] = useState(false);

  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [phone, setPhone] = useState("");
  //   useEffect(() => {
  //     console.log(trainingname);
  //     console.log(isOpen);
  //     console.log(selectedGif);
  //     console.log(day);
  //   }, []);
  //   const handleSubmit = (e) => {
  //     e.preventDefault();
  //     const form = e.currentTarget;
  //     if (form.checkValidity() === false) {
  //       e.stopPropagation();
  //     } else {
  //       setValidated(true);
  //       dispatch(signUp({ fname, lname, phone }));
  //     }
  //   };
  //   const handlePhoneChange = (e) => {
  //     const input = e.target.value;
  //     if (!input.match(/^\d{11}$/)) {
  //       e.target.setCustomValidity("Phone number must be 11 digit");
  //     } else {
  //       e.target.setCustomValidity("");
  //     }
  //     setPhone(input);
  //   };
  //   const handleFnameChange = (e) => {
  //     const input = e.target.value;
  //     if (!input.match(/^[a-zA-Z\s]*$/)) {
  //       e.target.setCustomValidity("Enter validated Name");
  //     } else {
  //       e.target.setCustomValidity("");
  //     }
  //     setFname(input);
  //   };

  //   const handleLnameChange = (e) => {
  //     const input = e.target.value;
  //     if (!input.match(/^[a-zA-Z\s]*$/)) {
  //       e.target.setCustomValidity("Enter validated Name");
  //     } else {
  //       e.target.setCustomValidity("");
  //     }
  //     setLname(input);
  //   };
  return (
    <div className={`exersize-form-container ${isOpen ? "open" : ""}`}>
      <div className="exersize-form">
        {/* <h1 className="text-center">Exercise Form</h1> */}
        {selectedGif && (
          <img
            src={`https://above-elk-open.ngrok-free.app/api/img/${selectedGif}`}
            alt="Selected GIF"
            className="selected-gif"
            style={{ width: "250px", height: "200px", borderRadius: "4px" }}
          />
        )}
        <Form
          validated={validated}
          //   onSubmit={handleSubmit}
          //   style={}
          className="d-flex justify-content-center align-items-center flex-column gap-1"
        >
          <Row className="mb-1 mt-1">
            <Form.Group as={Row} md="4" controlId="validationFirstName">
              <label className="form-l">Name of exercise </label>
              <Form.Control
                required
                type="text"
                placeholder="Enter the name of exercise"
                className="input"
                // onChange={handleFnameChange}
              />
            </Form.Group>
          </Row>
          <Row className="mb-1">
            <Form.Group as={Row} md="6" controlId="validationLastName">
              <label className="form-l">
                Number of repetitions in each set
              </label>
              <Form.Control
                required
                type="text"
                placeholder="Enter the Number of repetitions in each set"
                className="input"
                // onChange={handleLnameChange}
              />
            </Form.Group>
          </Row>
          <Row className="mb-1">
            <Form.Group as={Row} md="4" controlId="validationPhoneNumber">
              <label className="form-l">Break time</label>
              <Form.Control
                required
                type="text"
                placeholder="Enter the Break time"
                className="input"
                pattern="[0-9]{11}"
                // onChange={handlePhoneChange}
              />
            </Form.Group>
          </Row>
          <div className="mt-2 mb-3 d-flex gap-4">
            <button type="submit" id="btn-save-gif">
              Save Gif
            </button>
            <button id="cancel">Cancel</button>
          </div>
          {/* {loading === true ? (
                    <h3 className="loader" id="loader-up"></h3>
                  ) : (
                    <button className="button-submit" type="submit">
                      Sign up
                    </button>
                  )}
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
                  ) : null} */}
        </Form>
      </div>
    </div>
  );
};

export default ExersizeForm;
