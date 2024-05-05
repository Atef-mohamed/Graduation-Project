import React, { useEffect, useState } from "react";
import "../../css/addPlan.css";
import { useDispatch, useSelector } from "react-redux";
import GifList from "./GifList";
import Pagination from "../../Pagination/Pagination";
import {
  UpdatePlans,
  fetchPlansData,
  removeAllPlans,
  trainName,
} from "../../../../../rtk/TraineesSlice";
import {
  Route,
  Routes,
  Switch,
  useNavigate,
  useParams,
} from "react-router-dom";
import ActiveEdit from "./ActiveEdit";
import Swal from "sweetalert2";

const EditPlan = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { GifLists, loading, showPlansData, error, exercises } = useSelector(
    (state) => state.Trainees
  );
  const [trainingName, setTrainingName] = useState("");
  const dispatch = useDispatch();

  const handleTrainingNameChange = (event) => {
    setTrainingName(event.target.value);
  };
  if (trainingName) {
    dispatch(trainName(trainingName));
  }
  const navigate = useNavigate();
  // ---------------------------------------------
  const token = localStorage.getItem("token");
  const param = useParams();
  const handleSaveChange = () => {
    Swal.fire({
      title: "Are you sure to Save this plan?",
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
        dispatch(
          UpdatePlans({
            token,
            plan_name: trainingName,
            plan_id: showPlansData.msg.id,
            exercises: exercises,
          })
        );
        navigate(
          `/profile/home/trainee/${param.id}/viewPlan/currentMonth/addPlans/${showPlansData.msg.day}`
        );
      } else if (result.isDenied) {
        Swal.fire({
          title: "Plan not saved",
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
    // if (showPlansData) {
    //   dispatch(removeAllPlans());
    // }
  };
  useEffect(() => {
    dispatch(removeAllPlans());
  }, []);
  // ----------------------------------------------

  //   fetch gif from api
  const sortedGifLists = GifLists;
  const sports_prePage = 8; // each page contain 6 client
  const pages = Math.ceil(GifLists?.length / sports_prePage);
  // const pages = 30;
  const startIndex = (currentPage - 1) * sports_prePage;
  const finishIndex = currentPage * sports_prePage;
  // return trainees 6 for each page 1=>6
  const orderedGifLists = sortedGifLists?.slice(startIndex, finishIndex);
  return (
    <>
      {loading === true ? (
        <div className="loader-overlay">
          <div className="loader-container">
            <div className="loader"></div>
          </div>
        </div>
      ) : (
        ""
      )}
      {error === true ? (
        <h4 className="text-danger txt-res text-center">{error}</h4>
      ) : (
        <>
          {showPlansData && showPlansData?.msg?.exercises?.length > 0 && (
            <div className="container" id="gifs-container">
              <p className="red-lines">Training name</p>
              <div id="form-name" className="d-flex flex-column">
                <label htmlFor="input-nameOftraining">
                  Enter the training name
                </label>
                <input
                  type="text"
                  id="input-nameOftraining"
                  onChange={handleTrainingNameChange}
                  defaultValue={showPlansData.msg.name}
                />
              </div>
              <p id="please">
                *Please choose the appropriate gif for today's exercise
              </p>
              <p className="red-lines">GIF for exercises</p>
              <div className="gif-cards">
                {/* {loading === true ? (
            <div className="loader d-flex flex-column"></div>
          ) : (
            ""
          )} */}
                <GifList Sports={orderedGifLists} />
              </div>
              <Pagination
                pages={pages}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              />
            </div>
          )}
          {showPlansData && showPlansData?.msg?.exercises?.length > 0 && (
            <>
              <div className="container" id="gif-choose">
                <p className="red-linee">The GIF you choose</p>
                <ActiveEdit />
              </div>
              <div id="change-con">
                <button onClick={handleSaveChange} id="saveChanges">
                  Save Changes
                </button>
              </div>
            </>
          )}
          {/* {showPlansData && showPlansData?.msg?.exercises?.length > 0 && (
            <div className="container" id="gif-choose">
              <p className="red-linee">{showPlansData?.msg?.name}</p>
              <ActivePlans />
            </div>
          )} */}
        </>
      )}
    </>
  );
};

export default EditPlan;
