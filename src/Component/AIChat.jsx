import React, { useState } from "react";
import "./AIChat.css";

function AIChat({ onClose }) {
  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState([
    {
      type: "ai",
      text: "Hi Ankit! 👋 I'm your ExTracke AI Assistant.",
    },
    {
      type: "ai",
      text: "I can analyze your expenses, find spending patterns, and give you saving suggestions.",
    },
  ]);

  const suggestions = [
    "Show my spending summary",
    "Where am I spending the most?",
    "How can I save money?",
  ];

  const sendMessage = (text = message) => {
    if (!text.trim()) return;

    setMessages([
      ...messages,
      {
        type: "user",
        text: text,
      },
    ]);

    setMessage("");

    // Connect your AI API here
  };

  return (
    <div className="ai-overlay">

      <div className="ai-card">

        {/* Header */}
        <div className="ai-header">

          <div className="ai-title">

            <div className="ai-avatar">
              🤖
            </div>

            <div>
              <h2>AI Expense Assistant</h2>

              <p>
                Understand your money better.
              </p>
            </div>

          </div>

          <button
            className="ai-close"
            onClick={onClose}
          >
            ×
          </button>

        </div>


        {/* Chat */}
        <div className="ai-chat">

          {messages.map((msg, index) => (

            <div
              key={index}
              className={`chat-row ${msg.type}`}
            >

              {msg.type === "ai" && (
                <div className="small-ai-avatar">
                  🤖
                </div>
              )}

              <div className="chat-message">
                {msg.text}
              </div>

            </div>

          ))}


          {/* Example insight card */}

          <div className="ai-insight">

            <div className="insight-title">
              💡 Spending Insight
            </div>

            <p>
              Your food expenses are currently
              higher than your monthly average.
            </p>

            <strong>
              Consider reducing food spending
              by ₹500 this month.
            </strong>

          </div>


          {/* Suggestions */}

          <div className="ai-suggestions">

            <p>Try asking:</p>

            <div className="suggestion-list">

              {suggestions.map((suggestion, index) => (

                <button
                  key={index}
                  onClick={() => sendMessage(suggestion)}
                >
                  {suggestion}
                </button>

              ))}

            </div>

          </div>

        </div>


        {/* Input */}
        <div className="ai-input-area">

          <div className="ai-input">

            <input
              type="text"
              placeholder="Ask anything about your expenses..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  sendMessage();
                }
              }}
            />

          </div>

          <button
            className="ai-send"
            onClick={() => sendMessage()}
          >
            ↑
          </button>

        </div>

      </div>

    </div>
  );
}

export default AIChat;