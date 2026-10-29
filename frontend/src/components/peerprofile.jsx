import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function PeerProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [peer, setPeer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Replace with your actual backend fetch, e.g., /api/users/${id}
    // For now, we simulate fetching peer data
    setTimeout(() => {
      setPeer({
        name: "Meet Singhvi",
        universityName: "CBIT",
        aboutMe: "Passionate about competitive programming and building scalable web apps.",
        githubUrl: "https://github.com/meet",
        linkedinUrl: "https://linkedin.com/in/meet"
      });
      setLoading(false);
    }, 1000);
  }, [id]);

  if (loading) return <div className="text-center mt-20 text-xl font-semibold">Loading peer profile...</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-md p-8 flex flex-col items-center text-center">
        <div className="w-32 h-32 rounded-full bg-purple-100 text-purple-700 font-bold text-5xl flex items-center justify-center mb-6">
          {peer.name.charAt(0).toUpperCase()}
        </div>
        <h1 className="text-3xl font-bold text-gray-800">{peer.name}</h1>
        <p className="text-gray-500 mb-6">{peer.universityName}</p>
        
        <div className="w-full text-left bg-gray-50 p-6 rounded-xl border mb-6">
          <h2 className="text-lg font-bold text-purple-700 mb-2">About</h2>
          <p className="text-gray-700">{peer.aboutMe}</p>
        </div>

        <div className="flex gap-4 w-full">
          <button 
            onClick={() => navigate(`/chat/${id}`)}
            className="flex-1 py-3 bg-gradient-to-r from-purple-600 to-orange-500 text-white font-bold rounded-lg hover:opacity-90 transition"
          >
            Message
          </button>
          <button 
            onClick={() => navigate(-1)}
            className="flex-1 py-3 bg-gray-200 text-gray-800 font-bold rounded-lg hover:bg-gray-300 transition"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}