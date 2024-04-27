import React, { useState } from "react";
import "../../css/choosenGif.css";
import deleteBtn from "../../../../../assets/delete.svg";
import editBtn from "../../../../../assets/edit.svg";
import { useDispatch, useSelector } from "react-redux";

import {
  AddPlans,
  removeAllPlans,
  removeExersize,
} from "../../../../../rtk/TraineesSlice";
import Swal from "sweetalert2";
import { useLoaderData, useLocation } from "react-router-dom";
import Pagination from "../../Pagination/Pagination";

const ChoosenGif = ({ exercise }) => {
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState(1);
  const {
    exercises,
    day,
    trainingName: plan_name,
  } = useSelector((state) => state.Trainees);
  const trainee_id = location.pathname.split("/")[4];
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  console.log(exercise);
  console.log(exercises);
  const handleDelete = (index) => {
    // Dispatch an action to remove the exercise at the specified index
    Swal.fire({
      title: "Are you sure to delete this plan ?",
      showCancelButton: true,
      confirmButtonText: "yes",
      denyButtonText: `No`,
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(removeExersize(index));
        Swal.fire("Deleted!", "", "success");
      } else if (result.isDenied) {
        Swal.fire("plan not Delete", "", "info");
      }
    });
  };
  //   save all of plans and send it to api
  const handleSave = () => {
    Swal.fire({
      title: "Are you sure to Save this plans?",
      showDenyButton: true,
      confirmButtonText: "Yes",
      denyButtonText: `No`,
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(AddPlans({ plan_name, day, exercises, trainee_id, token }));
        // Swal.fire("Saved!", "", "success");
      } else if (result.isDenied) {
        Swal.fire("plan not saved", "", "info");
      }
    });
  };
  const handleCancel = () => {
    Swal.fire({
      title: "Are you sure to delete all plans ?",
      showCancelButton: true,
      confirmButtonText: "yes",
      denyButtonText: `No`,
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(removeAllPlans());
        Swal.fire("Deleted!", "", "success");
      } else if (result.isDenied) {
        Swal.fire("plan not Delete", "", "info");
      }
    });
  }; 
  const sortedPlanLists = exercises;
  const sports_prePage = 2; // each page contain 6 client
  const pages = Math.ceil(exercises?.length / sports_prePage);
  // const pages = 30;
  const startIndex = (currentPage - 1) * sports_prePage;
  const finishIndex = currentPage * sports_prePage;
  // return trainees 6 for each page 1=>6
  const orderedPlanLists = sortedPlanLists?.slice(startIndex, finishIndex);
  return (
    <>
      <div className="container d-flex justify-content-around">
        {orderedPlanLists.map((item, index) => (
          <div
            id="card-gif"
            className="d-flex align-items-center  mb-3"
            key={index}
          >
            <div className="left-side d-flex flex-column ">
              <div className="buttons d-flex gap-2 mb-3">
                <img src={editBtn} alt="edit" style={{ cursor: "pointer" }} />
                <img
                  src={deleteBtn}
                  width={"50px"}
                  alt="Delete"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleDelete(index)}
                />
              </div>
              <div className="image-gif mt-5">
                <img
                  src={`https://above-elk-open.ngrok-free.app/api/img/${item.exercise}`}
                  alt=""
                  style={{
                    width: "80px",
                    height: "130px",
                    borderRadius: "18px",
                  }}
                />
              </div>
            </div>
            <div className="gif-data">
              <div className="gif-txt d-flex flex-column">
                <label>Name of exercise </label>
                <input
                  type="text"
                  className="inp-gif"
                  disabled
                  value={item.name}
                />
              </div>

              <div className="gif-txt d-flex flex-column">
                <label>Number of repetitions in each set</label>
                <input
                  className="inp-gif"
                  type="text"
                  disabled
                  value={item.times}
                />
              </div>
              <div className="gif-txt d-flex flex-column">
                <label>Break time</label>
                <input
                  className="inp-gif"
                  type="text"
                  disabled
                  value={`${item.rest} s`}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      {exercises.length > 0 &&<Pagination
          pages={pages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />}
      {exercises.length > 0 && (
        <div className="container d-flex justify-content-evenly align-items-end">
          <button id="btn-save-gif" onClick={handleSave}>
            Save plan
          </button>
          <button id="cancel" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      )}
    </>
  );
};
export default ChoosenGif;
