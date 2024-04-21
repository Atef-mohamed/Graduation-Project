import React, { useEffect, useReducer, useRef, useState } from "react";
import "./Stepper.css";
const Stepper = ({ steps, currentStep }) => {
  const num = useRef();
  const [newStep, setNewStep] = useState([]);
  const stepRef = useRef();
  const updateStep = (stepNumber, steps) => {
    const newSteps = [...steps];
    let count = 0;

    while (count < newSteps.length) {
      // current step
      if (count === stepNumber) {
        newSteps[count] = {
          ...newSteps[count],
          highlighted: true,
          selected: true,
          completed: true,
        };
        count++;
      }
      //   step completed
      else if (count < stepNumber) {
        newSteps[count] = {
          ...newSteps[count],
          highlighted: false,
          selected: true,
          completed: true,
        };
        count++;
      }
      // step pending
      else {
        newSteps[count] = {
          ...newSteps[count],
          highlighted: false,
          selected: false,
          completed: false,
        };
        count++;
      }
    }
    return newSteps;
  };

  useEffect(() => {
    const stepsState = steps.map((step, index) => {
      Object.assign(
        {},
        {
          description: step,
          completed: false,
          highlighted: index === 0 ? true : false,
          selected: index === 0 ? true : false,
        }
      );
    });
    stepRef.current = stepsState;
    const current = updateStep(currentStep - 1, stepRef.current);
    setNewStep(current);
  }, [steps, currentStep]);

  const displaySteps = newStep.map((step, index) => {
    return (
      <div
        key={index}
        className={
          index !== newStep.length - 1
            ? "w-100 d-flex align-items-center"
            : "d-flex algin-items-center"
        }
      >
        {/* Number  and description*/}
        <div className="w-100 d-flex align-items-center">
          <div className="position-relative d-flex flex-column  align-items-center">
            <div
              id="numbers"
              ref={num}
              className={`${step.completed ? "completed" : ""}`}
            >
              {step.completed ? (
                <span className="text-white font-bold text-xl">&#10003;</span>
              ) : (
                index + 1
              )}
            </div>

            <div
              id="description"
              className={`${step.highlighted ? "highlighted" : ""}`}
            >
              {step.description}
            </div>
          </div>
          {/* line */}
          <div
            id="line-step"
            className={`${step.completed ? "completed" : ""}`}
          ></div>
        </div>
      </div>
    );
  });

  return (
    <>
      {/* <div className="container horizontal mt-5"> */}
      <div className="mx-4 p-4 d-flex justify-content-between align-items-center">
        {displaySteps}
      </div>
      {/* </div> */}
    </>
  );
};

export default Stepper;
