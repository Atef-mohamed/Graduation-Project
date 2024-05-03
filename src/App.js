import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import MainPage from "./components/MainPage/MainPage";
import SignIn from "./components/SignIn/SignIn";
import SignUp from "./components/signUp/SignUp";
import OtpInput from "./components/OtpInput/OtpInput";
import StepperComponent from "./components/Protfolio/Stepper/StepperComponent";
import AddProtfolio from "./components/Protfolio/pages/AddProtflio/AddProtfolio";
import CardProtfolio from "./components/Protfolio/pages/AddProtflio/CardProtfolio";
import Packages from "./components/Protfolio/pages/Packages";
import Profile from "./components/Profile/Profile";
import Home from "./components/Profile/pages/Home";
import MyProtfoilo from "./components/Profile/pages/MyProtfoilo";
import Requstes from "./components/Profile/pages/Requstes";
import TraineeDetails from "./components/Profile/pages/Trainee/TraineeDetails";
import ViewPlan from "./components/Profile/pages/Trainee/ViewPlan";
import ViewInbody from "./components/Profile/pages/Trainee/ViewInbody";
import CurrentMonth from "./components/Profile/pages/Trainee/CurrentMonth";
import AddPlans from "./components/Profile/pages/Trainee/addPlan/AddPlans";
import AddPlan from "./components/Profile/pages/Trainee/addPlan/AddPlan";
import ViewReport from "./components/Profile/pages/Trainee/ViewReport";
import EditProfile from "./components/Profile/EditProfile";
import EditPlan from "./components/Profile/pages/Trainee/addPlan/EditPlan";
import ProtfolioAdd from "./components/Protfolio/ProtfoliAdd";
import ChatTrainee from "./components/Profile/pages/Trainee/chat/ChatTrainee";

function App() {
  return (
    <div className="App">
      {/* <MainPage /> */}
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/otpInput" element={<OtpInput />} />
        <Route path="/protfolio" element={<StepperComponent />}>
          <Route path="addProtfolio" element={<AddProtfolio />} />
          <Route path="showprotfolios" element={<CardProtfolio />} />
          <Route path="addpackages" element={<Packages />} />
        </Route>
        <Route path="/profile" element={<Profile />}>
          <Route path="home" element={<Home />} />
          <Route path="requests" element={<Requstes />} />
          <Route path="myProtfolio" element={<MyProtfoilo />} />
          <Route path="myProtfolio/protfolioAdd" element={<ProtfolioAdd />} />
          <Route path="editProfile" element={<EditProfile />} />
          <Route path="/profile/home/trainee/:id" element={<TraineeDetails />}>
            <Route path="viewPlan" element={<ViewPlan />}>
              {/* <Route index element={<CurrentMonth />} /> */}
              <Route path="" element={<Navigate to="currentMonth" />} />
              <Route path="currentMonth" element={<CurrentMonth />} />
              <Route path="currentMonth/addPlans" element={<AddPlans />}>
                <Route path="satPlan" element={<AddPlan />} />
                <Route path="sunPlan" element={<AddPlan />} />
                <Route path="monPlan" element={<AddPlan />} />
                <Route path="tuePlan" element={<AddPlan />} />
                <Route path="wedPlan" element={<AddPlan />} />
                <Route path="thuPlan" element={<AddPlan />} />
                <Route path="friPlan" element={<AddPlan />} />
                <Route path="editPlan" element={<EditPlan />} />
              </Route>
            </Route>
            <Route path="viewInbody" element={<ViewInbody />} />
            <Route path="viewReport" element={<ViewReport />} />
          </Route>
            <Route path="home/trainee/:id/chat" element={<ChatTrainee />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
