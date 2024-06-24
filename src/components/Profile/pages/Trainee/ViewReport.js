import React, { useEffect, useState } from "react";
import { NavLink, Link, Outlet, useParams } from "react-router-dom";
import "../css/viewReport.css";
import { useDispatch } from "react-redux";
import { fetchReportData } from "../../../../rtk/TraineesSlice";

const ViewReport = () => {
  const [activeLink, setActiveLink] = useState("");
  const dispatch = useDispatch();
  const handleLinkClick = (link) => {
    setActiveLink(link);
  };
  const param = useParams();
  const trainee_id = param.id;
  const token = localStorage.getItem("token");
  // fetch report data
  useEffect(() => {
    dispatch(fetchReportData({ trainee_id, token }));
  }, []);
  return (
    <>
      <div className="inbody-line">
        <p>InBody Information</p>
      </div>
      <div className="d-flex justify-content-evenly">
        <Link
          to="currentMonth"
          className={
            activeLink === "currentMonth"
              ? "activereport textReport"
              : "textReport"
          }
          onClick={() => handleLinkClick("currentMonth")}
        >
          Current month (04 . 03 . 2024)
        </Link>
        <Link
          to="nextMonth"
          className={
            activeLink === "nextMonth"
              ? "activereport textReport"
              : "textReport"
          }
          onClick={() => handleLinkClick("nextMonth")}
        >
          Next month (04 . 03 . 2024)
        </Link>
      </div>
      <Outlet />
      <div id="Report" className="mt-4">
        <div className="inbody-line d-flex  ms-5">
          <p>Report</p>
        </div>
        <div className="d-flex flex-column align-items-center">
          <p id="repo1">There is no reports yet.</p>
          <p id="repo2">Please enter data above</p>
        </div>
    {/* chart heeeeeeeeeeeeeeeeeeerrrrrrrrrrreeeeeeeeee */}
        <div className="chart"></div>
      </div>
    </>
  );
};

export default ViewReport;
