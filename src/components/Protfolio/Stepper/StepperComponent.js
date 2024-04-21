import React, { useState } from "react";
import Nav from "../NavProtfolio/Nav";
import Stepper from "./Stepper";
import StepperConstrol from "./StepperConstrol";
import AccountInformation from "../pages/AccountInformation";
import Protfolio from "../pages/Protfolio";
import Packages from "../pages/Packages";
import Final from "../pages/Final";
import Footer from "../../footer/Footer";

const StepperComponent = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const steps = ["Account information", "Protofolio", "package", "Complete"];

  const handleNextStep = () => {
    setCurrentStep(currentStep + 1);
  };
  const handleBackStep = () => {
    setCurrentStep(currentStep - 1);
  };

  return (
    <>
      <Nav />
      {/* <div className=" shadow-xl rounded-2xl pb-2 "> */}
      <div className="container  horizontal mt-5">
        <Stepper steps={steps} currentStep={currentStep} />
        {/* Components */}
        <div className="mt-10 p-10">
          {currentStep === 1 && (
            <AccountInformation onNextStep={handleNextStep} />
          )}
          {currentStep === 2 && <Protfolio onNextStep={handleNextStep} />}
          {currentStep === 3 && <Packages onNextStep={handleNextStep} onBackStep={handleBackStep}/>}
          {currentStep === 4 && <Final />}
        </div>
      </div>
      {/* {currentStep !== steps.length && (
          <StepperConstrol
            handelClick={handleNextStep}
            currentStep={currentStep}
            steps={steps}
          />
        )} */}
      {/* </div> */}
      <Footer />
    </>
  );
};

export default StepperComponent;
