import React, { useEffect, useState } from "react";
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import "../css/traineeDetails.css";
import backTo from "../../../../assets/BackTo.svg";
import startdate from "../../../../assets/startDate.svg";
import exdate from "../../../../assets/expiryDate.svg";
import chatIcon from "../../../../assets/chat.svg";
import url from "../../../../url.json";
import { useDispatch, useSelector } from "react-redux";
import { fetchTraineeData, traineeData } from "../../../../rtk/TraineesSlice";
import Swal from "sweetalert2";
const TraineeDetails = () => {
  console.log("url", url.url);
  const { loading, error, trainee } = useSelector((state) => state.Trainees);
  const [collapsePlan, setCollapsePlan] = useState(null);
  const [collapseInBody, setCollapseInBody] = useState(null);
  const [collapseviewSubscibe, setCollapseviewSubscibe] = useState(null);
  const navigate = useNavigate();
  const param = useParams();
  const token = localStorage.getItem("token");
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
  // const [trainee, setTrainee] = useState();
  const location = useLocation();
  // const trainee_id = location.pathname.split("/")[4];
  const dispatch = useDispatch();
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const id = params.id;
  //     const res = await axios.post(`${url.url}/coach/trainee/${id}`, {
  //       token,
  //     });
  //     setTrainee(res.data);
  localStorage.setItem("chat_id", trainee?.data?.msg?.chat_id);
  //     // dispatch(traineeData({ traineedata: res.data }));
  //     return res.data;
  //   };
  //   fetchData();
  //   window.scrollTo(0, 0);
  // }, []);
  useEffect(() => {
    const id = param.id;
    dispatch(fetchTraineeData({ id, token }));
    window.scrollTo(0, 0);
  }, [dispatch, param.id, token]);

  const handelExpand = () => {
    setCollapsePlan(!collapsePlan);
    // setCollapseInBody(false);
    navigate("viewPlan");

    document.body.classList.toggle("expand", !collapsePlan);
  };
  const handelExpandInbody = () => {
    setCollapseInBody(!collapseInBody);
    // setCollapsePlan(false);
    navigate("viewInbody");
    document.body.classList.toggle("expandInbody", !collapseInBody);
  };
  const handelExpandviewSubscibe = () => {
    setCollapseviewSubscibe(!collapseviewSubscibe);
    // setCollapsePlan(false);
    navigate("viewReport");
    document.body.classList.toggle("expandviewSubscibe", !collapseviewSubscibe);
  };
  const handelExpandChat = () => {
    navigate("chat");
  };
  return (
    <>
      <header className="container mb-3">
        <Link to="/profile/home">
          <img src={backTo} alt="" />
        </Link>
      </header>
      {loading && (
        <div className="loader-overlay">
          <div className="loader-container">
            <div className="loader"></div>
          </div>
        </div>
      )}
      {error === true ? (
        <h4 className="text-danger txt-res text-center">{error}</h4>
      ) : (
        <>
          {trainee && trainee.msg && (
            <div
              id="trainee-data"
              className="container p-4 d-flex justify-content-between"
            >
              <div className="content-left d-flex align-items-center">
                <img
                  src={`${url.url}/img/${trainee.msg.img}`}
                  width={"100px"}
                  alt=""
                />
                <h5 className="p-3">{trainee.msg.fname}</h5>
              </div>
              <div className="content-right d-flex flex-column justify-content-between">
                <div className="startDate d-flex gap-4 justify-content-between align-items-center">
                  <img src={startdate} alt="" className="mb-3" />
                  <p>Start date</p>
                  <p className="date">
                    {trainee.msg.start_date?.split(" ")[0]}
                  </p>
                </div>
                <div className="expiryDate d-flex justify-content-between align-items-center">
                  <img src={exdate} alt="" className="mb-3" />
                  <p>Expiry date</p>
                  <p className="date">{trainee.msg.end_date?.split(" ")[0]}</p>
                </div>
              </div>
            </div>
          )}
        </>
      )}
      <main className="container">
        {!collapseInBody && !collapseviewSubscibe && (
          <div
            className="viewPlan d-flex justify-content-between align-items-center mb-4"
            style={{ cursor: "pointer" }}
            onClick={handelExpand}
          >
            <p>View plan</p>
            <div className="expand-plan-btn">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M6.00979 2.72L10.3565 7.06667C10.8698 7.58 10.8698 8.42 10.3565 8.93333L6.00979 13.28" />
              </svg>
            </div>
          </div>
        )}

        {!collapsePlan && !collapseviewSubscibe && (
          <div
            className="viewInbody d-flex justify-content-between align-items-center mb-4"
            style={{ cursor: "pointer" }}
            onClick={handelExpandInbody}
          >
            <p>View inBody Data</p>
            <div className="expand-inBody-btn ">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M6.00979 2.72L10.3565 7.06667C10.8698 7.58 10.8698 8.42 10.3565 8.93333L6.00979 13.28" />
              </svg>
            </div>
          </div>
        )}
        {!collapsePlan && !collapseInBody && (
          <div
            className="viewSubscibe d-flex justify-content-between align-items-center mb-4"
            style={{ cursor: "pointer" }}
            onClick={handelExpandviewSubscibe}
          >
            <p>View Report</p>
            <div className="expand-viewSubscibe-btn ">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M6.00979 2.72L10.3565 7.06667C10.8698 7.58 10.8698 8.42 10.3565 8.93333L6.00979 13.28" />
              </svg>
            </div>
          </div>
        )}
      </main>

      {collapsePlan && <Outlet />}
      {collapseInBody && <Outlet />}
      {collapseviewSubscibe && <Outlet />}
      {/* {!collapseInBody&&!collapsePlan&&!collapseviewSubscibe&& <Chat />} */}
      <div id="chat">
        <img
          src={chatIcon}
          alt="chat-icon"
          style={{ cursor: "pointer" }}
          onClick={handelExpandChat}
        />
      </div>
    </>
  );
};

export default TraineeDetails;
