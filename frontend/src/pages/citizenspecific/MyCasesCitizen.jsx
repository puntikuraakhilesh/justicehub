import React, { useState, useEffect } from 'react';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  CircularProgress,
  Tabs,
  Tab,
  Box,
  Card,
  CardContent,
  Grid,
  Chip,
  Divider,
  Stack,
  Button,
} from '@mui/material';

const MyCasesCitizen = () => {
  const [cases, setCases] = useState({ pending: [], accepted: [], rejected: [] });
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(0);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchCases = async () => {
      try {
        const response = await fetch(`http://localhost:8800/api/cases/getallcases/${userId}`, {
          method: 'GET',
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch cases');
        }

        const data = await response.json();

        if (!Array.isArray(data.cases)) {
          throw new Error('Invalid data format');
        }

        const groupedCases = {
          pending: data.cases.filter((c) => c.case_status === 'pending'),
          accepted: data.cases.filter((c) => c.case_status === 'accepted' || c.case_status === 'assigned'),
          rejected: data.cases.filter((c) => c.case_status === 'rejected'),
        };

        setCases(groupedCases);
      } catch (error) {
        enqueueSnackbar(error.message || 'Failed to load cases', { variant: 'error' });
      } finally {
        setLoading(false);
      }
    };

    fetchCases();
  }, [token, userId, enqueueSnackbar]);

  const handleFindLawyer = (caseId) => {
    navigate('/lawyers', { state: { caseId } });
  };

  const getStatusChip = (status) => {
    const colorMap = {
      pending: 'warning',
      accepted: 'success',
      assigned: 'success',
      rejected: 'error',
    };

    return (
      <Chip
        label={status.charAt(0).toUpperCase() + status.slice(1)}
        color={colorMap[status] || 'default'}
        size="small"
        sx={{ marginLeft: '0.5rem', fontWeight: 'bold' }}
      />
    );
  };

  const renderCases = (caseList, showFindLawyerButton = false) => {
    if (caseList.length === 0) {
      return <Typography variant="body1" color="textSecondary">No cases found.</Typography>;
    }

    return (
      <Grid container spacing={2}>
        {caseList.map((c) => (
          <Grid item xs={12} md={6} key={c._id}>
            <Card
              variant="outlined"
              sx={{
                backgroundColor: '#fafafa',
                borderRadius: '12px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                transition: 'transform 0.2s',
                '&:hover': { transform: 'scale(1.03)' },
              }}
            >
              <CardContent>
                <Typography variant="h6" fontWeight="bold" gutterBottom>{c.incident_type}</Typography>
                <Divider sx={{ marginBottom: '1rem' }} />
                <Stack spacing={1}>
                  <Typography variant="body2"><strong>Location:</strong> {c.incident_location}</Typography>
                  <Typography variant="body2"><strong>Description:</strong> {c.incident_description}</Typography>
                  <Typography variant="body2">
                    <strong>Status:</strong> {getStatusChip(c.case_status)}
                  </Typography>
                </Stack>

                {showFindLawyerButton && (
                  <Button
                    variant="contained"
                    fullWidth
                    sx={{
                      marginTop: '1rem',
                      backgroundColor: '#000',
                      color: '#fff',
                      '&:hover': { backgroundColor: '#333' },
                    }}
                    onClick={() => handleFindLawyer(c._id)}
                  >
                    Find a Lawyer
                  </Button>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    );
  };

  if (loading) {
    return (
      <Container
        maxWidth="md"
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '80vh',
        }}
      >
        <CircularProgress size={60} />
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ padding: '2rem' }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>My Cases</Typography>

      <Tabs
        value={activeTab}
        onChange={(_, newValue) => setActiveTab(newValue)}
        indicatorColor="primary"
        textColor="primary"
        variant="fullWidth"
        sx={{ marginBottom: '2rem' }}
      >
        <Tab label="Pending" sx={{ fontWeight: '600' }} />
        <Tab label="Accepted" sx={{ fontWeight: '600' }} />
        <Tab label="Rejected" sx={{ fontWeight: '600' }} />
      </Tabs>

      <Box>
        {activeTab === 0 && renderCases(cases.pending, true)}
        {activeTab === 1 && renderCases(cases.accepted)}
        {activeTab === 2 && renderCases(cases.rejected)}
      </Box>
    </Container>
  );
};

export default MyCasesCitizen;
