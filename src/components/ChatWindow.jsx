import React, { useEffect } from "react";

export default function ChatWindow({ chat, isLoading, containerRef }) {
  const messages = chat?.messages || [];

  // ✅ Hooks must always run
  useEffect(() => {
    if (containerRef?.current) {
      containerRef.current.scrollTop =
        containerRef.current.scrollHeight;
    }
  }, [messages, isLoading, containerRef]);

  // ✅ Conditional render AFTER hooks
  if (!chat) return null;

  return (
    <div className="chat" ref={containerRef}>
      {messages.length === 0 ? (
        <div className="empty-state">Start a conversation...</div>
      ) : (
        messages.map((msg, idx) => (
          <div key={idx} className={`message ${msg.role}`}>
            {msg.text}
          </div>
        ))
      )}

      {isLoading && (
        <div className="message loading">AI is typing...</div>
      )}
    </div>
  );
}
