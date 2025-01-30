import React from 'react';

interface Message {
  role: string;
  content: string;
  timestamp: string;
}

interface ChatWindowProps {
  messages: Message[];
}

const ChatWindow: React.FC<ChatWindowProps> = ({ messages }) => {
  return (
    <div className="h-[500px] overflow-y-auto p-4 space-y-4">
      {messages.map((message, index) => (
        <div
          key={index}
          className={`flex ${
            message.role === 'user' ? 'justify-end' : 'justify-start'
          }`}
        >
          <div
            className={`max-w-[70%] rounded-lg p-3 ${
              message.role === 'user'
                ? 'bg-indigo-100 text-indigo-900'
                : 'bg-gray-100 text-gray-900'
            }`}
          >
            <p className="text-sm">{message.content}</p>
            <span className="text-xs text-gray-500 mt-1 block">
              {new Date(message.timestamp).toLocaleString('tr-TR')}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatWindow; 