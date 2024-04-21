import React from "react";
import "./Stepper.css";
const StepperConstrol = ({ handelClick, currentStep, steps }) => {
  return (
    <div className="container d-flex justify-content-around mt-4 mb-8">
      <button
        onClick={() => handelClick()}
        id="btn-backStepper"
        className={`${currentStep === 1 ? "disabeld" : ""}`}
      >
        Back
      </button>
      <button onClick={() => handelClick("next")} id="btn-nextStepper">
        {currentStep === steps.length - 1 ? "Confirm" : "Next"}
      </button>
    </div>
  );
};

export default StepperConstrol;
