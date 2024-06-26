// src\components\Profile\pages\MyProtfoilo.js
import React from "react";
import CardProtfolio from "../../Protfolio/pages/AddProtflio/CardProtfolio";
import add from "../../../assets/plus.svg";
import myprotfolio from "../../../assets/myprotfolio.svg";

//start
import { useNavigate } from "react-router-dom";

const MyProtfoilo = () => {
  const navigate = useNavigate();
  const AddProtflio = () => {
    navigate("/profile/myProtfolio/protfolioAdd");
  };
  // end

  return (
    <>
      <div className="ms-5">
          <img src={myprotfolio} alt=""  />
        </div>
      <div
        className="container d-flex flex-column justify-content-center align-items-center mt-5"
        // style={{width:"70%"}}
      >
        <div
          id="personal-txt"
          className="d-flex justify-content-center flex-column align-items-center mt-3 text-center"
        ></div>
        <CardProtfolio />
        {/* start */}
        <div className="" id="add" onClick={AddProtflio}>
          <img src={add} alt="" />
        </div>
        {/* end */}
      </div>
    </>
  );
};

export default MyProtfoilo;
