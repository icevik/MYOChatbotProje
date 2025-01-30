import React from 'react';
import { Box, Toolbar } from '@mui/material';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { useAuth } from '../../contexts/AuthContext';

interface LayoutProps {
    children: React.ReactNode;
}

const SIDEBAR_WIDTH = 240;

export const Layout: React.FC<LayoutProps> = ({ children }) => {
    const { user } = useAuth();

    return (
        <Box sx={{ display: 'flex' }}>
            <Header />
            {user && <Sidebar width={SIDEBAR_WIDTH} />}
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    width: { sm: `calc(100% - ${SIDEBAR_WIDTH}px)` }
                }}
            >
                <Toolbar /> {/* Header için boşluk */}
                {children}
            </Box>
        </Box>
    );
}; 