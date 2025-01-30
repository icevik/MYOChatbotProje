import React, { useEffect } from 'react';
import { Box, Container, Typography, Paper } from '@mui/material';
import { GoogleLogin, CredentialResponse } from '@react-oauth/google';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export const LoginPage: React.FC = () => {
    const { login } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        console.log('Environment:', import.meta.env.MODE);
        console.log('API URL:', import.meta.env.VITE_API_URL);
        console.log('APP URL:', import.meta.env.VITE_APP_URL);
        console.log('VITE_GOOGLE_CLIENT_ID:', import.meta.env.VITE_GOOGLE_CLIENT_ID);
    }, []);

    const handleSuccess = async (credentialResponse: CredentialResponse) => {
        console.log('Login başarılı:', credentialResponse);
        try {
            if (credentialResponse.credential) {
                await login(credentialResponse.credential);
                navigate('/');
            }
        } catch (error) {
            console.error('Login hatası:', error);
        }
    };

    const handleError = () => {
        console.error('Google login hatası');
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
                        context="use"
                        type="standard"
                        theme="filled_blue"
                        text="signin_with"
                        shape="rectangular"
                        width="300"
                        locale="tr"
                    />
                </Paper>
            </Box>
        </Container>
    );
}; 