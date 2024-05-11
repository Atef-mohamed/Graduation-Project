import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTraineesList } from "../../../../rtk/TraineesSlice";
import { useNavigate ,Link, useParams} from "react-router-dom";
import "../../css/Home.css";

const TraineesList = ({Trainees}) => {
//   const { TraineesList } = useSelector((state) => state.Trainees);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  // useEffect(() => {
  //   dispatch(fetchTraineesList({ token }));
  // }, [dispatch, token]);
 const params = useParams();
  // const handelcard = () => {
  //   navigate(`trainee/${params.id}`);
  // };

  return (
    <>
      {Trainees.map((trainee) => (
          <Link to={`trainee/${trainee.id}`} key={trainee.id} className="card-client" >
            <img
              src={`https://exersize.loophole.site/api/img/${trainee.img}`}
              alt="Profile Photo"
            />
            <h3 className="client-name">{trainee.fname}</h3>
          </Link>

        ))}
    </>
  );
};

export default TraineesList;
