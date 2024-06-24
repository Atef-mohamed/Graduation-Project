import React, { useEffect, useState } from "react";
import add from "../../../../assets/plus.svg";
import "../css/currentMonth.css";
import AddPlans from "./addPlan/AddPlans";
import { Link, NavLink, Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchPlansData } from "../../../../rtk/TraineesSlice";
import url from "../../../../url.json";
import axios from "axios";
const CurrentMonth = () => {
  const [addPlan, setAddplan] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();
  const trainee_id = location.pathname.split("/")[4];
  const token = localStorage.getItem("token");
  const [trainee, setTrainee] = useState();
  const params = useParams();
  const navigate = useNavigate();
  const handleaddPlan = () => {
    setAddplan(true);
  };
  useEffect(() => {
    const fetchData = async () => {
      const id = params.id;
      const res = await axios.post(`${url.url}/coach/trainee/${params.id}`, {
        token,
        id,
      });
      setTrainee(res.data);
      if (res.data.msg.has_plan) {
        setAddplan(true);
      }
      return res.data;
    };

    fetchData();
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    if (addPlan) {
      navigate(`addPlans`);
    }
  }, [addPlan, navigate, trainee_id]);
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
    </>
  );
};

export default CurrentMonth;
