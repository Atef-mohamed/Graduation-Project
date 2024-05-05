// all
import { useRef, useState } from "react";
import { Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { Form } from "react-bootstrap";
import {
  updated_exercise,
  fetchPlansData,
} from "../../../../../rtk/TraineesSlice";
import { useNavigate } from "react-router-dom";

const UpdateExercise = ({
  item_id,
  item_exercise,
  isOpen,
  handleCloseForm,
  item_name,
  item_times,
  item_rest,
  item_day,
  trainee_id,
}) => {
  const [validated, setValidated] = useState(false);
  let dispatch = useDispatch();
  const inp1 = useRef();
  const inp2 = useRef();
  const inp3 = useRef();
  const nav = useNavigate();
  // const handelClearForm = () => {
  //   inp1.current.value = "";
  //   inp2.current.value = "";
  //   inp3.current.value = "";
  // };

  const handleExersizeNameChange = (e) => {
    const input = e.target.value;
    if (!input.match(/^[a-zA-Z\s]*$/)) {
      e.target.setCustomValidity("Enter correct Name of training");
    } else {
      e.target.setCustomValidity("");
    }
  };
  const handleNumberOfRepeatChange = (e) => {
    const input = e.target.value;
    if (!input.match(/^\d+$/)) {
      e.target.setCustomValidity("Enter Number only");
    } else {
      e.target.setCustomValidity("");
    }
  };
  const handleBreakTimeChange = (e) => {
    const input = e.target.value;
    if (!input.match(/^\d+$/)) {
      e.target.setCustomValidity("Enter Number only");
    } else {
      e.target.setCustomValidity("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      setValidated(true);
      Swal.fire({
        title: "Are you sure to Edit Gif?",
        showDenyButton: true,
        confirmButtonText: "Yes",
        denyButtonText: "No",
        customClass: {
          title: "swal-title",
          confirmButton: "swal-confirm-button",
          denyButton: "swal-deny-button",
          popup: "swal-popup",
        },
      }).then(async(result) => {
        if (result.isConfirmed) {
         await dispatch(
            updated_exercise({
              exercise_id: item_id,
              name: inp1.current.value,
              times: inp2.current.value,
              rest: inp3.current.value,
              exercise: item_exercise,
              token: localStorage.getItem("token"),
            })
          );
         await dispatch(
            fetchPlansData({
              trainee_id,
              day:item_day,
              token: localStorage.getItem("token"),
            })
          );
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
          // handelClearForm();
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

  return (
    <>
      <div className={`exersize-form-container ${isOpen ? "open" : ""}`}>
        <div className="exersize-form">
          {
            <img
              src={`https://above-elk-open.ngrok-free.app/api/img/${item_exercise}`}
              alt="Selected GIF"
              className="selected-gif"
              style={{ width: "250px", height: "200px", borderRadius: "4px" }}
            />
          }
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
                  defaultValue={item_name}
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
                  defaultValue={item_times}
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
                  ref={inp3}
                  onChange={handleBreakTimeChange}
                  defaultValue={item_rest}
                />
              </Form.Group>
            </Row>
            <div className="mt-4 mb-3 d-flex gap-4">
              <button type="submit" id="btn-save-gif" onClick={handleSubmit}>
                Edit Exercise
              </button>
              <button id="cancel" onClick={handleCloseForm}>
                Cancel
              </button>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};

export default UpdateExercise;