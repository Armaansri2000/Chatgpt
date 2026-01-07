import React from "react";

export default function Sidebar({ sessions, activeId, onSelect, onNewChat }) {
  return (
    <aside className="sidebar">
      <h2>ChatGPT</h2>
      <button className="new-chat" onClick={onNewChat}>+ New chat</button>

      <div className="history">
        {sessions.map(chat => (
          <div
            key={chat.id}
            className={`history-item ${chat.id === activeId ? "active" : ""}`}
            onClick={() => onSelect(chat.id)}
          >
            {chat.title}
          </div>
        ))}
      </div>
    </aside>
  );
}
