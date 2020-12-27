import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import TopBar from "../../components/TopBar";
import { styles } from "../../public/js/styles";

export default function Chat() {
  const [title, setTitle] = useState("تواصل معنا");
  const router = useRouter();
  const { user } = router.query;
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const chatRef = useRef();
  const handleSend = async () => {
    var d = new Date();
    var h = d.getHours().toString();
    var m = d.getMinutes().toString();
    h.length === 1 && (h = "0" + h);
    m.length === 1 && (m = "0" + m);
    await setMessages([
      ...messages,
      { message: newMessage, time: h + ":" + m }
    ]);
    setNewMessage("");
    chatRef.current.scrollTop = chatRef.current.scrollHeight;
  };

  useEffect(() => {
    user && setTitle(user);
  }, [user]);

  return (
    <>
      <TopBar title={title} page={true} />
      <div className="container">
        <div className="chatbox" ref={chatRef}>
          {messages.map((obj) => {
            return (
              <div className="chatbox_messagebox">
                <div className="chatbox_message">{obj.message}</div>
                <div className="chatbox_time">{obj.time}</div>
              </div>
            );
          })}
        </div>

        <div className="sendbox">
          <input
            value={newMessage}
            placeholder="اكتب رسالتك هنا"
            className="messageInput"
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) =>
              e.key === "Enter" && newMessage !== "" && handleSend()
            }
          />

          <button className="button" onClick={() => handleSend()}>
            ارسال
          </button>
        </div>
      </div>

      <style jsx>{`
        .container {
          padding: 0.5rem;
          height: calc(100vh - 3rem);
          font-size: 1rem;
          overflow: auto;
          background: ${styles.thirdColor};
        }
        .chatbox {
          height: calc(100vh - 10rem);
          border: 1px solid ${styles.primaryColor};
          border-radius: 0.5rem;
          margin: 0.8rem 0;
          padding: 0.8rem;
          overflow-x: hidden;
          overflow-y: auto;
          background: white;
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-orient: vertical;
          -webkit-box-direction: normal;
          -ms-flex-direction: column;
          flex-direction: column;
          -webkit-box-align: start;
          -ms-flex-align: start;
          align-items: flex-start;
        }
        .chatbox_messagebox {
          background: wheat;
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-orient: vertical;
          -webkit-box-direction: normal;
          -ms-flex-direction: column;
          flex-direction: column;
          -webkit-box-align: end;
          -ms-flex-align: end;
          align-items: flex-end;
          width: -webkit-fit-content;
          width: -moz-fit-content;
          width: fit-content;
          padding: 0.5rem;
          margin: 0.2rem 0;
          border-radius: 0.5rem;
          max-width: 70%;
          min-width: 40%;
        }

        .chatbox_number {
          color: gray;
          font-size: 0.9rem;
          -ms-flex-item-align: start;
          align-self: flex-start;
          padding-bottom: 0.2rem;
          -webkit-transform: translateY(-0.2rem) translateX(-0.2rem);
          -ms-transform: translateY(-0.2rem) translateX(-0.2rem);
          transform: translateY(-0.2rem) translateX(-0.2rem);
        }
        .chatbox_message {
          font-size: 1.1rem;
          width: -webkit-fit-content;
          width: -moz-fit-content;
          width: fit-content;
          display: block;
          word-wrap: break-word;
          max-width: 100%;
          -ms-flex-item-align: start;
          align-self: flex-start;
        }
        .chatbox_time {
          color: gray;
          font-size: 0.7rem;
          -webkit-transform: translateY(0.4rem) translateX(0.2rem);
          -ms-transform: translateY(0.4rem) translateX(0.2rem);
          transform: translateY(0.4rem) translateX(0.2rem);
        }
        .chatbox::-webkit-scrollbar {
          display: none;
        } /* Hide scrollbar for IE, Edge and Firefox */
        .chatbox {
          -ms-overflow-style: none; /* IE and Edge */
          scrollbar-width: none; /* Firefox */
        }
        .messageInput {
          border: 1px solid lightgrey;
          border-radius: 0.5rem;
          font-size: 1.2rem;
          padding: 0.7rem 0.8rem;
          max-width: calc(100% - 5rem);
        }

        .messageInput:focus {
          outline: none;
          border: 1px solid ${styles.primaryColor};
        }
        .messageInput::-webkit-input-placeholder {
          color: #aaa;
        }
        .messageInput::-moz-placeholder {
          color: #aaa;
        }
        .messageInput:-ms-input-placeholder {
          color: #aaa;
        }
        .messageInput::-ms-input-placeholder {
          color: #aaa;
        }
        .messageInput::placeholder {
          color: #aaa;
        }
        .sendbox {
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-align: center;
          -ms-flex-align: center;
          align-items: center;
        }

        .button {
          font-size: 1.2rem;
          background-color: ${styles.primaryColorLight};
          color: white;
          padding: 0.3rem 0.8rem;
          border-radius: 0.2rem;
          margin: 0 0.2rem;
          border: none;
        }
      `}</style>
    </>
  );
}
