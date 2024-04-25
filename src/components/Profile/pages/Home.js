import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../css/Home.css";
import avatar from "../../../assets/skill2.jpg";
import Pagination from "./Pagination/Pagination";
import { fetchProfileData } from "../../../rtk/Protfolio";
import { fetchTraineesList } from "../../../rtk/TraineesSlice";
import { NavLink, Outlet, Link, useNavigate } from "react-router-dom";
import TraineesList from "./Pagination/TraineesList";

const Home = () => {
  const [currentPage, setCurrentPage] = useState(1);
  // const [searchQuery, setSearchQuery] = useState("");
  const { CoachProfileData } = useSelector((state) => state.Profile);
  const { TraineesList: TraineeList, loading } = useSelector(
    (state) => state.Trainees
  );
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  useEffect(() => {
    dispatch(fetchProfileData({ token }));
    // dispatch(fetchTraineesList({ token }));
  }, []);
 
  // // Function to handle changes in the search input
  // const handleSearchInputChange = (event) => {
  //   setSearchQuery(event.target.value);
  // };
  const sortedTraineesLists = TraineeList?.msg ?? [];
  const trainees_prePage = 6; // each page contain 6 client
  const pages = Math.ceil(TraineeList?.msg.length / trainees_prePage);
  // const pages = 30;
  const startIndex = (currentPage - 1) * trainees_prePage;
  const finishIndex = currentPage * trainees_prePage;
  // return trainees 6 for each page 1=>6
  const orderedTraineesLists = sortedTraineesLists.slice(
    startIndex,
    finishIndex
  );
  return (
    <>
      <div className="container d-flex justify-content-between">
        <h1 id="helloName">Hello {CoachProfileData?.msg?.fname ?? ""}👋🏼,</h1>
        <div className="search__wrapper">
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
        </div>
      </div>
      <div className="container client-card-pagination">
        <h4 className="client-title">All Clients</h4>
        <div className="client-cards ">
          {loading === true ? (
            <div className="loader d-flex flex-column"></div>
          ) : (
            ""
          )}
          <TraineesList Trainees={orderedTraineesLists} />

          {/* <ClientList clietns={orderedClients}/> */}
          {/* Filter client cards based on search query */}
          {/* {clientData
            .filter((client) =>
              client.name.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .map((client, index) => (
              <div className="card-client" key={index}>
                <img src={avatar} alt="Profile Photo" />
                <h3>{client.name}</h3>
              </div>
            ))} */}
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

export default Home;
