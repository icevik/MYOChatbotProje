import React from 'react';
import { Box, Typography, Grid, Card, CardContent, CardActionArea } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { School } from '@mui/icons-material';

const CATEGORIES = [
    { id: 'INP', name: 'INP - İşletme ve Yönetim', icon: School },
    { id: 'MEC', name: 'MEC - Mekanik', icon: School },
    { id: 'AUT', name: 'AUT - Otomasyon', icon: School },
    { id: 'ELT', name: 'ELT - Elektronik', icon: School }
];

export const HomePage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>
                Hoş Geldiniz
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
                Aşağıdaki kategorilerden birini seçerek derslere ulaşabilirsiniz.
            </Typography>

            <Grid container spacing={3} sx={{ mt: 2 }}>
                {CATEGORIES.map((category) => (
                    <Grid item xs={12} sm={6} md={4} key={category.id}>
                        <Card>
                            <CardActionArea
                                onClick={() => navigate(`/category/${category.id}`)}
                                sx={{ height: '100%' }}
                            >
                                <CardContent>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 2
                                        }}
                                    >
                                        <category.icon fontSize="large" color="primary" />
                                        <Typography variant="h6" component="div">
                                            {category.name}
                                        </Typography>
                                    </Box>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}; 