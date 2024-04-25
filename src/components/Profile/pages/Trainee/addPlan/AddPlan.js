import React, { useState } from "react";
import "../../css/addPlan.css";
import { useSelector } from "react-redux";
import GifList from "./GifList";
import Pagination from "../../Pagination/Pagination";

const AddPlan = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { GifLists, loading } = useSelector((state) => state.Trainees);
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
      <div className="container">
        {/* <h4 className="client-title">All Clients</h4> */}
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
    </>
  );
};

export default AddPlan;
