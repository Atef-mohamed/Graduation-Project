import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { fetchGifList } from "../../../../../rtk/TraineesSlice";
import ExersizeForm from "./ExersizeForm";
import url from "../../../../../url.json";
const GifList = ({ Sports }) => {
  const [selectedGif, setSelectedGif] = useState(null);
  const [showExierSizeForm, setShowExierSizeForm] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  // useEffect(() => {
  //   dispatch(fetchGifList({ token }));
  //   // console.log(Sports);
  // }, [dispatch, token]);

  const handleGifClick = (gif) => {
    setSelectedGif(gif);
    setShowExierSizeForm(true);
    setIsOpen(true);
  };

  const handleCloseForm = () => {
    setIsOpen(false); // Close the ExersizeForm
  };

  return (
    <>
      {Sports.map((item, index) => (
        <div
          key={index}
          className="card-gif"
          onClick={() => handleGifClick(item)}
        >
          <img src={`${url.url}/img/${item}`} alt="gif Photo" />
        </div>
      ))}
      {showExierSizeForm && (
        <div id="exerSize-form">
          <ExersizeForm
            selectedGif={selectedGif}
            isOpen={isOpen}
            handleCloseForm={handleCloseForm}
          />
        </div>
      )}
    </>
  );
};

export default GifList;
