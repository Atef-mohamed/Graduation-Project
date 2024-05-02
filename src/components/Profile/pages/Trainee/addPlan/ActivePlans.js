import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import deleteBtn from "../../../../../assets/delete.svg";
import editBtn from "../../../../../assets/edit.svg";
import Pagination from "../../Pagination/Pagination";
import {
  deleteExercise,
  deletePlan,
  fetchPlansData,
} from "../../../../../rtk/TraineesSlice";
import { useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import UpdateExercise from "./UpdateExercise";

const ActivePlans = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { day, showPlansData, exerciseDeleted, PlanDeleted } = useSelector(
    (state) => state.Trainees
  );
  const [exercise, setExercise] = useState(null);
  const [exerciseName, setExerciseName] = useState(null);
  const [exerciseRest, setExerciseRest] = useState(null);
  const [exerciseTimes, setExerciseTimes] = useState(null);
  const [exerciseId, setExerciseId] = useState(null);
  const [exerciseDay, setExerciseDay] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const dispatch = useDispatch();
  const location = useLocation();
  const trainee_id = location.pathname.split("/")[4];
  console.log(showPlansData?.msg?.exercises);
  const sortedPlanLists = showPlansData?.msg?.exercises;
  const sports_prePage = 2; // each page contain 6 client
  const pages = Math.ceil(sortedPlanLists?.length / sports_prePage);
  // const pages = 30;
  const startIndex = (currentPage - 1) * sports_prePage;
  const finishIndex = currentPage * sports_prePage;
  // return trainees 6 for each page 1=>6
  const orderedPlanLists = sortedPlanLists?.slice(startIndex, finishIndex);
  const token = localStorage.getItem("token");
  const plan_id = showPlansData?.msg?.id;
  const handleDeleteExercize = (exercise_id) => {
    Swal.fire({
      title: "Are you sure to delete this exercise ?",
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
        dispatch(deleteExercise({ exercise_id, token }));
        Swal.fire({
          title: "Deleted!",
          icon: "success",
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
  };
  const handleCloseForm = () => {
    setIsOpen(false); // Close the ExersizeForm
  };
  useEffect(() => {
    dispatch(fetchPlansData({ trainee_id, day, token }));
  }, [exerciseDeleted, PlanDeleted]);
  const handleDeleteAllPlan = () => {
    Swal.fire({
      title: "Are you sure to delete this Plan ?",
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
        dispatch(deletePlan({ token, plan_id }));
        Swal.fire({
          title: "Deleted!",
          icon: "success",
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
  };
  const handleEdit = (
    item_id,
    item_exercise,
    item_name,
    item_times,
    iten_rest,
    day
  ) => {
    setIsOpen(true);
    setExercise(item_exercise);
    setExerciseName(item_name);
    setExerciseRest(iten_rest);
    setExerciseTimes(item_times);
    setExerciseId(item_id);
    setExerciseDay(day);
  };
  return (
    <>
      <div
        className="container d-flex justify-content-around"
        id="active-plans"
      >
        {orderedPlanLists.map((item, index) => (
          <div
            id="card-gif"
            className="d-flex align-items-center  mb-3"
            key={index}
          >
            <div className="left-side d-flex flex-column ">
              <div className="buttons d-flex gap-2 mb-3">
                <img
                  src={editBtn}
                  alt="edit"
                  style={{ cursor: "pointer" }}
                  onClick={() =>
                    handleEdit(
                      item.id,
                      item.exercise,
                      item.name,
                      item.times,
                      item.rest
                    )
                  }
                />
                <img
                  src={deleteBtn}
                  width={"50px"}
                  alt="Delete"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleDeleteExercize(item.id)}
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
      {/* {sortedPlanLists?.length > 0 && (
       
      )} */}
      {sortedPlanLists?.length > 0 && (
        <div className="container d-flex justify-content-between align-items-end">
          <div className="buttons d-flex gap-4 mb-4">
            <img
              src={editBtn}
              alt="edit"
              style={{ cursor: "pointer" }}
              id="btn-edit-all"
            />
            <img
              src={deleteBtn}
              width={"80px"}
              alt="Delete"
              style={{ cursor: "pointer" }}
              onClick={() => handleDeleteAllPlan()}
              id="btn-delete-all"
            />
          </div>
          <div>
            <Pagination
              pages={pages}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </div>
        </div>
      )}
      {isOpen && (
        <div id="exerSize-form">
          <UpdateExercise
            item_exercise={exercise}
            item_name={exerciseName}
            item_times={exerciseTimes}
            item_rest={exerciseRest}
            item_id={exerciseId}
            item_day={exerciseDay}
            trainee_id={trainee_id}
            isOpen={isOpen}
            handleCloseForm={handleCloseForm}
          />
        </div>
      )}
    </>
  );
};

export default ActivePlans;
