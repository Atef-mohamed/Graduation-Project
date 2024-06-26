import React, { useEffect, useRef, useState } from "react";
import "../../css/ExierSizeForm.css";
import { Row } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { addExersize, addexercise } from "../../../../../rtk/TraineesSlice";
import Swal from "sweetalert2";
import url from "../../../../../url.json";
const ExersizeForm = ({ selectedGif: exercise, isOpen, handleCloseForm }) => {
  const {
    day,
    trainingName: plan_name,
    exercises,
    error,
  } = useSelector((state) => state.Trainees);
  console.log(exercises);
  //   const arr=[];
  //    if(exercises){
  //     arr.push(exercises);
  //    }
  //   console.log(day);
  //   console.log(plan_name);
  //   console.log(isOpen);
  //   console.log(exercise);
  const [validated, setValidated] = useState(false);
  const [name, setExersizeName] = useState("");
  const [times, setNumberOfRepeat] = useState(0);
  const [rest, setBreakTime] = useState(0);
  //   const [exercises, setExercises] = useState([]);
  const location = useLocation();
  const traineeId = location.pathname.split("/")[4];
  const dispatch = useDispatch();
  // console.log(traineeId);
  const inp1 = useRef();
  const inp2 = useRef();
  const inp3 = useRef();
  const handelClearForm = () => {
    inp1.current.value = "";
    inp2.current.value = "";
    inp3.current.value = "";
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      setValidated(true);
      Swal.fire({
        title: "Are you sure to Save Gif?",
        showDenyButton: true,
        confirmButtonText: "Yes",
        denyButtonText: "No",
        customClass: {
          title: "swal-title",
          confirmButton: "swal-confirm-button",
          denyButton: "swal-deny-button",
          popup: "swal-popup",
        },
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(addExersize({ name, exercise, times, rest }));
          dispatch(addexercise(exercise));
          Swal.fire({
            title: "Saved!",
            icon: "success",
            showConfirmButton: false,
            showCancelButton: false,
            timer: 1500,
            customClass: {
              title: "swal-title-green",
              popup: "swal-popup",
            },
          });
          handelClearForm();
          handleCloseForm();
        } else if (result.isDenied) {
          Swal.fire({
            title: "Gif not saved",
            icon: "info",
            showConfirmButton: false,
            showCancelButton: false,
            timer: 1500,
            customClass: {
              title: "swal-title-green",
              confirmButton: "swal-confirm-button",
              popup: "swal-popup",
            },
          });
        }
      });
    }
  };
  const handleCancel = () => {
    handelClearForm();
    handleCloseForm();
  };
  const handleExersizeNameChange = (e) => {
    const input = e.target.value;
    if (!input.match(/^[a-zA-Z\s]*$/)) {
      e.target.setCustomValidity("Enter correct Name of training");
    } else {
      e.target.setCustomValidity("");
    }
    setExersizeName(input);
  };
  const handleNumberOfRepeatChange = (e) => {
    const input = e.target.value;
    if (!input.match(/^\d+$/)) {
      e.target.setCustomValidity("Enter Number only");
    } else {
      e.target.setCustomValidity("");
    }
    setNumberOfRepeat(input);
  };
  const handleBreakTimeChange = (e) => {
    const input = e.target.value;
    if (!input.match(/^\d+$/)) {
      e.target.setCustomValidity("Enter Number only");
    } else {
      e.target.setCustomValidity("");
    }
    setBreakTime(input);
  };

  return (
    <>
      <div className={`exersize-form-container ${isOpen ? "open" : ""}`}>
        <div className="exersize-form">
          {exercise && (
            <img
              src={`${url.url}/img/${exercise}`}
              alt="Selected GIF"
              className="selected-gif"
              style={{ width: "250px", height: "200px", borderRadius: "4px" }}
            />
          )}
          <Form
            validated={validated}
            onSubmit={handleSubmit}
            className="d-flex justify-content-center align-items-center flex-column gap-1 ms-3"
          >
            <Row className="mb-1 mt-1">
              <Form.Group as={Row} md="4" controlId="validationFirstName">
                <label className="form-l">Name of exercise </label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Enter the name of exercise"
                  className="input"
                  onChange={handleExersizeNameChange}
                  ref={inp1}
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
                  ref={inp2}
                  onChange={handleNumberOfRepeatChange}
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
                  // pattern="[0-9]{11}"
                  ref={inp3}
                  onChange={handleBreakTimeChange}
                />
              </Form.Group>
            </Row>
            <div className="mt-4 mb-3 d-flex gap-4">
              <button type="submit" id="btn-save-gif">
                Save Gif
              </button>
              <button id="cancel" onClick={handleCancel}>
                Cancel
              </button>
            </div>
          </Form>
        </div>
      </div>
      {/* <ChoosenGif exercise={exercise} /> */}
    </>
  );
};

export default ExersizeForm;
