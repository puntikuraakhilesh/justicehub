// src/components/CaseDetails.js

import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Container, Typography, Button, Stack, Paper } from '@mui/material';
import { useSnackbar } from 'notistack';

const CaseDetails = () => {
  const { state } = useLocation();
  const caseDetails = state?.case || {};
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const token = localStorage.getItem('token');

  const handleStatusChange = async (status) => {
    try {
      const response = await fetch(`http://localhost:8800/api/cases/changecasestatus/${caseDetails._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status, lawyer_id: localStorage.getItem('userId') }),
      });

      if (!response.ok) {
        throw new Error('Failed to update case status');
      }

      enqueueSnackbar(`Case marked as ${status}`, { variant: 'success' });
      navigate('/lawyer-cases');
    } catch (error) {
      enqueueSnackbar(error.message || 'Failed to update case status', { variant: 'error' });
    }
  };

  return (
    <Container maxWidth="sm" sx={{ padding: '2rem' }}>
      <Paper elevation={3} sx={{ padding: '2rem', borderRadius: '12px' }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>Case Details</Typography>
        <Typography><strong>Type:</strong> {caseDetails.incident_type}</Typography>
        <Typography><strong>Location:</strong> {caseDetails.incident_location}</Typography>
        <Typography><strong>Description:</strong> {caseDetails.incident_description}</Typography>
        <Typography><strong>Status:</strong> {caseDetails.case_status}</Typography>

        {caseDetails.case_status === 'pending' && (
          <Stack spacing={2} direction="row" justifyContent="center" sx={{ marginTop: '2rem' }}>
            <Button variant="contained" color="success" onClick={() => handleStatusChange('accepted')}>
              Accept
            </Button>
            <Button variant="contained" color="error" onClick={() => handleStatusChange('rejected')}>
              Reject
            </Button>
          </Stack>
        )}
      </Paper>
    </Container>
  );
};

export default CaseDetails;
