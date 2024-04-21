import React, { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import "./traineeDetails.css";
import backTo from "../../../../assets/BackTo.svg";
import av from "../../../../assets/skill2.jpg";
import startdate from "../../../../assets/startDate.svg";
import exdate from "../../../../assets/expiryDate.svg";
// import ViewPlanIcon from "./pages/ViewPlanIcon";
const TraineeDetails = () => {
  //   const [collapse, setCollapse] = useState(false);
  const [collapsePlan, setCollapsePlan] = useState(false);
  const [collapseInBody, setCollapseInBody] = useState(false);
  const [collapseviewSubscibe, setCollapseviewSubscibe] = useState(false);
  const navigation = useNavigate();
  const handelExpand = () => {
    setCollapsePlan(!collapsePlan);
    setCollapseInBody(false);
    navigation("/profile/home/trainee/viewPlan");

    document.body.classList.toggle("expand");
  };
  const handelExpandInbody = () => {
    setCollapseInBody(!collapseInBody);
    setCollapsePlan(false);
    navigation("/profile/home/trainee/viewInbody");
    document.body.classList.toggle("expandInbody");
  };
  const handelExpandviewSubscibe = () => {
    setCollapseviewSubscibe(!collapseviewSubscibe);
    setCollapsePlan(false);
    navigation("/profile/home/trainee/viewSubscibe");
    document.body.classList.toggle("expandviewSubscibe");
  };
  return (
    <>
      <header className="container mb-3">
        <Link to="/profile/home">
          <img src={backTo} alt="" />
        </Link>
      </header>
      <div
        id="trainee-data"
        className="container p-4 d-flex justify-content-between"
      >
        <div className="content-left d-flex align-items-center">
          <img src={av} width={"100px"} alt="" />
          <h5 className="p-3">Atef Mohamed</h5>
        </div>
        <div className="content-right d-flex flex-column justify-content-between">
          <div className="startDate d-flex gap-4 justify-content-between align-items-center">
            <img src={startdate} alt="" className="mb-3" />
            <p>Start date</p>
            <p className="date">04 . 03 . 2024</p>
          </div>
          <div className="expiryDate d-flex justify-content-between align-items-center">
            <img src={exdate} alt="" className="mb-3" />
            <p>Expiry date</p>
            <p className="date">04 . 04 . 2024</p>
          </div>
        </div>
      </div>
      <main className="container">
        {!collapseInBody && !collapseviewSubscibe && (
          <div
            className="viewPlan d-flex justify-content-between align-items-center mb-4"
            style={{ cursor: "pointer" }}
            onClick={handelExpand}
          >
            <p>View plan</p>
            <div className="expand-plan-btn">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M6.00979 2.72L10.3565 7.06667C10.8698 7.58 10.8698 8.42 10.3565 8.93333L6.00979 13.28" />
              </svg>
            </div>
          </div>
        )}

        {!collapsePlan && !collapseviewSubscibe && (
          <div
            className="viewInbody d-flex justify-content-between align-items-center mb-4"
            style={{ cursor: "pointer" }}
            onClick={handelExpandInbody}
          >
            <p>View inBody Data</p>
            <div className="expand-inBody-btn ">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M6.00979 2.72L10.3565 7.06667C10.8698 7.58 10.8698 8.42 10.3565 8.93333L6.00979 13.28" />
              </svg>
            </div>
          </div>
        )}
        {!collapsePlan && !collapseInBody && (
          <div
            className="viewSubscibe d-flex justify-content-between align-items-center mb-4"
            style={{ cursor: "pointer" }}
            onClick={handelExpandviewSubscibe}
          >
            <p>View Report</p>
            <div className="expand-viewSubscibe-btn ">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M6.00979 2.72L10.3565 7.06667C10.8698 7.58 10.8698 8.42 10.3565 8.93333L6.00979 13.28" />
              </svg>
            </div>
          </div>
        )}
      </main>
      {collapsePlan && <Outlet />}
      {collapseInBody && <Outlet />}
      {collapseviewSubscibe && <Outlet />}
    </>
  );
};

export default TraineeDetails;
