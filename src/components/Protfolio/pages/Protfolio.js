import React, { useState } from "react";
import "./css/protfolio.css";
// import add from "../../../assets/add.jpg";
import add from "../../../assets/plus.svg";

import { Link, useNavigate } from "react-router-dom";
import AddProtfolio from "./AddProtflio/AddProtfolio";
import CardProtfolio from "./AddProtflio/CardProtfolio";

const Protfolio = ({ onNextStep }) => {
  const [showAddProtfolio, setShowAddProtfolio] = useState(false);
  const [showCardProtfolio, setShowCardProtfolio] = useState(false);
  const navigate = useNavigate();
  
  const handleShowAddProtfolio = () => {
    setShowAddProtfolio(true);
    setShowCardProtfolio(false);
    navigate("addProtfolio");
  };

  const handleSave = () => {
    setShowAddProtfolio(false);
    setShowCardProtfolio(true);
  };
  const handelNext = () => {
    onNextStep();
    navigate("addpackages");
  };
  return (
    <>
      <div
        className="container d-flex flex-column justify-content-center align-items-center"
        id="line-form"
      >
        <div
          id="personal-txt"
          className="d-flex justify-content-center flex-column align-items-center mt-3 text-center"
        >
          <h3>Add Your Portfolio</h3>
          <p>
            Placing portfolio in your account will help you get more clients by
            seeing the results on previous clients
          </p>
        </div>
        {showCardProtfolio && <CardProtfolio />}
        {showAddProtfolio ? (
          <AddProtfolio onSave={handleSave} />
        ) : (
          <div className="" id="add" onClick={handleShowAddProtfolio}>
            <img src={add} alt="" />
          </div>
        )}
        {!showAddProtfolio && !showCardProtfolio && (
          <button
            id="skip"
            onClick={() => {
              onNextStep();
            }}
          >
            Skip
          </button>
        )}
        {showCardProtfolio && (
          <button id="next" onClick={() => handelNext()}>
            Next
          </button>
        )}
      </div>
    </>
  );
};

export default Protfolio;
