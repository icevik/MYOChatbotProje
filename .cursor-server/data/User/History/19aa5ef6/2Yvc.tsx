import React, { useEffect, useRef } from 'react';
import { Box } from '@mui/material';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { Message } from '../../types';

interface ChatWindowProps {
  messages: Message[];
    onSendMessage: (message: string) => void;
    loading?: boolean;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({
    messages,
    onSendMessage,
    loading
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                backgroundColor: '#fff',
                borderRadius: 1,
                border: 1,
                borderColor: 'divider'
            }}
          >
            <Box
                sx={{
                    flexGrow: 1,
                    overflow: 'auto',
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column'
                }}
            >
                {messages.map((message, index) => (
                    <ChatMessage key={index} message={message} />
        ))}
        <div ref={messagesEndRef} />
            </Box>
            <ChatInput onSend={onSendMessage} disabled={loading} />
        </Box>
  );
};