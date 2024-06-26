import React, { useEffect, useState } from "react";
import "../../css/addPlan.css";
import { useDispatch, useSelector } from "react-redux";
import GifList from "./GifList";
import Pagination from "../../Pagination/Pagination";
import ExersizeForm from "./ExersizeForm";
import {
  fetchGifList,
  fetchPlansData,
  trainName,
} from "../../../../../rtk/TraineesSlice";
import ChoosenGif from "./ChoosenGif";
import {
  Route,
  Routes,
  Switch,
  useLocation,
  useNavigate,
} from "react-router-dom";
import ActivePlans from "./ActivePlans";
import Swal from "sweetalert2";

const AddPlan = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { GifLists, loading, showPlansData, error } = useSelector(
    (state) => state.Trainees
  );
  const [trainingName, setTrainingName] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    if (error) {
      Swal.fire({
        title: "Oops..",
        text: `${error}`,
        icon: "error",
        showConfirmButton: false,
        showDenyButton: false,
        timer: 2000,
        customClass: {
          title: "swal-title-green",
          popup: "swal-popup",
        },
      });
    }
  }, [error]);
  const handleTrainingNameChange = (event) => {
    setTrainingName(event.target.value);
  };
  if (trainingName) {
    dispatch(trainName(trainingName));
  }
  // ---------------------------------------------
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("token");
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const page = parseInt(searchParams.get("page")) || 1;
    setCurrentPage(page);
    dispatch(fetchGifList({ page, token }));
  }, [dispatch, location.search, token]);
  // console.log(GifLists.data);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    navigate(`?page=${page}`);
    dispatch(fetchGifList({ page, token }));
  };

  // ----------------------------------------------
  //   fetch gif from api
  const sortedGifLists = GifLists.data;
  // console.log(GifLists.data);

  const sports_prePage = 8; // each page contain 6 client
  // const pages = Math.ceil(GifLists?.length / sports_prePage);
  const pages = GifLists.last_page;
  const startIndex = (currentPage - 1) * sports_prePage;
  const finishIndex = currentPage * sports_prePage;
  // return trainees 6 for each page 1=>6
  // const orderedGifLists = sortedGifLists?.slice(startIndex, finishIndex);
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
          {showPlansData && !showPlansData?.msg?.exercises?.length > 0 && (
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
                <GifList Sports={sortedGifLists} />
              </div>
              <Pagination
                pages={pages}
                currentPage={currentPage}
                setCurrentPage={handlePageChange}
              />
            </div>
          )}
          {showPlansData && !showPlansData?.msg?.exercises?.length > 0 && (
            <div className="container" id="gif-choose">
              <p className="red-linee">The GIF you choose</p>
              <ChoosenGif />
            </div>
          )}
          {showPlansData && showPlansData?.msg?.exercises?.length > 0 && (
            <div className="container" id="gif-choose">
              <p className="red-linee">{showPlansData?.msg?.name}</p>
              <ActivePlans />
            </div>
          )}
        </>
      )}
    </>
  );
};

export default AddPlan;
