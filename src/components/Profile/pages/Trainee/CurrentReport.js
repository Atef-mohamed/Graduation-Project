import React, { useState } from "react";

import Swal from "sweetalert2";

const CurrentReport = () => {
  const [validated, setValidated] = useState(false);
  const [weight , setWeight ] = useState("");
  const [smm, setSmm] = useState("");
  const [pbf, setPbf] = useState("");
  const [ecw, setecw] = useState("");

  const handleweightChange = (e) => {
    const input = e.target.value;
    if (!input.match(/^[a-zA-Z\s]*$/)) {
      e.target.setCustomValidity("Enter validated Name");
    } else {
      e.target.setCustomValidity("");
    }
    setWeight(input);
  };
  const handleSmmChange = (e) => {
    const input = e.target.value;
    if (!input.match(/^[a-zA-Z\s]*$/)) {
      e.target.setCustomValidity("Enter validated Name");
    } else {
      e.target.setCustomValidity("");
    }
    setSmm(input);
  };
  const handlePbfChange = (e) => {
    let input = e.target.value;
    // Remove any non-digit characters
    input = input.replace(/\D/g, "");

    // Limit input to two digits
    input = input.slice(0, 2);

    e.target.value = input; // Update the input field value

    if (!input.match(/^\d{0,2}$/)) {
      e.target.setCustomValidity("Please enter a maximum of 2 digits");
    } else {
      e.target.setCustomValidity("");
    }

    setPbf(input);
  };
  const handleEcwChange = (e) => {
    let input = e.target.value;
    // Remove any non-digit characters
    input = input.replace(/\D/g, "");

    // Limit input to two digits
    input = input.slice(0, 2);

    e.target.value = input; // Update the input field value

    if (!input.match(/^\d{0,2}$/)) {
      e.target.setCustomValidity("Please enter a maximum of 2 digits");
    } else {
      e.target.setCustomValidity("");
    }

    setecw(input);
  };

  const token = localStorage.getItem("token");
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      setValidated(true);
      Swal.fire({
        title: "Are you sure to Save Gif?",
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
          //   dispatch(addExersize({ name, exercise, times, rest }));
          //   dispatch(addexercise(exercise));
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
        } else if (result.isDenied) {
          Swal.fire({
            title: "Gif not saved",
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
  return (
    <>
        <div className="textViewInbody d-flex justify-content-center mt-3">
          <p className="d-flex flex-wrap ph">
            In order to be able to create a report, you must read the InBody and
            <br />
            enter the following data for the beginning of the month.
          </p>
          <p className="spanViewInBody">View InBody from here</p>
        </div>
        <div className="d-flex justify-content-center">
          <form className="p-5 "  validated={validated} onSubmit={handleSubmit}>
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
              <button
                type="submit"
                id="btn-save-report"

                // onClick={handelSubmit}
              >
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
  );
};

export default CurrentReport;
