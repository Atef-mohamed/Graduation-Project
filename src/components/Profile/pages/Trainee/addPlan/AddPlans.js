import React, { useState } from "react";
import "../../css/addPlans.css";
import { Link, NavLink, Outlet, useLocation, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  activeDay,
  fetchPlansData,
  removeAllPlans,
} from "../../../../../rtk/TraineesSlice";

const AddPlans = () => {
  const [showChooseDay, setShowChooseDay] = useState(true);
  const [day, setDay] = useState("");
  const dispatch = useDispatch();
  const location = useLocation();
  // const trainee_id = location.pathname.split("/")[4];
  const params = useParams();
  const token = localStorage.getItem("token");
  const handleLinkClick = (day) => {
    setDay(day);
    setShowChooseDay(false);
    dispatch(activeDay(day));
    dispatch(removeAllPlans());
    dispatch(fetchPlansData({ trainee_id:params.id, day, token }));
  };

  //   const navDayStyle = ({ isActive }) => {
  //     return {
  //       color: isActive ? "red" : "blue",
  //       bacgoundColor: isActive ? "black" : "",
  //     };
  //   };

  return (
    <>
      <div className="container" id="add-Plans">
        <div id="plans-sideBar">
          <NavLink
            to="saturday"
            // style={{navDayStyle}}
            className="link-sidePlans"
            onClick={() => handleLinkClick("saturday")}
          >
            Saturday
          </NavLink>
          <NavLink
            to="sunday"
            className="link-sidePlans"
            onClick={() => handleLinkClick("sunday")}
          >
            Sunday
          </NavLink>
          <NavLink
            to="monday"
            className="link-sidePlans"
            onClick={() => handleLinkClick("monday")}
          >
            Monday
          </NavLink>
          <NavLink
            to="tuesday"
            className="link-sidePlans"
            onClick={() => handleLinkClick("tuesday")}
          >
            Tuesday
          </NavLink>
          <NavLink
            to="wednesday"
            className="link-sidePlans"
            onClick={() => handleLinkClick("wednesday")}
          >
            Wednesday
          </NavLink>
          <NavLink
            to="thurday"
            className="link-sidePlans"
            onClick={() => handleLinkClick("thurday")}
          >
            Thursday
          </NavLink>
          <NavLink
            to="friday"
            className="link-sidePlans"
            onClick={() => handleLinkClick("friday")}
          >
            Friday
          </NavLink>
        </div>
        {showChooseDay && (
          <h4 id="choose" className="" style={{ marginTop: "-500px" }}>
            Please choose the day first
          </h4>
        )}
        {!showChooseDay && (
          <div className="outLet">
            <Outlet />
          </div>
        )}
      </div>
    </>
  );
};

export default AddPlans;
