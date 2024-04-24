import React, { useEffect, useState } from "react";
import Home from "../../assets/Home.svg";
import Request from "../../assets/Request Feedback.svg";
import myPortfolio from "../../assets/Portfolio.svg";
import logo from "../../assets/logoBlack.png";
import logoSmall from "../../assets/halfLlogo.svg";
import avatar from "../../assets/skill2.jpg";
import "./css/profile.css";
import { NavLink, Outlet } from "react-router-dom";
import Footer from "../footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfileData } from "../../rtk/Protfolio";
import Pusher from "pusher-js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Profile = () => {
  const { CoachProfileData } = useSelector((state) => state.Profile);
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  // useEffect(() => {
  //   // dispatch(fetchProfileData({ token }));
  // }, []);
  useEffect(() => {
    // dispatch(fetchProfileData({ token }));

    Pusher.logToConsole = true;
    const pusher = new Pusher("f2ab4244dfa2cd3140ce", {
      cluster: "eu",
    });

    const channel = pusher.subscribe("notify");
    const notifyCallback = (data) => {
      toast.info(`Title: ${data.title}, Message: ${data.msg}`, {
        autoClose: 9000,
        style: {
          backgroundColor: "#FFC300",
          color: "#000814",
        },
      });
    };

    channel.bind(`${CoachProfileData?.msg.id}notify`, notifyCallback);

    return () => {
      channel.unbind(`${CoachProfileData?.msg.id}notify`, notifyCallback);
    };
  }, [CoachProfileData, dispatch, token]);
  // _________________________________________________________
  // Notifcation
  // Pusher.logToConsole = true;
  // var pusher = new Pusher("f2ab4244dfa2cd3140ce", {
  //   cluster: "eu",
  // });

  // // let coach_id = 2;
  // var channel = pusher.subscribe("notify");
  // channel.bind(`${CoachProfileData?.msg.id}notify`, function (data) {
  //   toast.info(`Title: ${data.title}, Message: ${data.msg}`, {
  //     autoClose: false,
  //   });
  // });
  // pusher.unsubscribe("notify");

  // ___________________________________________________________________________
  const [collapsed, setCollapsed] = useState(false);
  const menuItem = [
    {
      path: "home",
      name: "Home",
      icon: <img src={Home} alt="home" />,
      // icon: <GoHomeFill/>,
    },
    {
      path: "requests",
      name: "Requests",
      icon: <img src={Request} alt="Requests" />,
    },
    {
      path: "myProtfolio",
      name: "my Protfolio",
      icon: <img src={myPortfolio} alt="myPortfolio" />,
    },
  ];
  const handleExpandClick = () => {
    setCollapsed(!collapsed);
    document.body.classList.toggle("collapsed");
  };
  return (
    <>
      <div className="containerr">
        <nav
          style={{ width: collapsed ? "50px" : "200px" }}
          className="sidebar"
        >
          <div className="sidebar-top-wrapper">
            <div className="sidebar-top">
              <a href="/#" className="logo__wrapper">
                {!collapsed && (
                  <img src={logo} alt="Logo" className="logo-large" />
                )}
                {collapsed && (
                  <img src={logoSmall} alt="Logo" className="logo-small" />
                )}
                <span className="hide">Storeify</span>
              </a>
            </div>
            <div className="expand-btn" onClick={handleExpandClick}>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.00979 2.72L10.3565 7.06667C10.8698 7.58 10.8698 8.42 10.3565 8.93333L6.00979 13.28"
                  stroke="#4A516D"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
          {menuItem.map((item, index) => (
            <NavLink
              to={item.path}
              key={index}
              className="link"
              activeclassname="active"
            >
              <div className="icon">{item.icon}</div>
              <div
                style={{ display: !collapsed ? "block" : "none" }}
                className="link_text"
              >
                {item.name}
              </div>
            </NavLink>
          ))}
          <div className="divider"></div>
          <div className="sidebar__profile">
            <div className="avatar__wrapper">
              <img
                className="avatar"
                // src={`${https://above-elk-open.ngrok-free.app/api/img/CoachProfileData?.msg?.personal_img}`}
                src={`https://above-elk-open.ngrok-free.app/api/img/${CoachProfileData?.msg?.personal_img}`}
                alt="..."
              />
              <div className="online__status"></div>
            </div>
            <section className="avatar__name hide">
              <div className="user-name">
                {CoachProfileData?.msg?.fname ?? ""}{" "}
                {CoachProfileData?.msg?.lname ?? "Name"}
              </div>
              <div className="email">
                {CoachProfileData?.msg?.email ?? "user @gmail.com"}
              </div>
            </section>
            <a href="#logout" className="logout">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-logout"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2"></path>
                <path d="M9 12h12l-3 -3"></path>
                <path d="M18 15l3 -3"></path>
              </svg>
            </a>
          </div>
        </nav>
        <main>
          <Outlet />
        </main>
      </div>
      <Footer />
      <ToastContainer />
    </>
  );
};

export default Profile;
