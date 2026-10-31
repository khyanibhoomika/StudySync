import React from "react";
import { useParams } from "react-router-dom";
import GroupMembers from "./GroupMembers";

const GroupAbout = ({ group, members, pinnedMessages, ownerId }) => {
  const { groupId } = useParams();

  // Check if current user is admin using local token
  const token = localStorage.getItem("token");
  let currentUserRole = "MEMBER";
  if (token) {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      const currentUserId = payload.userId || payload.id;
      
      if (ownerId === currentUserId) {
        currentUserRole = "ADMIN";
      } else {
        const currentUserMatch = members.find(m => m.userId === currentUserId || m.id === currentUserId);
        if (currentUserMatch && currentUserMatch.role?.toUpperCase() === "ADMIN") {
          currentUserRole = "ADMIN";
        }
      }
    } catch (e) {
      console.error("Token parsing error:", e);
    }
  }

  const handleRemoveMember = async (memberId) => {
    if (window.confirm("Are you sure you want to remove this member?")) {
      try {
        const response = await fetch(`http://localhost:8145/api/groups/${groupId}/members/${memberId}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (response.ok) {
          alert("Member removed successfully.");
          window.location.reload(); 
        } else {
          const err = await response.json();
          alert("Error: " + err.message);
        }
      } catch (error) {
        console.error("Failed to remove member:", error);
        alert("An error occurred while removing the member.");
      }
    }
  };

  return (
    <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-8">
      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-3">
          About this Group
        </h2>
        <p className="text-gray-700 leading-relaxed bg-white p-4 rounded-lg border border-gray-200">
          {group.description}
        </p>
      </section>
      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-3">Pinned Messages</h2>
        <div className="space-y-3">
          {pinnedMessages.length > 0 ? (
            pinnedMessages.map((msg) => (
              <div
                key={msg.id}
                className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg"
              >
                <span className="font-bold text-yellow-800 text-sm">
                  {msg.user}:{" "}
                </span>
                <span className="text-yellow-900">{msg.message}</span>
              </div>
            ))
          ) : (
            <p className="text-gray-500 bg-white p-4 rounded-lg border border-gray-200">
              No pinned messages.
            </p>
          )}
        </div>
      </section>
      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-3">
          Members ({members.length})
        </h2>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <GroupMembers 
            members={members} 
            ownerId={ownerId} 
            currentUserRole={currentUserRole}
            onRemoveMember={handleRemoveMember}
          />
        </div>
      </section>
    </div>
  );
};

export default GroupAbout;