import React from "react";
export default function Message({ role, text, loading }) {
  return (
    <div className={`message ${role} ${loading ? "loading" : ""}`}>
      {text}
    </div>
  );
}
