import React, { useEffect } from "react";
import "../css/viewPlan.css";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchGifList } from "../../../../rtk/TraineesSlice";
const ViewPlan = () => {
  const location = useLocation();
  const traineeId = location.pathname.split("/")[4];
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  useEffect(() => {
    dispatch(fetchGifList({ token }));
  }, []);
  return (
    <>
      <div className="d-flex justify-content-around">
        <Link
          to="currentMonth"
          className={
            location.pathname ===
              `/profile/home/trainee/${traineeId}/viewPlan/currentMonth/addPlans` ||
            location.pathname ===
              `/profile/home/trainee/${traineeId}/viewPlan/currentMonth/addPlans/satPlan` ||
            location.pathname ===
              `/profile/home/trainee/${traineeId}/viewPlan/currentMonth/addPlans/sunPlan` ||
            location.pathname ===
              `/profile/home/trainee/${traineeId}/viewPlan/currentMonth/addPlans/monPlan` ||
            location.pathname ===
              `/profile/home/trainee/${traineeId}/viewPlan/currentMonth/addPlans/tuePlan` ||
            location.pathname ===
              `/profile/home/trainee/${traineeId}/viewPlan/currentMonth/addPlans/wedPlan` ||
            location.pathname ===
              `/profile/home/trainee/${traineeId}/viewPlan/currentMonth/addPlans/thuPlan` ||
            location.pathname ===
              `/profile/home/trainee/${traineeId}/viewPlan/currentMonth/addPlans/friPlan` ||
            location.pathname ===
              `/profile/home/trainee/${traineeId}/viewPlan/currentMonth`
              ? "activeMonth linkMonth"
              : "deActivate linkMonth"
          }
        >
          Current month
        </Link>
        <Link
          to="nextMonth"
          className={
            location.pathname ===
            `/profile/home/trainee/${traineeId}/viewPlan/nextMonth`
              ? "activeMonth linkMonth"
              : "deActivate linkMonth"
          }
        >
          Next month
        </Link>
      </div>
      <div>
        <Outlet />
      </div>
    </>
  );
};

export default ViewPlan;
