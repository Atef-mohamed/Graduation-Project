import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../css/Home.css";
import Pagination from "./Pagination/Pagination";
import { fetchProfileData } from "../../../rtk/Protfolio";
import { fetchTraineesList } from "../../../rtk/TraineesSlice";


import { useNavigate, useLocation } from "react-router-dom";
import TraineesList from "./Pagination/TraineesList";

const Home = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { CoachProfileData } = useSelector((state) => state.Profile);
  const { TraineesList: TraineeList, loading } = useSelector(
    (state) => state.Trainees
  );
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    dispatch(fetchProfileData({ token }));
    const searchParams = new URLSearchParams(location.search);
    const page = parseInt(searchParams.get("page")) || 1;
    setCurrentPage(page);
    dispatch(fetchTraineesList({ page, token }));
  }, [dispatch, location.search, token]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    navigate(`?page=${page}`);
    dispatch(fetchTraineesList({ page, token }));
  };

  // // Function to handle changes in the search input
  // const handleSearchInputChange = (event) => {
  //   setSearchQuery(event.target.value);
  // };
  const sortedTraineesLists = TraineeList?.msg?.data ?? [];
  console.log(sortedTraineesLists);
  const trainees_prePage = 6; // each page contain 6 client
  // const pages = Math.ceil(TraineeList?.msg.length / trainees_prePage);

  const pages = TraineeList?.msg?.last_page;
  const startIndex = (TraineeList?.msg?.current_page - 1) * trainees_prePage;
  const finishIndex = TraineeList?.msg?.current_page * trainees_prePage;
  // return trainees 6 for each page 1=>6
  // const orderedTraineesLists = sortedTraineesLists.slice(
  //   startIndex,
  //   finishIndex
  // );
  // console.log("order list",orderedTraineesLists);
  return (
    <>
      <div className="container d-flex justify-content-between">
        <h1 id="helloName">Hello {CoachProfileData?.msg?.fname ?? ""}👋🏼,</h1>
        {/* <div className="search__wrapper">
          <svg
            width="18"
            height="18"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9 9L13 13M5.66667 10.3333C3.08934 10.3333 1 8.244 1 5.66667C1 3.08934 3.08934 1 5.66667 1C8.244 1 10.3333 3.08934 10.3333 5.66667C10.3333 8.244 8.244 10.3333 5.66667 10.3333Z"
              stroke="#ffff"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <input
            type="search"
            //  value={searchQuery}
            //  onChange={handleSearchInputChange}
            placeholder="Search for anything..."
          />
        </div> */}
      </div>
      <div className="container client-card-pagination">
        <h4 className="client-title">All Clients</h4>
        <div className="client-cards ">
          {loading === true ? (
            <div className="loader-overlay">
              <div className="loader-container">
                <div className="loader"></div>
              </div>
            </div>
          ) : (
            ""
          )}
          <TraineesList Trainees={sortedTraineesLists} />
        </div>

        {sortedTraineesLists.length === 0 && (
          <div id="warning-trainee">There is No Trainee For you</div>
        )}
        <Pagination
          pages={pages}
          currentPage={currentPage}
          setCurrentPage={handlePageChange}
        />
      </div>
    </>
  );
};

export default Home;
