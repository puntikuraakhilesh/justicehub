import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSnackbar } from 'notistack';
const LawyerDet = () => {
  const { enqueueSnackbar } = useSnackbar();
    const showToast = (message, variant = "info") => {
      enqueueSnackbar(message, { variant });
    };
  const { state } = useLocation();
  const navigate = useNavigate();
  const lawyer = state?.lawyer;
  const caseId = state?.caseId;

  if (!lawyer) {
    return <div className="p-10 text-center text-red-600 font-semibold">Lawyer details not available.</div>;
  }

  const handleAssignLawyer = async () => {
    try {
      const lawyerId = lawyer.user_id; // Use user_id from the Lawyer model
  
      console.log('Assigning lawyer:', { caseId, lawyerId });
  
      const response = await fetch(`http://localhost:8800/api/cases/assignlawyer/${caseId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ lawyer_id: lawyerId }), // Send user_id as lawyer_id
      });
  
      const result = await response.json();
      console.log('API Response:', result);
  
      if (!response.ok) throw new Error(result.message || 'Failed to assign lawyer');
  
      showToast("Assigned to lawyer", "success");
      navigate('/citizanhome');
    } catch (error) {
      console.error('Error assigning lawyer:', error);
      showToast("Failed to assign a lawyer", "error");
    }
  };
  

  return (
    <div className="p-10 max-w-5xl mx-auto bg-white shadow-lg rounded-lg border border-gray-200">
      <div className="flex justify-between items-center border-b pb-6 mb-8">
        <div className="flex items-center gap-8">
          <img 
            src="/profile-placeholder.png" 
            alt="Profile" 
            className="w-32 h-32 rounded-full border-4 border-gray-300 shadow-sm" 
          />
          <div>
            <h1 className="text-4xl font-extrabold text-gray-800 capitalize">{lawyer.username || 'Lawyer'}</h1>
            <p className="text-lg text-gray-600 mt-2">{lawyer.professional_summary || 'No summary available'}</p>
          </div>
        </div>

        {caseId && (
          <button 
            onClick={handleAssignLawyer} 
            className="bg-black text-white px-6 py-3 rounded-lg font-semibold hover:opacity-80 transition"
          >
            Assign to this Lawyer
          </button>
        )}
      </div>

      <div className="grid grid-cols-2 gap-8">
        <DetailCard title="Education" content={lawyer.education || 'Not specified'} />
        <DetailCard title="Work Experience" content={`${lawyer.work_experience || 0} years`} />
        <DetailCard title="Number of Cases Handled" content={lawyer.number_of_cases_handled || 'Not specified'} />
        <DetailCard title="Contact Information">
          <div><strong>Email:</strong> {lawyer.email}</div>
          <div><strong>Phone:</strong> {lawyer.phone_number}</div>
        </DetailCard>
        <DetailList title="Area of Practice" items={lawyer.area_of_practice} />
        <DetailList title="Jurisdictions" items={lawyer.jurisdiction} />
        <DetailList title="Licenses & Certificates" items={lawyer.licences_certificates} />
        <DetailList title="Awards" items={lawyer.awards} />
      </div>
    </div>
  );
};

const DetailCard = ({ title, content, children }) => (
  <div className="p-6 border rounded-lg shadow-sm bg-gray-50">
    <h3 className="text-2xl font-semibold text-gray-800">{title}</h3>
    <div className="text-gray-600 mt-2">{content}</div>
    {children}
  </div>
);

const DetailList = ({ title, items = [] }) => (
  <div className="p-6 border rounded-lg shadow-sm bg-gray-50">
    <h3 className="text-2xl font-semibold text-gray-800">{title}</h3>
    {items.length > 0 ? (
      <ul className="list-disc list-inside text-gray-600 mt-2 space-y-2">
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    ) : (
      <div className="text-gray-500 mt-2">Not specified</div>
    )}
  </div>
);

export default LawyerDet;
