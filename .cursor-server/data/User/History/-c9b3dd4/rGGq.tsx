import React from 'react';
import { Box, Container, Typography, Paper } from '@mui/material';
import { GoogleLogin } from '@react-oauth/google';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export const LoginPage: React.FC = () => {
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSuccess = async (credentialResponse: any) => {
        try {
            await login(credentialResponse.credential);
            navigate('/');
        } catch (error) {
            console.error('Login hatası:', error);
        }
    };

    return (
        <Container maxWidth="sm">
            <Box
                sx={{
                    minHeight: '100vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <Paper
                    elevation={3}
                    sx={{
                        p: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 3
                    }}
                >
                    <Typography variant="h4" component="h1">
                        Yeditepe Chatbot
                    </Typography>
                    <Typography variant="body1" color="text.secondary" align="center">
                        Devam etmek için Yeditepe mail adresiniz ile giriş yapın
                    </Typography>
                    <GoogleLogin
                        onSuccess={handleSuccess}
                        onError={() => {
                            console.log('Login Failed');
                        }}
                        useOneTap
                        auto_select
                        context="signin"
                    />
                </Paper>
            </Box>
        </Container>
    );
}; 