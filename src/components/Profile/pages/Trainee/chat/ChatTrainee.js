// src\components\Profile\pages\Trainee\chat\ChatTrainee.js
import "react-chat-elements/dist/main.css";
import "./chat.css";
import { MessageBox } from "react-chat-elements";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import backTo from "../../../../../assets/BackTo.svg"
import {
  fetchChatList,
  addMessage,
  getMessage,
} from "../../../../../rtk/TraineesSlice";
import Pusher from "pusher-js";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const ChatTrainee = ({ chat_id }) => {
  let inp1 = useRef();
  const inp2 = useRef(null);

  const dispactch = useDispatch();

  const { chat } = useSelector((state) => state.Trainees);
  const token = localStorage.getItem("token");
  useEffect(() => {
    dispactch(fetchChatList({ token, chat_id }));
    inp2.current.scrollTop = inp2.current.scrollHeight;

    Pusher.logToConsole = true;
    const pusher = new Pusher("f2ab4244dfa2cd3140ce", {
      cluster: "eu",
    });

    const channel = pusher.subscribe("Chatting");
    const chatCallback = (data) => {
      dispactch(getMessage({ sender: data.sender, content: data.message }));
    };

    channel.bind(`${chat_id}send`, chatCallback);

    return () => {
      channel.unbind(`${chat_id}send`, chatCallback);
    };
  }, []);

  function sendMsg() {
    dispactch(
      addMessage({
        token: token,
        chat_id: chat_id,
        message: inp1.current.value,
      })
    );
    inp1.current.value = "";
  }
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
        <img src={backTo} alt="" style={{cursor:"pointer"}}/>
      </p>
      <div className="chat" ref={inp2}>
        {Array.isArray(chat) &&
          chat.map((msg) => {
            return msg.sender === "coach" ? (
              <>
                <MessageBox
                  className="mb"
                  position={"right"}
                  type={"text"}
                  text={msg.content}
                  title="You"
                  avatar="https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small/user-profile-icon-free-vector.jpg"
                  data={{
                    uri: "https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small/user-profile-icon-free-vector.jpg",
                    status: {
                      click: false,
                      loading: 0,
                    },
                  }}
                />
              </>
            ) : (
              <>
                <MessageBox
                  position={"left"}
                  type={"text"}
                  text={msg.content}
                  title="Trainee"
                  avatar="https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small/user-profile-icon-free-vector.jpg"
                  data={{
                    uri: "https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small/user-profile-icon-free-vector.jpg",
                    status: {
                      click: false,
                      loading: 0,
                    },
                  }}
                />
              </>
            );
          })}
      </div>
      <div className="chat-footer">
        <input type="text" placeholder="Enter Message... " ref={inp1} />
        <button onClick={sendMsg}>Send</button>
      </div>
    </>
  );
};

export default ChatTrainee;
