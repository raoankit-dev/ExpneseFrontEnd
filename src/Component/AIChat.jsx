import { useState } from "react";
import "./AIChat.css";
import { api } from '../api';

function AIChat({ onClose, userName = 'there' }) {
  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState([
    {
      type: "ai",
      text: `Hi ${userName}! 👋 I'm your ExTracke AI Assistant.`,
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

  const [loading, setLoading] = useState(false);
  const sendMessage = async (text = message) => {
    if (!text.trim()) return;
    setMessages((current) => [...current, { type: "user", text }]);
    setMessage("");
    setLoading(true);
    try { const result = await api.chat(text); setMessages((current) => [...current, { type: 'ai', text: result?.data?.answer || result?.answer || 'I could not find an answer right now.' }]); }
    catch (err) { setMessages((current) => [...current, { type: 'ai', text: err.message }]); }
    finally { setLoading(false); }
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
            {loading ? '…' : '↑'}
          </button>

        </div>

      </div>

    </div>
  );
}

export default AIChat;
