# Chatgpt Application

A modern **React-based Chat Application** with local storage, theme toggle, and AI-assisted responses.  
The app mimics a ChatGPT-style interface, supports multiple chats, and maintains chat history using local storage.



## Features

- Multiple chat sessions stored in **local storage**.
- Chat input always stays at the **bottom**, even on fresh start.
- **Empty state placeholder** when no chat exists.
- **Theme toggle** between light and dark mode, saved in local storage.
- **AI responses** using an API service (`askAI` placeholder).
- Scrolls automatically to the latest message.
- Sidebar for switching between chat sessions and creating new ones.

---

## Tech Stack

- **Frontend:** React.js (Functional Components, Hooks)  
- **Styling:** CSS variables with light/dark theme  
- **Storage:** Local Storage for chat sessions and theme  
- **AI Service:** `askAI` function (placeholder for API integration)


## How the Code Works

### App.jsx
- **State Management:**
  - `sessions` → stores all chat sessions.
  - `activeId` → ID of the currently active chat.
  - `isLoading` → tracks when AI response is being fetched.
  - `theme` → current theme (light/dark).

- **Initialization:**
  - Loads sessions and theme from **local storage**.
  - Lazy-creates a new chat on first message (if none exists).

- **Functions:**
  - `createNewChat()` → creates a new chat session.  
  - `sendMessage(text)` → adds user message, calls `askAI(text)`, updates session.  
  - `toggleTheme()` → switches theme and saves preference.

- **Effects:**
  - Auto-save `sessions` to local storage whenever they change.  
  - Auto-scroll to the bottom when new messages are added.  

### ChatWindow.jsx
- Displays all messages of the active chat.  
- Shows `.empty-state` placeholder if no messages exist.  
- Scrolls to the bottom automatically using a `ref`.

### ChatInput.jsx
- Input field for typing messages.  
- Sends messages using the `onSend` prop.  
- Disabled while AI response is loading.

### Sidebar.jsx
- Lists all existing chat sessions.  
- Allows switching between chats.  
- Allows creating a **new chat**.

### CSS
- Uses **CSS variables** for light/dark themes.  
- `.chat` uses **flexbox** with `justify-content: flex-end` to keep input at bottom.  
- `.empty-state` is **centered vertically and horizontally**.  
- Messages have distinct styles for **user** and **assistant**.  
- Sidebar highlights the active chat.


## Getting Started

### Prerequisites
- Node.js v18+  
- npm or yarn 

### Installation
```bash
git clone https://github.com/yourusername/chat-app.git
cd chat-app
npm install
# or
yarn install
Running Locally

npm start
# or
yarn start
