import "react-chat-elements/dist/main.css";
import "./chat.css";
import { MessageBox } from "react-chat-elements";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import backTo from "../../../../../assets/BackTo.svg";
import {
  fetchChatList,
  addMessage,
  getMessage,
} from "../../../../../rtk/TraineesSlice";
import Pusher from "pusher-js";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const ChatTrainee = () => {
  let inp1 = useRef();
  const inp2 = useRef(null);

  const dispatch = useDispatch();
  const param = useParams();
  const { chat } = useSelector((state) => state.Trainees);
  const token = localStorage.getItem("token");

  // Fetch chat list on component mount
  let chat_id = localStorage.getItem('chat_id');
  useEffect(() => {
    dispatch(fetchChatList({ token, chat_id: chat_id }));
    inp2.current.scrollTop = inp2.current.scrollHeight;

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
  }, []);

  // Function to send a message
  const sendMsg = (e) => {
    e.preventDefault();
    dispatch(
      addMessage({
        token: token,
        chat_id: chat_id ,
        message: inp1.current.value,
      })
    );
    inp1.current.value = "";
  };

  // Navigation functions
  const location = useLocation();
  const params = useParams();
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(`/profile/home/trainee/${params.id}`);
  };

  return (
    <>
      <p onClick={handleGoBack}>
        <img src={backTo} alt="" style={{ cursor: "pointer" }} />
      </p>
      <div className="chat" ref={inp2}>
        {Array.isArray(chat) &&
          chat.map((msg) => (
            <MessageBox
              key={msg.id} // Assuming each message has a unique id
              position={msg.sender === "coach" ? "right" : "left"}
              type="text"
              text={msg.content}
              title={msg.sender === "coach" ? "You" : "Trainee"}
              avatar="https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small/user-profile-icon-free-vector.jpg"
              data={{
                uri: "https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small/user-profile-icon-free-vector.jpg",
                status: { click: false, loading: 0 },
              }}
            />
          ))}
      </div>
      <div className="chat-footer">
        <form onSubmit={sendMsg} className="d-flex">
          <input type="text" placeholder="Enter Message..." ref={inp1} />
          <button type="submit">Send</button>
        </form>
      </div>
    </>
  );
};

export default ChatTrainee;