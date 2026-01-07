import React, { useEffect, useRef, useState } from "react";
import Sidebar from "./components/Sidebar";
import ChatWindow from "./components/ChatWindow";
import ChatInput from "./components/ChatInput";
import { askAI } from "./services/aiService";
import { loadSessions, saveSessions } from "./utils/storage";

export default function App() {
  const [sessions, setSessions] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const [theme, setTheme] = useState("light");
  const chatContainerRef = useRef(null);

 
  useEffect(() => {
    const savedSessions = loadSessions() || [];
    const savedTheme = localStorage.getItem("theme") || "light";

    setTheme(savedTheme);
    document.body.className = savedTheme;

    if (savedSessions.length > 0) {
      setSessions(savedSessions);
      setActiveId(savedSessions[0].id);
    }

  }, []);

 
  useEffect(() => {
    saveSessions(sessions);
  }, [sessions]);

 
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.body.className = newTheme;
    localStorage.setItem("theme", newTheme);
  };

  const activeChat = sessions.find(s => s.id === activeId) || null;

  
  const createNewChat = () => {
    const id = Date.now().toString();
    const chat = { id, title: "New chat", messages: [], isLoading: false };
    setSessions(prev => [chat, ...prev]);
    setActiveId(id);
  };

 
  const sendMessage = async (text) => {
    if (!text) return;

    let currentId = activeId;

    // Lazy create chat if none exists
    if (!currentId) {
      const id = Date.now().toString();
      const chat = { id, title: text.slice(0, 30), messages: [], isLoading: true };
      setSessions([chat]);
      setActiveId(id);
      currentId = id;
    } else {
      // Set isLoading true for current chat only
      setSessions(prev =>
        prev.map(chat =>
          chat.id === currentId ? { ...chat, isLoading: true } : chat
        )
      );
    }

    // Add user message
    setSessions(prev =>
      prev.map(chat =>
        chat.id === currentId
          ? {
              ...chat,
              title: chat.messages.length === 0 ? text.slice(0, 30) : chat.title,
              messages: [...chat.messages, { role: "user", text }]
            }
          : chat
      )
    );

    try {
      const reply = await askAI(text);

      // Append AI response only to current chat
      setSessions(prev =>
        prev.map(chat =>
          chat.id === currentId
            ? {
                ...chat,
                messages: [...chat.messages, { role: "assistant", text: reply }],
                isLoading: false
              }
            : chat
        )
      );
    } catch {
      setSessions(prev =>
        prev.map(chat =>
          chat.id === currentId
            ? {
                ...chat,
                messages: [
                  ...chat.messages,
                  { role: "assistant", text: "Error: unable to get response." }
                ],
                isLoading: false
              }
            : chat
        )
      );
    }
  };

  return (
    <div className="app">
      <Sidebar
        sessions={sessions}
        activeId={activeId}
        onSelect={setActiveId}
        onNewChat={createNewChat}
      />

      <main className="main">
        <div className="top-bar">
          <button className="theme-toggle" onClick={toggleTheme}>
            {theme === "light" ? "🌙 Dark" : "☀️ Light"}
          </button>
        </div>

       <ChatWindow
  chat={activeChat}
  isLoading={activeChat?.isLoading}
  containerRef={chatContainerRef}
/>


        <ChatInput onSend={sendMessage} disabled={activeChat?.isLoading || false} />
      </main>
    </div>
  );
}
