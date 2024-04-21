import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../css/Home.css";
import avatar from "../../../assets/skill2.jpg";
import Pagination from "./Pagination/Pagination";
import { fetchProfileData, fetchTraineesList } from "../../../rtk/Protfolio";
import { NavLink, Outlet, Link, useNavigate } from "react-router-dom";

const Home = () => {
  const [currentPage, setCurrentPage] = useState(1);
  // const [searchQuery, setSearchQuery] = useState("");
  const { CoachProfileData } = useSelector((state) => state.Profile);
  const { TraineesList } = useSelector((state) => state.Profile);
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const token = localStorage.getItem("token");
  useEffect(() => {
    dispatch(fetchProfileData({ token }));
    dispatch(fetchTraineesList({ token }));
    console.log(TraineesList);
  }, []);
  const handelcard = () => {
    navigation("/profile/home/trainee");
  };
  // // Function to handle changes in the search input
  // const handleSearchInputChange = (event) => {
  //   setSearchQuery(event.target.value);
  // };
  const clientDataList = 30; //length of data
  const client_prePage = 6; // each page contain 6 client
  // const pages=Math.ceil(clientDataList.length/client_prePage);
  const pages = 7; //number of pages
  const startIndex = (currentPage - 1) * client_prePage;
  const finishIndex = currentPage * client_prePage;
  // const orderedClients=clientDataList.slice(startIndex,finishIndex);
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
          <div className="card-client" onClick={handelcard}>
            <img src={avatar} alt="Profile Photo" />
            <h3 className="client-name">Atef Mohamed</h3>
            {/* <Link to="/profile/home/trainee"  className="btn btn-dark">Show</Link> */}
          </div>
          <div className="card-client">
            <img src={avatar} alt="Profile Photo" />
            <h3 className="client-name">Atef Mohamed</h3>
          </div>
          <div className="card-client">
            <img src={avatar} alt="Profile Photo" />
            <h3 className="client-name">Atef Mohamed</h3>
          </div>
          <div className="card-client">
            <img src={avatar} alt="Profile Photo" />
            <h3 className="client-name">Atef Mohamed</h3>
          </div>
          <div className="card-client">
            <img src={avatar} alt="Profile Photo" />
            <h3 className="client-name">Atef Mohamed</h3>
          </div>
          <div className="card-client">
            <img src={avatar} alt="Profile Photo" />
            <h3 className="client-name">Atef Mohamed</h3>
          </div>
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
        {/* <ClientList clietns={orderedClients}/> */}
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
