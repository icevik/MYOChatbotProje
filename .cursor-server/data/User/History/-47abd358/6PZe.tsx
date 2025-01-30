import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Box,
    Typography,
    Grid,
    Card,
    CardContent,
    CardActionArea,
    CircularProgress
} from '@mui/material';
import { Course } from '../types';
import { courseAPI } from '../services/api';

export const CategoryPage: React.FC = () => {
    const { category } = useParams<{ category: string }>();
    const navigate = useNavigate();
  const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

  useEffect(() => {
  const fetchCourses = async () => {
    try {
                setLoading(true);
                const response = await courseAPI.getByCategory(category!);
                setCourses(response.data);
            } catch (err: any) {
                setError(err.response?.data?.error || 'Dersler yüklenirken bir hata oluştu');
            } finally {
                setLoading(false);
        }
        };

        if (category) {
            fetchCourses();
        }
    }, [category]);
      
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

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>
                {category} Dersleri
            </Typography>

            {courses.length === 0 ? (
                <Typography>Bu kategoride henüz ders bulunmuyor.</Typography>
            ) : (
                <Grid container spacing={3} sx={{ mt: 2 }}>
        {courses.map((course) => (
                        <Grid item xs={12} sm={6} md={4} key={course._id}>
                            <Card>
                                <CardActionArea
                                    onClick={() => navigate(`/course/${course._id}`)}
                                    sx={{ height: '100%' }}
          >
                                    <CardContent>
                                        <Typography variant="h6" gutterBottom>
                                            {course.name}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {course.description}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
        ))}
                </Grid>
        )}
        </Box>
  );
};