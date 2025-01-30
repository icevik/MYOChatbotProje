import React from 'react';
import { Box, Paper, Typography } from '@mui/material';
import { Message } from '../../types';

interface ChatMessageProps {
    message: Message;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
    const isUser = message.role === 'user';

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: isUser ? 'flex-end' : 'flex-start',
                mb: 2
            }}
        >
            <Paper
                elevation={1}
                sx={{
                    p: 2,
                    maxWidth: '70%',
                    backgroundColor: isUser ? '#e3f2fd' : '#f5f5f5',
                    borderRadius: 2
                }}
            >
                <Typography variant="body1">
                    {message.content}
                </Typography>
                <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ display: 'block', mt: 1 }}
                >
                    {new Date(message.timestamp).toLocaleTimeString()}
                </Typography>
            </Paper>
        </Box>
    );
}; 