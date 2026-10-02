import { useState } from "react";
import "./AIChat.css";
import { api } from '../api';

function formatInline(text) {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/`([^`]+)`/g, '<code>$1</code>');
}

function AIResponse({ text }) {
  const lines = String(text || '').replace(/\r/g, '').split('\n');
  const blocks = [];
  let index = 0;

  while (index < lines.length) {
    const line = lines[index].trim();
    if (!line) { index += 1; continue; }

    const tableLines = [];
    while (index < lines.length && lines[index].includes('|')) {
      const cells = lines[index].split('|').map((cell) => cell.trim()).filter(Boolean);
      if (cells.length) tableLines.push(cells);
      index += 1;
    }
    if (tableLines.length >= 2) {
      const rows = tableLines.filter((row) => !row.every((cell) => /^[-:]+$/.test(cell)));
      blocks.push(
        <div className="ai-table-wrap" key={`table-${index}`}>
          <table className="ai-response-table">
            <thead><tr>{rows[0].map((cell, i) => <th key={i} dangerouslySetInnerHTML={{ __html: formatInline(cell) }} />)}</tr></thead>
            <tbody>{rows.slice(1).map((row, rowIndex) => <tr key={rowIndex}>{rows[0].map((_, cellIndex) => <td key={cellIndex} dangerouslySetInnerHTML={{ __html: formatInline(row[cellIndex] || '') }} />)}</tr>)}</tbody>
          </table>
        </div>
      );
      continue;
    }

    const heading = line.replace(/^#{1,3}\s*/, '').replace(/\*\*/g, '');
    if (/^#{1,3}\s|^\*\*[^*]+\*\*$/.test(line)) {
      blocks.push(<h3 key={`heading-${index}`}>{heading}</h3>);
      index += 1;
      continue;
    }

    const list = [];
    while (index < lines.length && /^\s*(?:[-*]|\d+[.)])\s+/.test(lines[index])) {
      list.push(lines[index].replace(/^\s*(?:[-*]|\d+[.)])\s+/, ''));
      index += 1;
    }
    if (list.length) {
      blocks.push(<ul key={`list-${index}`}>{list.map((item, i) => <li key={i} dangerouslySetInnerHTML={{ __html: formatInline(item) }} />)}</ul>);
      continue;
    }

    blocks.push(<p key={`paragraph-${index}`} dangerouslySetInnerHTML={{ __html: formatInline(line) }} />);
    index += 1;
  }

  return <div className="ai-formatted-response">{blocks}</div>;
}

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
                {msg.type === 'ai' ? <AIResponse text={msg.text} /> : msg.text}
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
