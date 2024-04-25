import React, { useState } from "react";
import "../../css/addPlans.css";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";

const AddPlans = () => {
  const [showChooseDay, setShowChooseDay] = useState(true);
  const location = useLocation();

  const handleLinkClick = () => {
    setShowChooseDay(false);
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
            to="satPlan"
            // style={{navDayStyle}}
            className="link-sidePlans"
            onClick={handleLinkClick}
          >
            Saturday
          </NavLink>
          <NavLink
            to="sunPlan"
            className="link-sidePlans"
            onClick={handleLinkClick}
          >
            Sunday
          </NavLink>
          <NavLink
            to="monPlan"
            className="link-sidePlans"
            onClick={handleLinkClick}
          >
            Monday
          </NavLink>
          <NavLink
            to="tuePlan"
            className="link-sidePlans"
            onClick={handleLinkClick}
          >
            Tuesday
          </NavLink>
          <NavLink
            to="wedPlan"
            className="link-sidePlans"
            onClick={handleLinkClick}
          >
            Wednesday
          </NavLink>
          <NavLink
            to="thuPlan"
            className="link-sidePlans"
            onClick={handleLinkClick}
          >
            Thursday
          </NavLink>
          <NavLink
            to="friPlan"
            className="link-sidePlans"
            onClick={handleLinkClick}
          >
            Friday
          </NavLink>
        </div>
        {showChooseDay && <h4 id="choose">Please choose the day first</h4>}

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
