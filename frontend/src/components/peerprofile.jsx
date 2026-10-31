import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function PeerProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [peer, setPeer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPeerProfile = async () => {
      const token = localStorage.getItem("token") || sessionStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      setLoading(true);
      try {
        // Fetch the specific peer's data from your backend using the route parameter 'id'
        const response = await fetch(`http://localhost:8145/api/users/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) {
          throw new Error("Failed to load peer profile.");
        }

        const data = await response.json();
        // If your backend returns the user object directly or nested under 'user', adjust accordingly
        setPeer(data.user || data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPeerProfile();
  }, [id, navigate]);

  if (loading) return <div className="text-center mt-20 text-xl font-semibold">Loading peer profile...</div>;
  if (error) return <div className="text-center mt-20 text-xl text-red-500">Error: {error}</div>;
  if (!peer) return <div className="text-center mt-20 text-xl">User not found.</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-md p-8 flex flex-col items-center text-center">
        <div className="w-32 h-32 rounded-full bg-purple-100 text-purple-700 font-bold text-5xl flex items-center justify-center mb-6">
          {peer.name ? peer.name.charAt(0).toUpperCase() : "U"}
        </div>
        <h1 className="text-3xl font-bold text-gray-800">{peer.name}</h1>
        <p className="text-gray-500 mb-6">{peer.universityName ?? "Student"}</p>
        
        <div className="w-full text-left bg-gray-50 p-6 rounded-xl border mb-6">
          <h2 className="text-lg font-bold text-purple-700 mb-2">About</h2>
          <p className="text-gray-700">{peer.aboutMe ?? "No bio available."}</p>
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
