import React, { useState } from "react";
import "../../css/addPlan.css";
import { useSelector } from "react-redux";
import GifList from "./GifList";
import Pagination from "../../Pagination/Pagination";
import ExersizeForm from "./ExersizeForm";

const AddPlan = ({day}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const { GifLists, loading } = useSelector((state) => state.Trainees);
  const [trainingName, setTrainingName] = useState("");
  const handleTrainingNameChange = (event) => {
    setTrainingName(event.target.value);
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
      <div className="container" id="gifs-container">
       
        <p class="red-lines">Training name</p>
        <div id="form-name" className="d-flex flex-column">
          <label htmlFor="input-nameOftraining">Enter the training name</label>
          <input type="text" id="input-nameOftraining"   onChange={handleTrainingNameChange}/>
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
      {trainingName && <ExersizeForm trainingName={trainingName}/>}
    </>
  );
};

export default AddPlan;
