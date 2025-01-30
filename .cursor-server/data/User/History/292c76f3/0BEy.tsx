import React, { useState } from 'react';
import { Box, Container, Typography, Paper, Button, Alert } from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import GoogleIcon from '@mui/icons-material/Google';

export const LoginPage: React.FC = () => {
    const { loginWithGoogle, error } = useAuth();
    const navigate = useNavigate();
    const [localError, setLocalError] = useState<string | null>(null);

    const handleGoogleLogin = async () => {
        try {
            setLocalError(null);
            await loginWithGoogle();
            navigate('/');
        } catch (error: any) {
            console.error('Login hatası:', error);
            setLocalError(error?.message || 'Giriş yapılırken bir hata oluştu');
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
                        gap: 3,
                        width: '100%'
                    }}
                >
                    <Typography variant="h4" component="h1">
                        Yeditepe Chatbot
                    </Typography>
                    <Typography variant="body1" color="text.secondary" align="center">
                        Devam etmek için Yeditepe mail adresiniz ile giriş yapın
                    </Typography>
                    
                    {(error || localError) && (
                        <Alert severity="error" sx={{ width: '100%' }}>
                            {error || localError}
                        </Alert>
                    )}

                    <Button
                        variant="contained"
                        startIcon={<GoogleIcon />}
                        onClick={handleGoogleLogin}
                        size="large"
                        fullWidth
                        sx={{ 
                            textTransform: 'none',
                            backgroundColor: '#4285F4',
                            '&:hover': {
                                backgroundColor: '#357ABD'
                            },
                            py: 1.5
                        }}
                    >
                        Google ile Giriş Yap
                    </Button>
                </Paper>
            </Box>
        </Container>
    );
};