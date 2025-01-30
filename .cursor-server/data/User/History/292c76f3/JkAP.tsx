import React from 'react';
import { Box, Container, Typography, Paper, Button } from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import GoogleIcon from '@mui/icons-material/Google';

const LoginPage: React.FC = () => {
    const { user, login, error } = useAuth();

    if (user) {
        return <Navigate to="/courses" replace />;
    }

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Paper
                    elevation={3}
                    sx={{
                        padding: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        width: '100%',
                    }}
                >
                    <Typography component="h1" variant="h5" gutterBottom>
                        Yeditepe Chatbot'a Hoş Geldiniz
                    </Typography>
                    
                    <Typography variant="body1" color="text.secondary" align="center" sx={{ mb: 3 }}>
                        Devam etmek için Yeditepe hesabınızla giriş yapın
                    </Typography>

                    <Button
                        variant="contained"
                        onClick={login}
                        startIcon={<GoogleIcon />}
                        fullWidth
                        sx={{ mt: 2 }}
                    >
                        Google ile Giriş Yap
                    </Button>

                    {error && (
                        <Typography color="error" sx={{ mt: 2 }}>
                            {error}
                        </Typography>
                    )}
                </Paper>
            </Box>
        </Container>
    );
};

export default LoginPage; 