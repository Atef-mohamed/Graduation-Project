import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Swal from "sweetalert2";
import {
  fetchReportData,
  updateInbodyReport,
} from "../../../../rtk/TraineesSlice";
import { useParams } from "react-router-dom";
import url from "../../../../url.json";
const NextReport = () => {
  const [validated, setValidated] = useState(false);
  const [weight, setWeight] = useState("");
  const [smm, setSmm] = useState("");
  const [pbf, setPbf] = useState("");
  const [ecw, setecw] = useState("");
  const { reportChartData } = useSelector((state) => state.Trainees);
  const [activeLink, setActiveLink] = useState("");
  const dispatch = useDispatch();
  const param = useParams();
  const trainee_id = param.id;
  const token = localStorage.getItem("token");

  const handleweightChange = (e) => {
    const input = e.target.value;
    // if (!input.match(/^\d{5}$/)) {
    //   e.target.setCustomValidity("Enter validated number");
    // } else {
    //   e.target.setCustomValidity("");
    // }
    setWeight(input);
  };
  const handleSmmChange = (e) => {
    const input = e.target.value;
    // if (!input.match(/^\d{5}$/)) {
    //   e.target.setCustomValidity("Enter validated number");
    // } else {
    //   e.target.setCustomValidity("");
    // }
    setSmm(input);
  };
  const handlePbfChange = (e) => {
    const input = e.target.value;
    // if (!input.match(/^\d{5}$/)) {
    //   e.target.setCustomValidity("Enter validated number");
    // } else {
    //   e.target.setCustomValidity("");
    // }
    setPbf(input);
  };
  const handleEcwChange = (e) => {
    const input = e.target.value;
    // if (!input.match(/^\d{5}$/)) {
    //   e.target.setCustomValidity("Enter validated number");
    // } else {
    //   e.target.setCustomValidity("");
    // }
    setecw(input);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      setValidated(true);
      Swal.fire({
        title: "Are you sure to Save Data?",
        showDenyButton: true,
        confirmButtonText: "Yes",
        denyButtonText: "No",
        customClass: {
          title: "swal-title",
          confirmButton: "swal-confirm-button",
          denyButton: "swal-deny-button",
          popup: "swal-popup",
        },
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(
            updateInbodyReport({
              token,
              weight,
              smm,
              pbf,
              ecw,
              inbody_id: reportChartData?.second_month?.id,
            })
          );
          dispatch(fetchReportData({ trainee_id, token }));
          Swal.fire({
            title: "Saved!",
            icon: "success",
            showConfirmButton: false,
            showCancelButton: false,
            timer: 1500,
            customClass: {
              title: "swal-title-green",
              popup: "swal-popup",
            },
          });
          window.history.back();
        } else if (result.isDenied) {
          Swal.fire({
            title: "Data not saved",
            icon: "info",
            showConfirmButton: false,
            showCancelButton: false,
            timer: 1500,
            customClass: {
              title: "swal-title-green",
              confirmButton: "swal-confirm-button",
              popup: "swal-popup",
            },
          });
        }
      });
    }
  };
  useEffect(() => {
    if (reportChartData?.second_month == null) {
      Swal.fire({
        icon: "warning",
        title: "InBody Not Added",
        text: "The InBody was not added. Contact your client to send the InBody now.",
        confirmButtonText: "Ok",
        customClass: {
          title: "swal-title",
          confirmButton: "swal-confirm-button",
          popup: "swal-popup",
        },
      });
    }
  }, [reportChartData?.second_month]);
  const openPdfInNewTab = () => {
    const pdfUrl = `${url.url}/download/${reportChartData?.second_month?.inbody_pdf}`; // Replace with the actual path to your PDF
    window.open(pdfUrl, "_blank");
  };
  return (
    <>
      {reportChartData?.second_month == null ? (
        <>
          {/* {alert(
            "The Inbody was not added. Contact with your client to send InBody now"
          )} */}
        </>
      ) : (
        <>
          {reportChartData?.second_month?.SMM ? (
            <></>
          ) : (
            <>
              <div className="textViewInbody d-flex justify-content-center mt-3">
                <p className="d-flex flex-wrap ph">
                  In order to be able to create a report, you must read the
                  InBody and
                  <br />
                  enter the following data for the beginning of the month.
                </p>
                <p className="spanViewInBody" onClick={openPdfInNewTab}>
                  View InBody from here
                </p>
              </div>
              <div className="d-flex justify-content-center">
                <form className="p-5 " onSubmit={handleSubmit}>
                  <div className="row mt-4 d-flex flex-row justify-content-between">
                    <div className=" col-sm-12 col-md-6">
                      <label htmlFor="weight" className="pb-4">
                        Weight <span>(KG)</span>{" "}
                      </label>
                      {/* <br/> */}
                      <div className="input-logo">
                        <input
                          id="weight"
                          type="text"
                          placeholder="Enter the weight"
                          required
                          onChange={handleweightChange}
                        />
                      </div>
                    </div>
                    <div className=" col-sm-12 col-md-6 ">
                      <label htmlFor="smm">
                        SMM <span>(Kg)</span>{" "}
                      </label>
                      <br />
                      <small>*Skeletal Muscle Mass وزن الكتلة العضليه</small>
                      <div className="input-logo">
                        <input
                          id="smm"
                          type="text"
                          placeholder="Enter the SMM"
                          required
                          onChange={handleSmmChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row mt-4 d-flex flex-row justify-content-center">
                    <div className="col-sm-12 col-md-6">
                      <label htmlFor="pbf">
                        PBF <span>(%)</span>
                      </label>
                      <br />
                      <small>* Percent Body Fat نسبة الدهون بالجسم</small>
                      <div className="input-logo">
                        <input
                          required
                          id="pbf"
                          type="text"
                          placeholder="Enter the PBF"
                          onChange={handlePbfChange}
                        />
                      </div>
                    </div>
                    <div className="col-sm-12 col-md-6">
                      <label htmlFor="ecw" className="pb-4">
                        ECW Ratio{" "}
                      </label>
                      <div className="input-logo">
                        <input
                          id="ecw"
                          type="text"
                          placeholder="Enter the ECW"
                          required
                          onChange={handleEcwChange}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row mt-5 ">
                    {/* <div className="col-12 d-flex justify-content-center ">
                {loading && (
                  <div className="loader-overlay">
                    <div className="loader-container">
                      <div className="loader"></div>
                    </div>
                  </div>
                )}
              </div> */}

                    {/* {error && <h4 className="text-danger txt-res">{error}</h4>} */}
                  </div>
                  <div className="mt-4 mb-3 d-flex gap-4 justify-content-center">
                    <button type="submit" id="btn-save-report">
                      Save Data
                    </button>
                    <button
                      id="cancel-report"
                      // onClick={handelSubmit}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </>
          )}
        </>
      )}
    </>
  );
};

export default NextReport;
