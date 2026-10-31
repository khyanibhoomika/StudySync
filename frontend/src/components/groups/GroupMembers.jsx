import React from "react";

const GroupMembers = ({ members, ownerId, currentUserRole, onRemoveMember }) => {
  const isCurrentUserAdmin = currentUserRole?.toUpperCase() === "ADMIN";

  if (!members || members.length === 0) {
    return <p className="text-center text-gray-500 py-4">No members found.</p>;
  }
  
  return (
    <div className="space-y-4 pr-2">
      {members.map((member, idx) => {
        const role = member.role ? member.role.toUpperCase() : "MEMBER";
        const isOwner = role === "ADMIN";
        const displayName = member.name || "Unknown User";
        const memberId = member.userId || member.id; // safely grab the ID

        return (
          <div
            key={memberId ? memberId : `member-${idx}`}
            className="flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-purple-200 flex items-center justify-center font-bold text-purple-700 text-lg">
                {displayName.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="font-semibold text-gray-800">{displayName}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <span
                className={`text-xs font-bold px-3 py-1 rounded-full ${
                  isOwner
                    ? "text-red-800 bg-red-100"
                    : "text-purple-700 bg-purple-100"
                }`}
              >
                {isOwner ? "Admin" : "Member"}
              </span>

              {/* Show Remove button if logged-in user is Admin, and target user is not an Admin */}
              {isCurrentUserAdmin && !isOwner && onRemoveMember && (
                <button
                  onClick={() => onRemoveMember(memberId)}
                  className="text-xs font-bold text-white bg-red-500 hover:bg-red-600 px-3 py-1 rounded-full transition-colors"
                  title="Remove from group"
                >
                  Remove
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default GroupMembers;