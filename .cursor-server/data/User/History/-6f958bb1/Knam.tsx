import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Typography, Box } from '@mui/material';
import { School } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const CATEGORIES = ['INP', 'MEC', 'AUT', 'ELT'];

interface SidebarProps {
    width?: number;
}

export const Sidebar: React.FC<SidebarProps> = ({ width = 240 }) => {
    const navigate = useNavigate();

    return (
        <Drawer
            variant="permanent"
            sx={{
                width: width,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: width,
                    boxSizing: 'border-box',
                    backgroundColor: '#f5f5f5'
                }
            }}
        >
            <Box sx={{ p: 2 }}>
                <Typography variant="h6" component="div" sx={{ mb: 2 }}>
                    Kategoriler
                </Typography>
                <List>
                    {CATEGORIES.map((category) => (
                        <ListItem
                            button
                            key={category}
                            onClick={() => navigate(`/category/${category}`)}
                        >
                            <ListItemIcon>
                                <School />
                            </ListItemIcon>
                            <ListItemText primary={category} />
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Drawer>
    );
}; 