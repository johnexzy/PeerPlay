import React, { useState } from 'react';

interface ActiveUsersProps {
  users: {username: string, id: string}[];
}

const ActiveUsers = ({ users }: ActiveUsersProps) => {
  const [showUsers, setShowUsers] = useState(false);

  return (
    <div className="relative z-50">
      <button
        onClick={() => setShowUsers(!showUsers)}
        className="flex items-center gap-2 p-2.5 rounded-full bg-pink-50 hover:bg-pink-100 transition-all duration-200 shadow-sm hover:shadow-md"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="28" 
          height="28" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="#EC4899" 
          strokeWidth="2"
          className="hover:stroke-pink-600 transform transition-transform hover:scale-110"
        >
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
          <circle cx="9" cy="7" r="4"></circle>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
        </svg>
        <span className="text-sm font-semibold text-pink-500 pr-1">{users.length}</span>
      </button>

      {showUsers && (
        <div className="absolute right-0 top-12 w-48 py-2 mt-1 bg-white rounded-md shadow-lg z-50 border border-pink-100">
          <h3 className="px-4 py-1 text-xs font-semibold text-pink-500 border-b border-pink-50">
            Users in Session
          </h3>
          <div className="max-h-48 overflow-y-auto">
            {users.map((user) => (
              <div key={user.id} className="px-4 py-2 text-sm hover:bg-pink-50 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-pink-400"/>
                <span className="text-gray-700">{user.username}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ActiveUsers;
