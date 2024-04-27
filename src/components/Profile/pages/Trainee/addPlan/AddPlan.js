import React, { useState } from "react";
import "../../css/addPlan.css";
import { useDispatch, useSelector } from "react-redux";
import GifList from "./GifList";
import Pagination from "../../Pagination/Pagination";
import ExersizeForm from "./ExersizeForm";
import { trainName } from "../../../../../rtk/TraineesSlice";
import ChoosenGif from "./ChoosenGif";

const AddPlan = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { GifLists, loading } = useSelector((state) => state.Trainees);
  const [trainingName, setTrainingName] = useState("");
  const dispatch = useDispatch();
  const handleTrainingNameChange = (event) => {
    setTrainingName(event.target.value);
  };
  if (trainingName) {
    dispatch(trainName(trainingName));
  }
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
      <div className="container" id="gifs-container">
        <p className="red-lines">Training name</p>
        <div id="form-name" className="d-flex flex-column">
          <label htmlFor="input-nameOftraining">Enter the training name</label>
          <input
            type="text"
            id="input-nameOftraining"
            onChange={handleTrainingNameChange}
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
      <div className="container" id="gif-choose">
        <p className="red-linee">The GIF you choose</p>
        <ChoosenGif />
      </div>
    </>
  );
};

export default AddPlan;
