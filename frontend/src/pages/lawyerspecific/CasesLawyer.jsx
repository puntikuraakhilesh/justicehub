
import React, { useState, useEffect } from 'react';
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
import { useSnackbar } from 'notistack';

const CasesLawyer = () => {
  const [cases, setCases] = useState({ pending: [], accepted: [], rejected: [] });
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(0);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const lawyerId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchAssignedCases = async () => {
      try {
        const response = await fetch(`http://localhost:8800/api/cases/getassignedcases/${lawyerId}`, {
          method: 'GET',
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch assigned cases');
        }

        const data = await response.json();
        const groupedCases = {
          pending: data.cases.filter((c) => c.case_status === 'pending'),
          accepted: data.cases.filter((c) => c.case_status === 'accepted'),
          rejected: data.cases.filter((c) => c.case_status === 'rejected'),
        };

        setCases(groupedCases);
      } catch (error) {
        enqueueSnackbar(error.message || 'Failed to load cases', { variant: 'error' });
      } finally {
        setLoading(false);
      }
    };

    fetchAssignedCases();
  }, [token, lawyerId, enqueueSnackbar]);

  const handleViewDetails = (caseData) => {
    navigate(`/case-details/${caseData._id}`, { state: { case: caseData } });
  };

  const renderCases = (caseList) => {
    if (caseList.length === 0) {
      return <Typography variant="body1" color="textSecondary">No cases found.</Typography>;
    }

    return (
      <Grid container spacing={2}>
        {caseList.map((c) => (
          <Grid item xs={12} md={6} key={c._id}>
            <Card variant="outlined" sx={{ borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
              <CardContent>
                <Typography variant="h6" fontWeight="bold">{c.incident_type}</Typography>
                <Divider sx={{ marginBottom: '1rem' }} />
                <Stack spacing={1}>
                  <Typography variant="body2"><strong>Location:</strong> {c.incident_location}</Typography>
                  <Typography variant="body2"><strong>Description:</strong> {c.incident_description}</Typography>
                  <Chip
                    label={c.case_status.charAt(0).toUpperCase() + c.case_status.slice(1)}
                    color={c.case_status === 'accepted' ? 'success' : c.case_status === 'rejected' ? 'error' : 'warning'}
                    size="small"
                    sx={{ fontWeight: 'bold' }}
                  />
                </Stack>

                <Button
                  variant="contained"
                  fullWidth
                  sx={{ marginTop: '1rem', backgroundColor: '#000', color: '#fff' }}
                  onClick={() => handleViewDetails(c)}
                >
                  View Details
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    );
  };

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
        <CircularProgress size={60} />
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ padding: '2rem' }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>My Cases</Typography>

      <Tabs value={activeTab} onChange={(_, newValue) => setActiveTab(newValue)} variant="fullWidth" sx={{ marginBottom: '2rem' }}>
        <Tab label="Pending" />
        <Tab label="Accepted" />
        <Tab label="Rejected" />
      </Tabs>

      <Box>
        {activeTab === 0 && renderCases(cases.pending)}
        {activeTab === 1 && renderCases(cases.accepted)}
        {activeTab === 2 && renderCases(cases.rejected)}
      </Box>
    </Container>
  );
};

export default CasesLawyer;
