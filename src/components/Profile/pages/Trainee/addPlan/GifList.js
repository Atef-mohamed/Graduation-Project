import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  fetchGifList,
  fetchTraineesList,
} from "../../../../../rtk/TraineesSlice";

const GifList = ({ Sports }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  useEffect(() => {
    dispatch(fetchGifList({ token }));
    console.log(Sports);
  }, [dispatch, token]);

  //   const handelcard = () => {
  //     navigate("/profile/home/trainee");
  //   };
  return (
    <>
      {Sports.map((item, index) => (
        <Link to={`/${item}`} key={index} className="card-gif">
          <img
            src={`https://above-elk-open.ngrok-free.app/api/img/${item}`}
            alt="gif Photo"
          />
        </Link>
      ))}
    </>
  );
};

export default GifList;
