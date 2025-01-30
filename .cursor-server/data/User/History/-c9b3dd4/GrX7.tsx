import React from 'react';
import { Box, Container, Typography, Paper } from '@mui/material';
import { GoogleLogin, CredentialResponse } from '@react-oauth/google';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export const LoginPage: React.FC = () => {
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSuccess = async (credentialResponse: CredentialResponse) => {
        try {
            await login(credentialResponse.credential);
            navigate('/');
        } catch (error) {
            console.error('Login hatası:', error);
        }
    };

    const handleError = () => {
        console.error('Login hatası');
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
                        onError={handleError}
                        useOneTap={false}
                        auto_select={false}
                        context="signin"
                        theme="filled_blue"
                        text="signin_with"
                        shape="rectangular"
                        locale="tr"
                    />
                </Paper>
            </Box>
        </Container>
    );
}; 