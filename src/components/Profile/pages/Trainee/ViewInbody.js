import React, { useEffect } from "react";
import "../css/viewInBody.css";
import downloadLogo from "../../../../assets/downLoadInBody.svg";
import { useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ViewInbodyData } from "../../../../rtk/TraineesSlice";
const ViewInbody = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  // const trainee_id = location.pathname.split("/")[4];
  const params = useParams();

  const token = localStorage.getItem("token");
  const { inBodyData, error } = useSelector((state) => state.Trainees);
  useEffect(() => {
    dispatch(ViewInbodyData({ token, trainee_id: params.id }));
  }, []);
  return (
    <>
      {inBodyData && inBodyData.status === true && (
        <div className="container d-flex justify-content-around flex-row">
          <div className="d-flex flex-column justify-content-around gap-5">
            <div className="d-flex flex-column">
              <label>Age</label>
              <input
                className="inp-inbody"
                type="text"
                value={inBodyData?.msg?.age}
                disabled
              />
            </div>
            <div className="d-flex flex-column">
              <label>Tall</label>
              <input
                className="inp-inbody"
                type="text"
                value={`${inBodyData?.msg?.tall} Cm`}
                disabled
              />
            </div>
          </div>
          <div className="d-flex flex-column justify-content-around gap-5">
            <div className="d-flex flex-column">
              <label>Weight</label>
              <input
                className="inp-inbody"
                type="text"
                value={`${inBodyData?.msg?.weight} KG`}
                disabled
              />
            </div>
            <div className="d-flex flex-row align-items-center gap-5">
              <label>InBody report</label>
              {/* <img
              src={downloadLogo}
              alt=""
              style={{ width: "100px", cursor: "pointer" }}
            /> */}
              <a
                donload="download InBody"
                href={`https://exersize.loophole.site/api/download/${inBodyData?.msg?.inbody}`}
              >
                <img
                  src={downloadLogo}
                  alt=""
                  style={{ width: "100px", cursor: "pointer" }}
                  // onClick={handleDowm}
                />
              </a>
            </div>
          </div>
        </div>
      )}
      {inBodyData && inBodyData.status === false && (
        <div className="container text-center mt-5">
          <h2 className="text-danger">{inBodyData?.error_msg}</h2>
        </div>
      )}
    </>
  );
};

export default ViewInbody;
