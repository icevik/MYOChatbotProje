import React, { useState } from 'react';
import { Box, TextField, IconButton } from '@mui/material';
import { Send } from '@mui/icons-material';

interface ChatInputProps {
    onSend: (message: string) => void;
    disabled?: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({ onSend, disabled }) => {
    const [message, setMessage] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (message.trim() && !disabled) {
            onSend(message);
            setMessage('');
        }
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
                display: 'flex',
                gap: 1,
                p: 2,
                backgroundColor: 'background.paper',
                borderTop: 1,
                borderColor: 'divider'
            }}
        >
            <TextField
                fullWidth
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Mesajınızı yazın..."
                disabled={disabled}
                size="small"
            />
            <IconButton
                type="submit"
                color="primary"
                disabled={!message.trim() || disabled}
            >
                <Send />
            </IconButton>
        </Box>
    );
}; 