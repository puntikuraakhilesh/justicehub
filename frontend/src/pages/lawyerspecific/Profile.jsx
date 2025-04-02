import React, { useState, useEffect } from 'react';
import { Container, Typography, TextField, Button, Grid, Box, IconButton } from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';
import axios from 'axios';

const Profile = () => {
  const [lawyerDetails, setLawyerDetails] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    professional_summary: '',
    area_of_practice: [''],
    education: '',
    work_experience: 0,
    licences_certificates: [''],
    case_studies: [{ title: '', description: '' }],
    jurisdiction: [''],
    email: '',
    phone_number: '',
    awards: [''],
    number_of_cases_handled: 0,
  });

  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/api/lawyerdetails/getdetails/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setLawyerDetails(res.data);
        setFormData(res.data);
      } catch (error) {
        console.error('Error fetching lawyer details:', error);
      }
    };

    if (userId && token) fetchDetails();
  }, [userId, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleArrayChange = (e, key, index) => {
    const { value } = e.target;
    setFormData((prev) => {
      const updatedArray = [...prev[key]];
      updatedArray[index] = value;
      return { ...prev, [key]: updatedArray };
    });
  };

  const handleCaseStudyChange = (index, field, value) => {
    setFormData((prev) => {
      const updatedCaseStudies = [...prev.case_studies];
      updatedCaseStudies[index] = {
        ...updatedCaseStudies[index],
        [field]: value
      };
      return { ...prev, case_studies: updatedCaseStudies };
    });
  };

  const addArrayItem = (key, defaultValue) => {
    setFormData((prev) => ({
      ...prev,
      [key]: [...prev[key], defaultValue],
    }));
  };

  const addCaseStudy = () => {
    setFormData((prev) => ({
      ...prev,
      case_studies: [...prev.case_studies, { title: '', description: '' }],
    }));
  };

  const removeArrayItem = (key, index) => {
    setFormData((prev) => {
      const updatedArray = prev[key].filter((_, i) => i !== index);
      return { ...prev, [key]: updatedArray };
    });
  };

  const removeCaseStudy = (index) => {
    setFormData((prev) => {
      const updatedCaseStudies = prev.case_studies.filter((_, i) => i !== index);
      return { ...prev, case_studies: updatedCaseStudies };
    });
  };

  const handleSubmit = async () => {
    try {
      await axios.patch(`http://localhost:8800/api/lawyerdetails/editdetails/${userId}`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setLawyerDetails(formData);
      setEditMode(false);
    } catch (error) {
      console.error('Error updating details:', error);
    }
  };

  return (
    <Container maxWidth="md" sx={{ bgcolor: '#fff', p: 4, borderRadius: 2, boxShadow: 3 }}>
      <Typography variant="h4" mb={3} sx={{ fontWeight: 'bold', color: '#000' }}>Lawyer Profile</Typography>

      {lawyerDetails ? (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField fullWidth label="Professional Summary" name="professional_summary" value={formData.professional_summary} onChange={handleChange} margin="normal" disabled={!editMode} />
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6">Area of Practice</Typography>
            {formData.area_of_practice.map((item, index) => (
              <Box key={index} display="flex" alignItems="center" gap={1} mb={2}>
                <TextField fullWidth variant="outlined" value={item} onChange={(e) => handleArrayChange(e, 'area_of_practice', index)} disabled={!editMode} />
                {editMode && formData.area_of_practice.length > 1 && (
                  <IconButton onClick={() => removeArrayItem('area_of_practice', index)} color="error">
                    <DeleteIcon />
                  </IconButton>
                )}
              </Box>
            ))}
            {editMode && <Button startIcon={<AddIcon />} onClick={() => addArrayItem('area_of_practice', '')}>Add Area of Practice</Button>}
          </Grid>

          <Grid item xs={12}>
            <TextField fullWidth label="Education" name="education" value={formData.education} onChange={handleChange} margin="normal" disabled={!editMode} />
          </Grid>

          <Grid item xs={12}>
            <TextField fullWidth label="Work Experience (Years)" name="work_experience" type="number" value={formData.work_experience} onChange={handleChange} margin="normal" disabled={!editMode} />
          </Grid>

          {/* Licenses & Certificates Section */}
          <Grid item xs={12}>
            <Typography variant="h6">Licenses & Certificates</Typography>
            {formData.licences_certificates.map((item, index) => (
              <Box key={index} display="flex" alignItems="center" gap={1} mb={2}>
                <TextField fullWidth variant="outlined" value={item} onChange={(e) => handleArrayChange(e, 'licences_certificates', index)} disabled={!editMode} />
                {editMode && formData.licences_certificates.length > 1 && (
                  <IconButton onClick={() => removeArrayItem('licences_certificates', index)} color="error">
                    <DeleteIcon />
                  </IconButton>
                )}
              </Box>
            ))}
            {editMode && <Button startIcon={<AddIcon />} onClick={() => addArrayItem('licences_certificates', '')}>Add License/Certificate</Button>}
          </Grid>

          {/* Case Studies Section */}
          <Grid item xs={12}>
            <Typography variant="h6">Case Studies</Typography>
            {formData.case_studies.map((caseStudy, index) => (
              <Box key={index} p={2} mb={3} sx={{ border: '1px solid #e0e0e0', borderRadius: 1 }}>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                  <Typography variant="subtitle1">Case Study #{index + 1}</Typography>
                  {editMode && formData.case_studies.length > 1 && (
                    <IconButton onClick={() => removeCaseStudy(index)} color="error">
                      <DeleteIcon />
                    </IconButton>
                  )}
                </Box>
                <TextField
                  fullWidth
                  label="Title"
                  value={caseStudy.title}
                  onChange={(e) => handleCaseStudyChange(index, 'title', e.target.value)}
                  margin="normal"
                  disabled={!editMode}
                />
                <TextField
                  fullWidth
                  label="Description"
                  value={caseStudy.description}
                  onChange={(e) => handleCaseStudyChange(index, 'description', e.target.value)}
                  margin="normal"
                  multiline
                  rows={4}
                  disabled={!editMode}
                />
              </Box>
            ))}
            {editMode && <Button startIcon={<AddIcon />} onClick={addCaseStudy}>Add Case Study</Button>}
          </Grid>

          {/* Jurisdiction Section */}
          <Grid item xs={12}>
            <Typography variant="h6">Jurisdiction</Typography>
            {formData.jurisdiction.map((item, index) => (
              <Box key={index} display="flex" alignItems="center" gap={1} mb={2}>
                <TextField fullWidth variant="outlined" value={item} onChange={(e) => handleArrayChange(e, 'jurisdiction', index)} disabled={!editMode} />
                {editMode && formData.jurisdiction.length > 1 && (
                  <IconButton onClick={() => removeArrayItem('jurisdiction', index)} color="error">
                    <DeleteIcon />
                  </IconButton>
                )}
              </Box>
            ))}
            {editMode && <Button startIcon={<AddIcon />} onClick={() => addArrayItem('jurisdiction', '')}>Add Jurisdiction</Button>}
          </Grid>

          <Grid item xs={12}>
            <TextField fullWidth label="Email" name="email" value={formData.email} onChange={handleChange} margin="normal" disabled={!editMode} />
          </Grid>

          <Grid item xs={12}>
            <TextField fullWidth label="Phone Number" name="phone_number" value={formData.phone_number} onChange={handleChange} margin="normal" disabled={!editMode} />
          </Grid>

          {/* Awards Section */}
          <Grid item xs={12}>
            <Typography variant="h6">Awards</Typography>
            {formData.awards.map((item, index) => (
              <Box key={index} display="flex" alignItems="center" gap={1} mb={2}>
                <TextField fullWidth variant="outlined" value={item} onChange={(e) => handleArrayChange(e, 'awards', index)} disabled={!editMode} />
                {editMode && formData.awards.length > 1 && (
                  <IconButton onClick={() => removeArrayItem('awards', index)} color="error">
                    <DeleteIcon />
                  </IconButton>
                )}
              </Box>
            ))}
            {editMode && <Button startIcon={<AddIcon />} onClick={() => addArrayItem('awards', '')}>Add Award</Button>}
          </Grid>

          <Grid item xs={12}>
            <TextField fullWidth label="Number of Cases Handled" name="number_of_cases_handled" type="number" value={formData.number_of_cases_handled} onChange={handleChange} margin="normal" disabled={!editMode} />
          </Grid>
        </Grid>
      ) : (
        <Typography>Loading...</Typography>
      )}

      {editMode ? (
        <Box mt={3} display="flex" gap={2}>
          <Button variant="contained" color="primary" onClick={handleSubmit}>Save</Button>
          <Button variant="outlined" color="secondary" onClick={() => setEditMode(false)}>Cancel</Button>
        </Box>
      ) : (
        <Button variant="contained" color="primary" sx={{ mt: 3 }} onClick={() => setEditMode(true)}>Edit Profile</Button>
      )}
    </Container>
  );
};

export default Profile;




// import React, { useState, useEffect } from 'react';
// import { Container, Typography, TextField, Button, Grid, Box, IconButton } from '@mui/material';
// import { Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';
// import axios from 'axios';

// const Profile = () => {
//   const [lawyerDetails, setLawyerDetails] = useState(null);
//   const [editMode, setEditMode] = useState(false);
//   const [formData, setFormData] = useState({
//     professional_summary: '',
//     area_of_practice: [''],
//     education: '',
//     work_experience: 0,
//     licences_certificates: [''],
//     case_studies: [{ title: '', description: '' }],
//     jurisdiction: [''],
//     email: '',
//     phone_number: '',
//     awards: [''],
//     number_of_cases_handled: 0,
//   });

//   const userId = localStorage.getItem('userId');
//   const token = localStorage.getItem('token');

//   useEffect(() => {
//     const fetchDetails = async () => {
//       try {
//         const res = await axios.get(`http://localhost:8800/api/lawyerdetails/getdetails/${userId}`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setLawyerDetails(res.data);
//         setFormData(res.data);
//       } catch (error) {
//         console.error('Error fetching lawyer details:', error);
//       }
//     };

//     if (userId && token) fetchDetails();
//   }, [userId, token]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleArrayChange = (e, key, index) => {
//     const { value } = e.target;
//     setFormData((prev) => {
//       const updatedArray = [...prev[key]];
//       updatedArray[index] = value;
//       return { ...prev, [key]: updatedArray };
//     });
//   };

//   const addArrayItem = (key, defaultValue) => {
//     setFormData((prev) => ({
//       ...prev,
//       [key]: [...prev[key], defaultValue],
//     }));
//   };

//   const removeArrayItem = (key, index) => {
//     setFormData((prev) => {
//       const updatedArray = prev[key].filter((_, i) => i !== index);
//       return { ...prev, [key]: updatedArray };
//     });
//   };

//   const handleSubmit = async () => {
//     try {
//       await axios.patch(`http://localhost:8800/api/lawyerdetails/editdetails/${userId}`, formData, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setLawyerDetails(formData);
//       setEditMode(false);
//     } catch (error) {
//       console.error('Error updating details:', error);
//     }
//   };

//   return (
//     <Container maxWidth="md" sx={{ bgcolor: '#fff', p: 4, borderRadius: 2, boxShadow: 3 }}>
//       <Typography variant="h4" mb={3} sx={{ fontWeight: 'bold', color: '#000' }}>Lawyer Profile</Typography>

//       {lawyerDetails ? (
//         <Grid container spacing={2}>
//           <Grid item xs={12}>
//             <TextField fullWidth label="Professional Summary" name="professional_summary" value={formData.professional_summary} onChange={handleChange} margin="normal" disabled={!editMode} />
//           </Grid>

//           <Grid item xs={12}>
//             <Typography variant="h6">Area of Practice</Typography>
//             {formData.area_of_practice.map((item, index) => (
//               <Box key={index} display="flex" alignItems="center" gap={1} mb={2}>
//                 <TextField fullWidth variant="outlined" value={item} onChange={(e) => handleArrayChange(e, 'area_of_practice', index)} disabled={!editMode} />
//                 {editMode && (
//                   <IconButton onClick={() => removeArrayItem('area_of_practice', index)} color="error">
//                     <DeleteIcon />
//                   </IconButton>
//                 )}
//               </Box>
//             ))}
//             {editMode && <Button startIcon={<AddIcon />} onClick={() => addArrayItem('area_of_practice', '')}>Add Area of Practice</Button>}
//           </Grid>

//           <Grid item xs={12}>
//             <TextField fullWidth label="Education" name="education" value={formData.education} onChange={handleChange} margin="normal" disabled={!editMode} />
//           </Grid>

//           <Grid item xs={12}>
//             <TextField fullWidth label="Work Experience (Years)" name="work_experience" type="number" value={formData.work_experience} onChange={handleChange} margin="normal" disabled={!editMode} />
//           </Grid>

//           <Grid item xs={12}>
//             <TextField fullWidth label="Email" name="email" value={formData.email} onChange={handleChange} margin="normal" disabled={!editMode} />
//           </Grid>

//           <Grid item xs={12}>
//             <TextField fullWidth label="Phone Number" name="phone_number" value={formData.phone_number} onChange={handleChange} margin="normal" disabled={!editMode} />
//           </Grid>

//           <Grid item xs={12}>
//             <TextField fullWidth label="Number of Cases Handled" name="number_of_cases_handled" type="number" value={formData.number_of_cases_handled} onChange={handleChange} margin="normal" disabled={!editMode} />
//           </Grid>
//         </Grid>
//       ) : (
//         <Typography>Loading...</Typography>
//       )}

//       {editMode ? (
//         <Box mt={3} display="flex" gap={2}>
//           <Button variant="contained" color="primary" onClick={handleSubmit}>Save</Button>
//           <Button variant="outlined" color="secondary" onClick={() => setEditMode(false)}>Cancel</Button>
//         </Box>
//       ) : (
//     <Button variant="contained" color="primary" sx={{ mt: 3 }} onClick={() => setEditMode(true)}>Edit Profile</Button>
//     )}
//     </Container>
//   );
// };

// export default Profile;




// import React, { useState, useEffect } from 'react';
// import { Container, Typography, TextField, Button, Grid, Box, IconButton } from '@mui/material';
// import { Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';
// import axios from 'axios';

// const Profile = () => {
//   const [lawyerDetails, setLawyerDetails] = useState(null);
//   const [editMode, setEditMode] = useState(false);
//   const [formData, setFormData] = useState({
//     professional_summary: '',
//     area_of_practice: [''],
//     education: '',
//     work_experience: 0,
//     licences_certificates: [''],
//     case_studies: [{ title: '', description: '' }],
//     jurisdiction: [''],
//     email: '',
//     phone_number: '',
//     awards: [''],
//     number_of_cases_handled: 0,
//   });

//   const userId = localStorage.getItem('userId');
//   const token = localStorage.getItem('token');

//   useEffect(() => {
//     const fetchDetails = async () => {
//       try {
//         const res = await axios.get(`http://localhost:8800/api/lawyerdetails/getdetails/${userId}`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setLawyerDetails(res.data);
//         setFormData(res.data);
//       } catch (error) {
//         console.error('Error fetching lawyer details:', error);
//       }
//     };

//     if (userId && token) fetchDetails();
//   }, [userId, token]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleArrayChange = (e, key, index) => {
//     const { value } = e.target;
//     setFormData((prev) => {
//       const updatedArray = [...prev[key]];
//       updatedArray[index] = value;
//       return { ...prev, [key]: updatedArray };
//     });
//   };

//   const addArrayItem = (key, defaultValue) => {
//     setFormData((prev) => ({
//       ...prev,
//       [key]: [...prev[key], defaultValue],
//     }));
//   };

//   const removeArrayItem = (key, index) => {
//     setFormData((prev) => {
//       const updatedArray = prev[key].filter((_, i) => i !== index);
//       return { ...prev, [key]: updatedArray };
//     });
//   };

//   const handleSubmit = async () => {
//     try {
//       await axios.patch(`http://localhost:8800/api/lawyerdetails/editdetails/${userId}`, formData, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setLawyerDetails(formData);
//       setEditMode(false);
//     } catch (error) {
//       console.error('Error updating details:', error);
//     }
//   };

//   return (
//     <Container maxWidth="md" sx={{ bgcolor: '#fff', p: 4, borderRadius: 2, boxShadow: 3 }}>
//       <Typography variant="h4" mb={3} sx={{ fontWeight: 'bold', color: '#000' }}>Lawyer Profile</Typography>

//       {lawyerDetails ? (
//         <Grid container spacing={2}>
//           <Grid item xs={12}>
//             <TextField fullWidth label="Professional Summary" name="professional_summary" value={formData.professional_summary} onChange={handleChange} margin="normal" disabled={!editMode} />
//           </Grid>

//           <Grid item xs={12}>
//             <Typography variant="h6">Area of Practice</Typography>
//             {formData.area_of_practice.map((item, index) => (
//               <Box key={index} display="flex" alignItems="center" gap={1} mb={2}>
//                 <TextField fullWidth variant="outlined" value={item} onChange={(e) => handleArrayChange(e, 'area_of_practice', index)} disabled={!editMode} />
//                 {editMode && (
//                   <IconButton onClick={() => removeArrayItem('area_of_practice', index)} color="error">
//                     <DeleteIcon />
//                   </IconButton>
//                 )}
//               </Box>
//             ))}
//             {editMode && <Button startIcon={<AddIcon />} onClick={() => addArrayItem('area_of_practice', '')}>Add Area of Practice</Button>}
//           </Grid>

//           <Grid item xs={12}>
//             <TextField fullWidth label="Education" name="education" value={formData.education} onChange={handleChange} margin="normal" disabled={!editMode} />
//           </Grid>

//           <Grid item xs={12}>
//             <TextField fullWidth label="Work Experience (Years)" name="work_experience" type="number" value={formData.work_experience} onChange={handleChange} margin="normal" disabled={!editMode} />
//           </Grid>

//           <Grid item xs={12}>
//             <TextField fullWidth label="Licences & Certificates" name="licences_certificates" value={formData.licences_certificates.join(', ')} onChange={handleChange} margin="normal" disabled={!editMode} />
//           </Grid>

//           <Grid item xs={12}>
//             <TextField fullWidth label="Jurisdiction" name="jurisdiction" value={formData.jurisdiction.join(', ')} onChange={handleChange} margin="normal" disabled={!editMode} />
//           </Grid>

//           <Grid item xs={12}>
//             <TextField fullWidth label="Email" name="email" value={formData.email} onChange={handleChange} margin="normal" disabled={!editMode} />
//           </Grid>

//           <Grid item xs={12}>
//             <TextField fullWidth label="Phone Number" name="phone_number" value={formData.phone_number} onChange={handleChange} margin="normal" disabled={!editMode} />
//           </Grid>

//           <Grid item xs={12}>
//             <TextField fullWidth label="Awards" name="awards" value={formData.awards.join(', ')} onChange={handleChange} margin="normal" disabled={!editMode} />
//           </Grid>

//           <Grid item xs={12}>
//             <TextField fullWidth label="Number of Cases Handled" name="number_of_cases_handled" type="number" value={formData.number_of_cases_handled} onChange={handleChange} margin="normal" disabled={!editMode} />
//           </Grid>
//         </Grid>
//       ) : (
//         <Typography>Loading...</Typography>
//       )}

//       {editMode ? (
//         <Box mt={3} display="flex" gap={2}>
//           <Button variant="contained" color="primary" onClick={handleSubmit}>Save</Button>
//           <Button variant="outlined" color="secondary" onClick={() => setEditMode(false)}>Cancel</Button>
//         </Box>
//       ) : (
//         <Button variant="contained" color="primary" sx={{ mt: 3 }} onClick={() => setEditMode(true)}>Edit Profile</Button>
//       )}
//     </Container>
//   );
// };

// export default Profile;


