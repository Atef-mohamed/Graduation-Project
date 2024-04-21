import React, { useEffect } from "react";
import "../Stepper/Stepper.css";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const Final = () => {
  useEffect(() => {
    // Trigger SweetAlert2 when the component mounts
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Your data has been successfully registered",
      showConfirmButton: false,
      timer: 3000,
      customClass: {
        popup: "swal-custom-popup",
        content: "swal-custom-content",
        title: "swal-custom-title",
      },
      iconColor: "#FFD60A", // Define the color for the success icon
    });
  }, []); // Run this effect only once when the component mounts

  return (
    <div className="container md-mt-5">
      <div className="d-flex flex-column align-items-center">
        <div
          className="mt-3 text-xl-center text-capitalize text-success "
          id="cong"
        >
          Congatulations!
        </div>
        <div className="text-lg ">Your Account has been Created</div>
        <a className="mt-5" href="/">
          <Link to="/profile" id="ctn-close">To Profile</Link>
        </a>
      </div>
    </div>
  );
};

export default Final;
