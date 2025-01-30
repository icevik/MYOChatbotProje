import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useAuth } from '../../contexts/AuthContext';

export const Header: React.FC = () => {
    const { user, logout } = useAuth();

    return (
        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Yeditepe Chatbot
                </Typography>
                {user && (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Typography>
                            {user.name}
                        </Typography>
                        <Button color="inherit" onClick={logout}>
                            Çıkış Yap
                        </Button>
                    </Box>
                )}
            </Toolbar>
        </AppBar>
    );
}; 