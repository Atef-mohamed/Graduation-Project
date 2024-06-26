import React, { useEffect } from "react";
import "../css/viewPlan.css";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchGifList } from "../../../../rtk/TraineesSlice";
import Swal from "sweetalert2";
const ViewPlan = () => {
  const { error } = useSelector((state) => state.Trainees);
  const location = useLocation();
  const traineeId = location.pathname.split("/")[4];
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  useEffect(() => {
    dispatch(fetchGifList({ token }));
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
      <div className="d-flex justify-content-center">
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
      </div>

      <div>
        <Outlet />
        {error && <h4 className="text-danger txt-res text-center">{error}</h4>}
      </div>
    </>
  );
};

export default ViewPlan;
