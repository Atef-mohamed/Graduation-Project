import React, { useEffect, useState } from "react";
import { Link, Outlet, useParams } from "react-router-dom";
import "../css/viewReport.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchReportData } from "../../../../rtk/TraineesSlice";
import { BarChart } from "@mui/x-charts/BarChart";
import trueIcon from "../../../../assets/true.svg";
import Swal from "sweetalert2";
const ViewReport = () => {
  const { reportChartData, error } = useSelector((state) => state.Trainees);
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
          Current month {reportChartData?.first_month?.created_at.split(" ")[0]}
          {reportChartData?.first_month?.SMM ? (
            <img src={trueIcon} alt="" width="40px" height="40px" />
          ) : (
            <></>
          )}
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
          Next month {reportChartData?.second_month?.created_at.split(" ")[0]}
          {reportChartData?.second_month?.SMM ? (
            <img src={trueIcon} alt="" width="40px" height="40px" />
          ) : (
            <></>
          )}
        </Link>
      </div>
      <Outlet />
      <div id="Report" className="mt-4">
        <div className="inbody-line d-flex  ms-5">
          <p>Report</p>
        </div>
        <div className="d-flex flex-column align-items-center">
          {reportChartData?.first_month == null ? (
            <>
              <p id="repo1">There is no reports yet.</p>
              <p id="repo2">Please enter data above</p>
            </>
          ) : (
            <BarChart
              series={reportChartData.dataset}
              height={290}
              xAxis={[
                { data: reportChartData.data_variables, scaleType: "band" },
              ]}
              margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
            />
          )}
        </div>
        {/* chart heeeeeeeeeeeeeeeeeeerrrrrrrrrrreeeeeeeeee */}
      </div>
    </>
  );
};

export default ViewReport;
