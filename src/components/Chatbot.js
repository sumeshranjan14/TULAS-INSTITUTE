import React, { useState, useRef, useEffect } from "react";
import "./Chatbot.css";

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "tiya", text: "Hi! I'm Tiya 😊\nHow can I assist you today?" }
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [language, setLanguage] = useState("en"); // multi-language
  const [online, setOnline] = useState(navigator.onLine);

  // Detect online/offline
  useEffect(() => {
    const goOnline = () => setOnline(true);
    const goOffline = () => setOnline(false);

    window.addEventListener("online", goOnline);
    window.addEventListener("offline", goOffline);

    return () => {
      window.removeEventListener("online", goOnline);
      window.removeEventListener("offline", goOffline);
    };
  }, []);

  /* ------------------------
       DRAGGABLE LOGIC
  ------------------------ */
  const botRef = useRef(null);
  const pos = useRef({ x: 0, y: 0, offsetX: 0, offsetY: 0 });
  const dragging = useRef(false);

  const onMouseDown = (e) => {
    dragging.current = true;
    pos.current.offsetX = e.clientX - pos.current.x;
    pos.current.offsetY = e.clientY - pos.current.y;
  };

  const onMouseMove = (e) => {
    if (!dragging.current) return;
    pos.current.x = e.clientX - pos.current.offsetX;
    pos.current.y = e.clientY - pos.current.offsetY;
    botRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px)`;
  };

  const onMouseUp = () => (dragging.current = false);

  useEffect(() => {
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, []);

  /* ------------------------
     LANGUAGE SYSTEM
  ------------------------ */
  const dictionary = {
    en: {
      hello: "Hello! How can I help you today?",
      course: "We offer B.Tech, BCA, MCA, and MBA programs!",
      admission: "Admissions are open! Check the Admissions section.",
      hostel: "Yes! We have secure hostels with WiFi & facilities.",
      contact: "Use the Contact section to reach us.",
      default: "I'm here to help! Ask me anything 😊"
    },
    hi: {
      hello: "नमस्ते! मैं कैसे मदद कर सकती हूँ?",
      course: "हम B.Tech, BCA, MCA, और MBA प्रदान करते हैं!",
      admission: "एडमिशन खुले हैं! एडमिशन सेक्शन देखें।",
      hostel: "हाँ! हमारे पास सुरक्षित होस्टल और WiFi उपलब्ध है।",
      contact: "संपर्क सेक्शन का उपयोग करें।",
      default: "मैं सहायता करने के लिए यहाँ हूँ 😊"
    }
  };

  /* ------------------------
      SIMPLE INTELLIGENCE
  ------------------------ */
  const getReply = (text) => {
    const t = text.toLowerCase();
    const lang = dictionary[language];

    if (t.includes("hello") || t.includes("hi")) return lang.hello;
    if (t.includes("course")) return lang.course;
    if (t.includes("admission")) return lang.admission;
    if (t.includes("hostel")) return lang.hostel;
    if (t.includes("contact")) return lang.contact;

    return lang.default;
  };

  /* ------------------------
      SEND MESSAGE
  ------------------------ */
  const sendMessage = () => {
    if (!input.trim()) return;

    const newMsg = { from: "user", text: input };
    setMessages((prev) => [...prev, newMsg]);

    setTyping(true); // show typing animation

    setTimeout(() => {
      const reply = getReply(input);
      setMessages((prev) => [...prev, { from: "tiya", text: reply }]);
      setTyping(false);
    }, 700);

    setInput("");
  };

  /* ------------------------
      VOICE INPUT
  ------------------------ */
  const startVoice = () => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Voice recognition not supported!");
      return;
    }

    const rec = new window.webkitSpeechRecognition();
    rec.lang = language === "en" ? "en-US" : "hi-IN";
    rec.start();

    rec.onresult = (e) => {
      setInput(e.results[0][0].transcript);
    };
  };

  return (
    <>
      {/* Floating draggable button */}
      <div
        className="chatbot-button"
        onClick={() => setOpen(!open)}
        ref={botRef}
        onMouseDown={onMouseDown}
      >
        🤖
      </div>

      {open && (
        <div className="chatbot-window">

          {/* Header */}
          <div className="chatbot-header">
            <div className="avatar">
              <div className="face"></div>
              <div className={`status-dot ${online ? "online" : "offline"}`}></div>
            </div>
            <span>Tiya Assistant</span>

            <button className="close-btn" onClick={() => setOpen(false)}>✕</button>
          </div>

          {/* Messages */}
          <div className="chatbot-messages">
            {messages.map((msg, i) => (
              <div key={i} className={`chat-msg ${msg.from}-msg`}>
                {msg.text}
              </div>
            ))}

            {typing && (
              <div className="typing-bubble">
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="chatbot-input">
            <select 
              className="lang-select" 
              value={language} 
              onChange={(e) => setLanguage(e.target.value)}
            >
              <option value="en">EN</option>
              <option value="hi">HI</option>
            </select>

            <button className="mic-btn" onClick={startVoice}>🎤</button>

            <input
              type="text"
              placeholder="Ask something..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />

            <button className="send-btn" onClick={sendMessage}>➤</button>
          </div>
        </div>
      )}
    </>
  );
}
