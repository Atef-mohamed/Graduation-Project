//pages/Trainee/EditPlan.js
import React, { useEffect, useRef, useState } from "react";
import "../../css/addPlan.css";
import { useDispatch, useSelector } from "react-redux";
import GifList from "./GifList";
import Pagination from "../../Pagination/Pagination";
import {
  UpdatePlans,
  fetchPlansData,
  trainName,
} from "../../../../../rtk/TraineesSlice";
import ChoosenGif from "./ChoosenGif";
import { useLocation } from "react-router-dom";
import ActiveEdit from "./ActiveEdit";

const EditPlan = () => {
  const inp1 = useRef("");
  const [currentPage, setCurrentPage] = useState(1);
  const { GifLists, loading, showPlansData, day, error} =
    useSelector((state) => state.Trainees);
  const [trainingName, setTrainingName] = useState("");
  const dispatch = useDispatch();
  const location = useLocation();
  // const coach_id = 6;
  const trainee_id = location.pathname.split("/")[4];
  const token = localStorage.getItem("token");
  useEffect(() => {
    dispatch(fetchPlansData({ trainee_id, day, token }));
    console.log(showPlansData?.msg?.exercises);
  }, []);
  const handleTrainingNameChange = (event) => {
    setTrainingName(event.target.value);
  };
  if (trainingName) {
    dispatch(trainName(trainingName));
  }
  const handelSubmit = () => {
    dispatch(
      UpdatePlans({
        plan_id: showPlansData.msg.id,
        plan_name: inp1.current.value,
        exercises:showPlansData.msg.exercises,
        token,
      })
    );
    dispatch(fetchPlansData({ trainee_id, day, token }));
  };
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
          <div className="container" id="gifs-container">
            <p className="red-lines">Training name</p>
            <div id="form-name" className="d-flex flex-column">
              <label htmlFor="input-nameOftraining">
                Enter the training name
              </label>
              <input
                ref={inp1}
                type="text"
                id="input-nameOftraining"
                defaultValue={showPlansData.msg.name}
                onChange={handleTrainingNameChange}
              />
            </div>
            <p id="please">
              *Please choose the appropriate gif for today's exercise
            </p>
            <p className="red-lines">GIF for exercises</p>
            <div className="gif-cards">
              <GifList Sports={orderedGifLists} />
            </div>
            <Pagination
              pages={pages}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </div>

          {/* {showPlansData && !showPlansData?.msg?.exercises?.length > 0 && (
            <div className="container" id="gif-choose">
              <p className="red-linee">The GIF you choose</p>
              <ChoosenGif/>
            </div>
          )} */}
          {showPlansData && showPlansData?.msg?.exercises?.length > 0 && (
            <div className="container" id="gif-choose">
              <p className="red-linee">The GIF you choose</p>
              <ActiveEdit />
              <button onClick={handelSubmit}>Save Changes</button>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default EditPlan;
