import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTraineesList } from "../../../../rtk/TraineesSlice";
import { useNavigate, Link, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import "../../css/Home.css";
import url from "../../../../url.json";
const TraineesList = ({ Trainees }) => {
  //   const { TraineesList } = useSelector((state) => state.Trainees);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const { error, loading } = useSelector((state) => state.Profile);

  // useEffect(() => {
  //   dispatch(fetchTraineesList({ token }));
  // }, [dispatch, token]);
  const params = useParams();
  // const handelcard = () => {
  //   navigate(`trainee/${params.id}`);
  // };
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
  // console.log("urlllllll"`${url.url}/img/${trainee.img}`);
  return (
    <>
      {Trainees.map((trainee) => (
        <Link
          to={`trainee/${trainee.id}`}
          key={trainee.id}
          className="card-client"
        >
          <img src={`${url.url}/img/${trainee.img}`} alt="Profile Photo" />
          <h3 className="client-name">{trainee.fname}</h3>
        </Link>
      ))}
      {error && (
        <div
          className="alert alert-danger text-center"
          style={{ fontWeight: "bold" }}
        >
          {error}
        </div>
      )}
    </>
  );
};

export default TraineesList;
