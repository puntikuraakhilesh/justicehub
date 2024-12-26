import React, { useState } from 'react';
import axios from 'axios';
import {
  TextField,
  Button,
  Box,
  Typography,
  Paper,
  Chip,
  IconButton,
  Grid,
  InputAdornment
} from '@mui/material';
import { Add as AddIcon, Close as CloseIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import {  useSnackbar } from 'notistack';
const LawyerDetails = () => {
  const { enqueueSnackbar } = useSnackbar();
    const showToast = (message, variant = "info") => {
      enqueueSnackbar(message, { variant });
    };
  const navigate=useNavigate();
  const [formData, setFormData] = useState({
    professional_summary: '',
    area_of_practice: [],
    education: '',
    work_experience: 0,
    licences_certificates: [],
    case_studies: [],
    jurisdiction: [],
    email: '',
    phone_number: '',
    awards: [],
    number_of_cases_handled: 0
  });

  const [tempInputs, setTempInputs] = useState({
    area: '',
    license: '',
    jurisdiction: '',
    award: ''
  });

  const [caseStudy, setCaseStudy] = useState({
    title: '',
    description: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleArrayInput = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: [...prev[field], value]
    }));
    setTempInputs((prev) => ({
      ...prev,
      [field === 'area_of_practice'
        ? 'area'
        : field === 'licences_certificates'
        ? 'license'
        : field === 'jurisdiction'
        ? 'jurisdiction'
        : 'award']: ''
    }));
  };

  const handleRemoveItem = (field, index) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const handleAddCaseStudy = () => {
    if (caseStudy.title && caseStudy.description) {
      setFormData((prev) => ({
        ...prev,
        case_studies: [...prev.case_studies, caseStudy]
      }));
      setCaseStudy({ title: '', description: '' });
    }
  };

 
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const token = localStorage.getItem('token');
        const user_id = localStorage.getItem('userId');
    
        const payload = {
          ...formData,
          user_id, // Ensure this field is included
          work_experience: parseInt(formData.work_experience, 10), // Convert to number
          number_of_cases_handled: parseInt(formData.number_of_cases_handled, 10) // Convert to number
        };
    
         // Debugging log
    
        const response = await axios.post(
          'http://localhost:8800/api/lawyerdetails/adddetails',
          payload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(payload);
        navigate('/lawyerhome');
        showToast("Details Filled Sucesskful","success");
      } catch (error) {
        console.error('Error submitting form:', error.response?.data || error.message);
        showToast("All fields are required","warning");
        
      }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      sx={{
        backgroundColor: '#f5f5f5',
        padding: 3
      }}
    >
      <Paper
        elevation={3}
        sx={{
          width: { xs: '100%', sm: '90%', md: '80%', lg: '70%' },
          maxWidth: '100%',
          padding: 4,
          borderRadius: 3
        }}
      >
        <Typography variant="h4" align="center" sx={{ mb: 3, fontWeight: 'bold', color: '#333' }}>
          Lawyer Details Form
        </Typography>

        <form onSubmit={handleSubmit} width="100%">
          <Grid container spacing={3} justifyContent="center" alignItems="stretch">
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Professional Summary"
                name="professional_summary"
                value={formData.professional_summary}
                onChange={handleInputChange}
                required
                variant="outlined"
                sx={{ width: '100%' }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Add Area of Practice"
                value={tempInputs.area}
                onChange={(e) => setTempInputs((prev) => ({ ...prev, area: e.target.value }))}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => handleArrayInput('area_of_practice', tempInputs.area)}
                        disabled={!tempInputs.area}
                      >
                        <AddIcon />
                      </IconButton>
                    </InputAdornment>
                  )
                }}
                variant="outlined"
                sx={{ width: '100%' }}
              />
              <Box sx={{ mt: 1, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {formData.area_of_practice.map((area, index) => (
                  <Chip
                    key={index}
                    label={area}
                    onDelete={() => handleRemoveItem('area_of_practice', index)}
                    color="primary"
                  />
                ))}
              </Box>
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Education"
                name="education"
                value={formData.education}
                onChange={handleInputChange}
                required
                variant="outlined"
                sx={{ width: '100%' }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="number"
                label="Years of Work Experience"
                name="work_experience"
                value={formData.work_experience}
                onChange={handleInputChange}
                required
                variant="outlined"
                sx={{ width: '100%' }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="number"
                label="Number of Cases Handled"
                name="number_of_cases_handled"
                value={formData.number_of_cases_handled}
                onChange={handleInputChange}
                required
                variant="outlined"
                sx={{ width: '100%' }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                variant="outlined"
                sx={{ width: '100%' }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Phone Number"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleInputChange}
                required
                variant="outlined"
                sx={{ width: '100%' }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Add License/Certificate"
                value={tempInputs.license}
                onChange={(e) => setTempInputs((prev) => ({ ...prev, license: e.target.value }))}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => handleArrayInput('licences_certificates', tempInputs.license)}
                        disabled={!tempInputs.license}
                      >
                        <AddIcon />
                      </IconButton>
                    </InputAdornment>
                  )
                }}
                variant="outlined"
                sx={{ width: '100%' }}
              />
              <Box sx={{ mt: 1, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {formData.licences_certificates.map((license, index) => (
                  <Chip
                    key={index}
                    label={license}
                    onDelete={() => handleRemoveItem('licences_certificates', index)}
                    color="secondary"
                  />
                ))}
              </Box>
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Add Jurisdiction"
                value={tempInputs.jurisdiction}
                onChange={(e) => setTempInputs((prev) => ({ ...prev, jurisdiction: e.target.value }))}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => handleArrayInput('jurisdiction', tempInputs.jurisdiction)}
                        disabled={!tempInputs.jurisdiction}
                      >
                        <AddIcon />
                      </IconButton>
                    </InputAdornment>
                  )
                }}
                variant="outlined"
                sx={{ width: '100%' }}
              />
              <Box sx={{ mt: 1, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {formData.jurisdiction.map((jurisdiction, index) => (
                  <Chip
                    key={index}
                    label={jurisdiction}
                    onDelete={() => handleRemoveItem('jurisdiction', index)}
                    color="secondary"
                  />
                ))}
              </Box>
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Add Award"
                value={tempInputs.award}
                onChange={(e) => setTempInputs((prev) => ({ ...prev, award: e.target.value }))}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => handleArrayInput('awards', tempInputs.award)}
                        disabled={!tempInputs.award}
                      >
                        <AddIcon />
                      </IconButton>
                    </InputAdornment>
                  )
                }}
                variant="outlined"
                sx={{ width: '100%' }}
              />
              <Box sx={{ mt: 1, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {formData.awards.map((award, index) => (
                  <Chip
                    key={index}
                    label={award}
                    onDelete={() => handleRemoveItem('awards', index)}
                    color="secondary"
                  />
                ))}
              </Box>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Case Studies
              </Typography>
              <TextField
                fullWidth
                label="Case Study Title"
                value={caseStudy.title}
                onChange={(e) => setCaseStudy((prev) => ({ ...prev, title: e.target.value }))}
                sx={{ mb: 1, width: '100%' }}
                variant="outlined"
              />
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Case Study Description"
                value={caseStudy.description}
                onChange={(e) =>
                  setCaseStudy((prev) => ({ ...prev, description: e.target.value }))
                }
                sx={{ mb: 2, width: '100%' }}
                variant="outlined"
              />
              <Button
                variant="outlined"
                onClick={handleAddCaseStudy}
                disabled={!caseStudy.title || !caseStudy.description}
              >
                Add Case Study
              </Button>
              <Box sx={{ mt: 2 }}>
                {formData.case_studies.map((study, index) => (
                  <Paper
                    key={index}
                    elevation={1}
                    sx={{ p: 2, mb: 2, display: 'flex', justifyContent: 'space-between', width: '100%' }}
                  >
                    <Box>
                      <Typography variant="subtitle1" fontWeight="bold">
                        {study.title}
                      </Typography>
                      <Typography variant="body2">{study.description}</Typography>
                    </Box>
                    <IconButton
                      size="small"
                      onClick={() => handleRemoveItem('case_studies', index)}
                    >
                      <CloseIcon />
                    </IconButton>
                  </Paper>
                ))}
              </Box>
            </Grid>

            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                size="large"
                fullWidth
                sx={{
                  py: 1.5,
                  fontSize: '1rem',
                  borderRadius: 2,
                  backgroundColor: '#000',
                  '&:hover': {
                    backgroundColor: '#333'
                  },
                  boxShadow: '0 3px 5px rgba(0, 0, 0, 0.2)',
                  width: '100%'
                }}
              >
                Submit Details
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
};

export default LawyerDetails;

