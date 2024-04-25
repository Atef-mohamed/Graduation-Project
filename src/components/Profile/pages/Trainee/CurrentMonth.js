import React, { useState } from "react";
import add from "../../../../assets/plus.svg";
import "../css/currentMonth.css";
import AddPlans from "./addPlan/AddPlans";
import { Link, NavLink, Outlet } from "react-router-dom";
const CurrentMonth = () => {
  const [addPlan, setAddplan] = useState(false);
  const handleaddPlan = () => {
    setAddplan(true);
  };
  return (
    <>
      {!addPlan && (
        <div className="d-flex justify-content-center align-items-center flex-column  p-5 mt-5">
          <h4 id="noPlan">
            There is no plan yet. Please add a plan for your client
          </h4>
          <Link to="addPlans" id="add" onClick={handleaddPlan}>
            <img src={add} alt="" />
          </Link>
        </div>
      )}
      {addPlan && (
        <div>
          <AddPlans />
        </div>
      )}
    </>
  );
};

export default CurrentMonth;
