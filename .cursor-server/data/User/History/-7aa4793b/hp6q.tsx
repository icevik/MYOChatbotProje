import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, CircularProgress } from '@mui/material';
import { ChatWindow } from '../components/Chat/ChatWindow';
import { Course, Conversation } from '../types';
import { courseAPI, conversationAPI } from '../services/api';

export const CoursePage: React.FC = () => {
    const { courseId } = useParams<{ courseId: string }>();
  const [course, setCourse] = useState<Course | null>(null);
    const [conversation, setConversation] = useState<Conversation | null>(null);
    const [loading, setLoading] = useState(true);
    const [sending, setSending] = useState(false);
    const [error, setError] = useState<string | null>(null);

  useEffect(() => {
        const fetchCourseAndConversation = async () => {
    try {
                setLoading(true);
                // Ders bilgilerini al
                const courseResponse = await courseAPI.getAll();
                const foundCourse = courseResponse.data.find(c => c._id === courseId);
                if (!foundCourse) {
                    throw new Error('Ders bulunamadı');
        }
                setCourse(foundCourse);

                // Konuşma geçmişini al
                const conversationsResponse = await conversationAPI.getUserConversations();
                const foundConversation = conversationsResponse.data.find(
                    c => c.courseId === courseId
                );
                if (foundConversation) {
                    setConversation(foundConversation);
                }
    } catch (err: any) {
                setError(err.message || 'Bir hata oluştu');
            } finally {
                setLoading(false);
    }
  };

        if (courseId) {
            fetchCourseAndConversation();
        }
    }, [courseId]);

    const handleSendMessage = async (message: string) => {
        try {
            setSending(true);
            const response = await conversationAPI.sendMessage(courseId!, message);
            setConversation(response.data);
    } catch (err: any) {
            setError(err.response?.data?.error || 'Mesaj gönderilemedi');
        } finally {
            setSending(false);
    }
  };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
                <CircularProgress />
            </Box>
        );
    }
      
    if (error) {
        return (
            <Box sx={{ p: 3 }}>
                <Typography color="error">{error}</Typography>
            </Box>
        );
    }

    if (!course) {
  return (
            <Box sx={{ p: 3 }}>
                <Typography>Ders bulunamadı</Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ p: 3, height: 'calc(100vh - 128px)' }}>
            <Typography variant="h4" gutterBottom>
                {course.name}
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
                {course.description}
            </Typography>

            <Box sx={{ height: 'calc(100% - 100px)' }}>
                <ChatWindow
                    messages={conversation?.messages || []}
                    onSendMessage={handleSendMessage}
                    loading={sending}
                />
            </Box>
        </Box>
  );
};