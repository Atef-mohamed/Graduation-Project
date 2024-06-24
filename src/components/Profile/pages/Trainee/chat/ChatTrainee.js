import "react-chat-elements/dist/main.css";
import "./chat.css";
import { MessageBox } from "react-chat-elements";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import backTo from "../../../../../assets/BackTo.svg";
import url from "../../../../../url.json";
import {
  fetchChatList,
  addMessage,
  getMessage,
} from "../../../../../rtk/TraineesSlice";
import Pusher from "pusher-js";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";


const ChatTrainee = () => {
  let inp1 = useRef();
  const inp2 = useRef(null);
  // const {loading} = useSelector((state) => state.Trainees);
  const dispatch = useDispatch();
  const param = useParams();
  const [trainee, setTrainee] = useState();
  const { chat, loading } = useSelector((state) => state.Trainees);
  const token = localStorage.getItem("token");

  // Fetch chat list on component mount
  useEffect(() => {
    const fetchData = async () => {
      const id = params.id;
      const res = await axios.post(`${url.url}/coach/trainee/${id}`, {
        token,
      });
      setTrainee(res.data);
      localStorage.setItem("chat_id", res.data.msg.chat_id);
      return res.data;
    };
    fetchData();
    window.scrollTo(0, 0);
  }, []);

  let chat_id = localStorage.getItem("chat_id");

  useEffect(() => {
    dispatch(fetchChatList({ token, chat_id: chat_id }));

    Pusher.logToConsole = true;
    const pusher = new Pusher("f2ab4244dfa2cd3140ce", {
      cluster: "eu",
    });

    const channel = pusher.subscribe(`${chat_id}Chatting`);
    const chatCallback = (data) => {
      dispatch(getMessage({ sender: data.sender, content: data.message }));
    };

    channel.bind(`${chat_id}send`, chatCallback);

    return () => {
      channel.unbind(`${chat_id}send`, chatCallback);
    };
  }, [chat_id]);

  useEffect(() => {
    // Scroll to the bottom when new messages are added
    if (inp2.current) {
      inp2.current.scrollTop = inp2.current.scrollHeight;
    }
  }, [chat]);

  // Function to send a message
  const sendMsg = (e) => {
    e.preventDefault();
    dispatch(
      addMessage({
        token: token,
        chat_id: chat_id,
        message: inp1.current.value,
      })
    );
    inp1.current.value = "";
  };

  // Function to scroll to the top of the chat container
  // const scrollToTop = () => {
  //   if (inp2.current) {
  //     inp2.current.scrollTop = 0;
  //   }
  // };

  // Navigation functions
  const params = useParams();
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(`/profile/home/trainee/${params.id}`);
  };

  return (
    <>
      <div className="body-chat">
        <p onClick={handleGoBack}>
          <img src={backTo} alt="" style={{ cursor: "pointer" }} />
        </p>
        <div className="content-left d-flex align-items-center ms-5 content-trainee">
          <img
            src={`${url.url}/img/${trainee?.msg.img}`}
            width={"100px"}
            alt=""
          />

          <div className="d-flex flex-column justify-content-center">
            <h5 className="p-3 mt-2 text-light">{`${trainee?.msg.fname}  ${trainee?.msg.lname}`}</h5>
            <div className="status ms-3">Online</div>
          </div>
        </div>
        <div className="chat-component">
          <div className="chat hide-scrollbar" ref={inp2}>
            {Array.isArray(chat) &&
              chat.map((msg) => (
                <MessageBox
                  key={msg.id}
                  position={msg.sender === "coach" ? "right" : "left"}
                  type="text"
                  text={msg.content}
                  // title={
                  //   msg.sender === "coach"
                  //     ? "You"
                  //     : `${trainee?.msg?.fname}` +
                  //       " " +
                  //       `${trainee?.msg?.lname}`
                  // }
                  data={{
                    uri: "https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small/user-profile-icon-free-vector.jpg",
                    status: { click: false, loading: 0 },
                  }}
                  date={msg.created_at}
                />
              ))}
          </div>
          <div className="chat-footer">
            {/* <button onClick={scrollToTop}>Scroll to Top</button> */}
            <form
              onSubmit={sendMsg}
              className="d-flex justify-content-center align-items-center"
            >
              <input type="text" placeholder="Type Message..." ref={inp1} />
              <button type="submit">Send</button>
            </form>
          </div>
        </div>
        {loading && (
          <div className="loader-overlay">
            <div className="loader-container">
              <div className="loader"></div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ChatTrainee;
