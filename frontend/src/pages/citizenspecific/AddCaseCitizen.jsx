import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  CircularProgress,
} from '@mui/material';

const AddCaseCitizen = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const token = localStorage.getItem('token');
  const user_id = localStorage.getItem('userId'); // Fetch user_id from localStorage

  const [formData, setFormData] = useState({
    mobile_no: '',
    email: '',
    gender: '',
    incident_type: '',
    incident_description: '',
    incident_location: '',
  });

  const [loading, setLoading] = useState(false);

  const showToast = (message, variant = 'info') => {
    enqueueSnackbar(message, { variant });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const caseData = { ...formData, user_id }; // Include user_id in the request body

    try {
      const response = await fetch('http://localhost:8800/api/cases/addcase', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(caseData),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to add case');
      }

      showToast('Case added successfully!', 'success');
      navigate('/mycasescitizen');
    } catch (error) {
      showToast(error.message || 'Failed to add case', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container
      maxWidth="md"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: '2rem',
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          width: '100%',
          maxWidth: '700px',
          backgroundColor: '#fff',
          padding: '2rem',
          borderRadius: '10px',
          boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
        }}
      >
        <Typography variant="h4" gutterBottom align="center" sx={{ color: '#000' }}>
          Add New Case
        </Typography>

        <TextField
          fullWidth
          label="Mobile No"
          name="mobile_no"
          value={formData.mobile_no}
          onChange={handleChange}
          margin="normal"
          required
        />

        <TextField
          fullWidth
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          margin="normal"
          required
        />

        <FormControl fullWidth margin="normal">
          <InputLabel>Gender</InputLabel>
          <Select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
          >
            <MenuItem value="male">Male</MenuItem>
            <MenuItem value="female">Female</MenuItem>
            <MenuItem value="other">Other</MenuItem>
          </Select>
        </FormControl>

        <TextField
          fullWidth
          label="Incident Type"
          name="incident_type"
          value={formData.incident_type}
          onChange={handleChange}
          margin="normal"
          required
        />

        <TextField
          fullWidth
          label="Incident Description"
          name="incident_description"
          value={formData.incident_description}
          onChange={handleChange}
          margin="normal"
          multiline
          rows={3}
          required
        />

        <TextField
          fullWidth
          label="Incident Location"
          name="incident_location"
          value={formData.incident_location}
          onChange={handleChange}
          margin="normal"
          required
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          disabled={loading}
          sx={{
            backgroundColor: '#000',
            color: '#fff',
            fontWeight: 'bold',
            marginTop: '1.5rem',
            '&:hover': { backgroundColor: '#333' },
          }}
        >
          {loading ? <CircularProgress size={24} sx={{ color: '#fff' }} /> : 'Submit Case'}
        </Button>
      </Box>
    </Container>
  );
};

export default AddCaseCitizen;
