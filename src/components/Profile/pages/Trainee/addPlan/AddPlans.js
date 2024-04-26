import React, { useState } from "react";
import "../../css/addPlans.css";
import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useParams,
} from "react-router-dom";
import ExersizeForm from "./ExersizeForm";
import AddPlan from "./AddPlan";

const AddPlans = () => {
  const [showChooseDay, setShowChooseDay] = useState(true);
  const [day, setDay] = useState("");

  const handleLinkClick = (day) => {
    setDay(day);
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
            onClick={() => handleLinkClick("saturday")}
          >
            Saturday
          </NavLink>
          <NavLink
            to="sunPlan"
            className="link-sidePlans"
            onClick={() => handleLinkClick("sunday")}
          >
            Sunday
          </NavLink>
          <NavLink
            to="monPlan"
            className="link-sidePlans"
            onClick={() => handleLinkClick("monday")}
          >
            Monday
          </NavLink>
          <NavLink
            to="tuePlan"
            className="link-sidePlans"
            onClick={() => handleLinkClick("tuesday")}
          >
            Tuesday
          </NavLink>
          <NavLink
            to="wedPlan"
            className="link-sidePlans"
            onClick={() => handleLinkClick("wednesday")}
          >
            Wednesday
          </NavLink>
          <NavLink
            to="thuPlan"
            className="link-sidePlans"
            onClick={() => handleLinkClick("thurday")}
          >
            Thursday
          </NavLink>
          <NavLink
            to="friPlan"
            className="link-sidePlans"
            onClick={() => handleLinkClick("friday")}
          >
            Friday
          </NavLink>
        </div>
        {showChooseDay && <h4 id="choose">Please choose the day first</h4>}

        {!showChooseDay && (
          <div className="outLet">
            <Outlet />
            {/* <AddPlan day={day} /> */}
          </div>
        )}
        <ExersizeForm day={day} />
      </div>
    </>
  );
};

export default AddPlans;
