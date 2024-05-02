import React from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import backTo from "../../../../assets/BackTo.svg";

const Chat = () => {
  const location = useLocation();
  const trainee_id = location.pathname.split("/")[4];
  const params = useParams();
  console.log(params.id);
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(`/profile/home/trainee/${params.id}`); // Navigate back one step
  };
  return (
    <>
      <p onClick={handleGoBack}>
        <img src={backTo} alt="" />
      </p>
      <h1>Chaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaat</h1>;
    </>
  );
};

export default Chat;
