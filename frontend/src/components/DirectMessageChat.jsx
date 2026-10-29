import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function DirectMessageChat() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [peerName, setPeerName] = useState("Loading...");

  // 1. Fetch the actual user name from the backend using the ID
  useEffect(() => {
    const fetchPeerData = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;
      
      try {
        const response = await fetch("http://localhost:8145/api/users/all", {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        if (response.ok) {
          const users = await response.json();
          // Match the URL ID to the database ID
          const targetUser = users.find(u => u.id.toString() === id);
          if (targetUser) {
            setPeerName(targetUser.name);
          } else {
            setPeerName("Unknown Peer");
          }
        }
      } catch (error) {
        setPeerName("Peer");
      }
    };

    fetchPeerData();
  }, [id]);

  // 2. Handle message send without refreshing the page
  const handleSend = (e) => {
    e.preventDefault(); 
    if (message.trim() === "") return;
    
    const newMessage = {
      id: Date.now(),
      text: message,
      sender: "me",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setChatHistory((prevChats) => [...prevChats, newMessage]);
    setMessage(""); // Clear input box
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <div className="w-full max-w-4xl bg-white h-[80vh] rounded-2xl shadow-xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-purple-700 p-4 text-white flex items-center justify-between shadow-md z-10">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate(-1)} className="font-bold hover:text-orange-200">← Back</button>
            <h2 className="text-xl font-bold">Chatting with {peerName}</h2>
          </div>
        </div>

        {/* Chat History Window */}
        <div className="flex-1 p-6 overflow-y-auto bg-gray-50 flex flex-col gap-4">
          {chatHistory.length === 0 ? (
            <div className="h-full flex items-end justify-center pb-4">
              <p className="text-gray-400">No messages yet. Say hello to {peerName}!</p>
            </div>
          ) : (
            chatHistory.map((msg) => (
              <div key={msg.id} className="flex justify-end">
                <div className="max-w-[70%] p-3 rounded-2xl bg-purple-600 text-white rounded-br-none">
                  <p>{msg.text}</p>
                  <span className="text-xs mt-1 block text-right text-purple-200">
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Input Form */}
        <form onSubmit={handleSend} className="p-4 bg-white border-t flex gap-4">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 p-3 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:outline-none bg-gray-50"
          />
          <button 
            type="submit" 
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-orange-500 text-white font-bold rounded-xl hover:opacity-90 transition-opacity shadow-md"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}