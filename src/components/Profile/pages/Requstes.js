import React, { useEffect, useState } from "react";
import acceptLogo from "../../../assets/acceptRequest.svg";
import rejectLogo from "../../../assets/rejectequest.svg";
import note from "../../../assets/Note.svg";
import "../css/requests.css";
import { useDispatch, useSelector } from "react-redux";
import {
  acceptRequest,
  fetchRequests,
  rejectRequest,
} from "../../../rtk/TraineesSlice";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Alert } from "react-bootstrap";
import url from "../../../url.json";
const Requstes = () => {
  const { requestsData, acceptRequestData, rejectRequestData, loading, error } =
    useSelector((state) => state.Trainees);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const [filter, setFilter] = useState("all");
  useEffect(() => {
    dispatch(fetchRequests({ token }));
  }, [acceptRequestData, rejectRequestData]);
  const handleAcceptRequest = (request_id) => {
    Swal.fire({
      title: "Are you sure you want to accept the request?",
      showDenyButton: true,
      confirmButtonText: "yes",
      denyButtonText: `No`,
      customClass: {
        title: "swal-title",
        confirmButton: "swal-deny-button",
        denyButton: " swal-confirm-button",
        popup: "swal-popup",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(acceptRequest({ token, request_id }));
        Swal.fire({
          title: "The request has been accepted",
          icon: "success",
          showConfirmButton: false,
          showDenyButton: false,
          timer: 1500,
          customClass: {
            title: "swal-title-green",
            popup: "swal-popup",
          },
        });
      }
    });
  };
  const handleRejectRequest = (request_id) => {
    Swal.fire({
      title: "Are you sure you want to reject the request?",
      showDenyButton: true,
      confirmButtonText: "yes",
      denyButtonText: `No`,
      customClass: {
        title: "swal-title",
        confirmButton: "swal-deny-button",
        denyButton: " swal-confirm-button",
        popup: "swal-popup",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(rejectRequest({ token, request_id }));
        Swal.fire({
          title: "The request has been rejected",
          icon: "error",
          showConfirmButton: false,
          showDenyButton: false,
          timer: 1500,
          customClass: {
            title: "swal-title-green",
            popup: "swal-popup",
          },
        });
      }
    });
  };
  const filteredRequests = requestsData?.msg?.filter((item) => {
    if (filter === "all") return true;
    return item.payment_status === filter;
  });
  return (
    <>
      <div className="container d-flex flex-column justify-content-center flex-wrap  ">
        <div className="filter-buttons d-flex flex-wrap">
          {/* Filter buttons */}
          <button
            className={`filter-btn ${filter === "all" ? "active-req" : ""}`}
            onClick={() => setFilter("all")}
          >
            All
          </button>
          <button
            className={`filter-btn ${filter === null ? "active-req" : ""}`}
            onClick={() => setFilter(null)}
          >
            Pending
          </button>
          <button
            className={`filter-btn ${
              filter === "ACCEPTED" ? "active-req" : ""
            }`}
            onClick={() => setFilter("ACCEPTED")}
          >
            Accepted
          </button>
          <button
            className={`filter-btn ${
              filter === "REJECTED" ? "active-req" : ""
            }`}
            onClick={() => setFilter("REJECTED")}
          >
            Rejected
          </button>
          <button
            className={`filter-btn ${
              filter === "COMPLETED" ? "active-req" : ""
            }`}
            onClick={() => setFilter("COMPLETED")}
          >
            Completed
          </button>
          <button
            className={`filter-btn ${
              filter === "UNSUBSCRIBED" ? "active-req" : ""
            }`}
            onClick={() => setFilter("UNSUBSCRIBED")}
          >
            Unsubscribed
          </button>
        </div>
        {requestsData?.msg?.length === 0 && (
          <div id="warning-trainee" className="mt-5">
            There is No Requstes For you!
          </div>
        )}
        {requestsData &&
          requestsData?.msg?.length > 0 &&
          requestsData?.status === true &&
          filteredRequests.map((item, index) => (
            <>
              <div className="req-card" key={item.trainee_id}>
                <div
                  className="Lhs d-flex align-items-center gap-3"
                  key={index}
                >
                  <img
                    src={`${url.url}/img/${item.img}`}
                    // style={{ borderRadius: "50%" }}
                    // width={"100px"}
                    alt="trainee img"
                    id="trainee-img"
                  />
                  <div>
                    <h5 className="trainee-name">{`${item.fname} ${item.lname}`}</h5>
                    <p className="p-Req">
                      <span className="yellow-color">Package: </span>{" "}
                      {item.number_of_months} Month
                    </p>
                  </div>
                </div>
                <div className="Rhs d-flex flex-column gap-2">
                  {/* null */}
                  {item.payment_status === null && (
                    <>
                      <div className="d-flex align-items-center gap-2">
                        <img
                          src={acceptLogo}
                          alt="accepet logo"
                          style={{ cursor: "pointer", marginBottom: "10px" }}
                          onClick={() => handleAcceptRequest(item.id)}
                        />
                        <p className="p-Req">Accept request</p>
                      </div>
                      <div className="d-flex align-items-center gap-2">
                        <img
                          src={rejectLogo}
                          alt=""
                          style={{ cursor: "pointer", marginBottom: "10px" }}
                          onClick={() => handleRejectRequest(item.id)}
                        />
                        <p className="p-Req">Reject request</p>
                      </div>
                    </>
                  )}
                  {/* Accepted */}
                  {item.payment_status === "ACCEPTED" && (
                    <div className="d-flex align-items-center gap-2">
                      <img
                        src={acceptLogo}
                        alt=""
                        style={{ cursor: "pointer", marginBottom: "10px" }}
                      />
                      <p className="yellow-color" style={{ fontWeight: "600" }}>
                        The request has been approved and <br /> the trainee is
                        awaiting participation
                      </p>
                    </div>
                  )}
                  {/* Rejected */}
                  {item.payment_status === "REJECTED" && (
                    <div className="d-flex align-items-center gap-2">
                      <img
                        src={rejectLogo}
                        alt=""
                        style={{ cursor: "pointer", marginBottom: "10px" }}
                      />
                      <p className="yellow-color" style={{ fontWeight: "600" }}>
                        The request was rejected
                      </p>
                    </div>
                  )}
                  {/* Completed */}
                  {item.payment_status === "COMPLETED" && (
                    <div className="d-flex flex-column align-items-center gap-2">
                      <div className="d-flex align-items-center">
                        <img
                          src={note}
                          alt=""
                          style={{ cursor: "pointer", marginBottom: "10px" }}
                        />
                        <p className="p-Req">
                          The trainee paid the subscription
                        </p>
                      </div>
                      <div>
                        <p
                          className="yellow-color"
                          style={{ fontWeight: "600" }}
                        >
                          Please, make the appropriate plan for him
                        </p>
                      </div>
                      <button
                        id="btn-view"
                        onClick={() =>
                          navigate(`/profile/home/trainee/${item.trainee_id}`)
                        }
                      >
                        View Trainee Data
                      </button>
                    </div>
                  )}
                  {/* UNSUBSCRIBED */}
                  {item.payment_status === "UNSUBSCRIBED" && (
                    <div className="d-flex align-items-center gap-2">
                      <img
                        src={rejectLogo}
                        alt=""
                        style={{ cursor: "pointer", marginBottom: "10px" }}
                      />
                      <p className="yellow-color" style={{ fontWeight: "600" }}>
                        The trinee is UNSUBSCRIBED
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {error && (
                <Alert variant="danger" dismissible>
                  <Alert.Heading>Oh! You got an error!</Alert.Heading>
                  <h3>{error}</h3>
                </Alert>
              )}
            </>
          ))}
      </div>
      {loading && (
        <div className="loader-overlay">
          <div className="loader-container">
            <div className="loader"></div>
          </div>
        </div>
      )}
    </>
  );
};

export default Requstes;
