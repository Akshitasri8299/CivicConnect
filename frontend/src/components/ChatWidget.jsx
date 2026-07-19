import { useState, useEffect, useRef } from "react";
import "./ChatWidget.css";

const quickReplies = {
  "Report Complaint":
    "Go to Dashboard → File a New Complaint → Fill in the details → Submit.",

  "Track Complaint":
    "Open your Dashboard and click on your complaint to see its latest status.",

  "Complaint Status":
    "Complaint statuses are: Pending, In Progress, Resolved and Rejected.",

  "Contact Admin":
    "You can contact the administrator at admin@civicconnect.com",

  "Help":
    "You can ask me about reporting complaints, tracking tickets or using CivicConnect."
};

export default function ChatWidget() {
  const [open, setOpen] = useState(false);

  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "👋 Hello! I'm Civic Assistant. How can I help you?"
    }
  ]);

  const [input, setInput] = useState("");
const bottomRef = useRef();

useEffect(() => {
  bottomRef.current?.scrollIntoView({
    behavior: "smooth",
  });
}, [messages]);
 const sendMessage = (text) => {
  if (!text.trim()) return;

  const userMessage = {
    sender: "user",
    text,
  };

  setMessages((prev) => [...prev, userMessage]);

  setInput("");

  setTimeout(() => {
    const botMessage = {
      sender: "bot",
      text:
        quickReplies[text] ||
        "Sorry, I couldn't understand that. Please use the quick buttons or ask another question.",
    };

    setMessages((prev) => [...prev, botMessage]);
  }, 800);
};
  return (
    <>
      <button
        className="chat-button"
        onClick={() => setOpen(!open)}
      >
        💬
      </button>

      {open && (
        <div className="chat-box">

          <div className="chat-header">

  <div className="chat-title">

    <div className="chat-avatar">
      🤖
    </div>

    <div>
      <h4>Civic Assistant</h4>
      <span>Online</span>
    </div>

  </div>

  <button onClick={() => setOpen(false)}>
    ✖
  </button>

</div>

          <div className="chat-body">

            {messages.map((msg, index) => (

              <div
                key={index}
                className={`message ${msg.sender}`}
              >
                {msg.text}
              </div>

            ))}
<div ref={bottomRef}></div>
          </div>

          <div className="quick-buttons">

            {Object.keys(quickReplies).map((item) => (

              <button
                key={item}
                onClick={() => sendMessage(item)}
              >
                {item}
              </button>

            ))}

          </div>

          <div className="chat-input">

            <input
              placeholder="Type here..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />

            <button
              onClick={() => sendMessage(input)}
            >
              Send
            </button>

          </div>

        </div>
      )}
    </>
  );
}