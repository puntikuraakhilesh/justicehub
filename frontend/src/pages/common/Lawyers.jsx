import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
const Lawyers = () => {
  const [lawyers, setLawyers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    
    const fetchLawyers = async () => {
      try {
        const usersResponse = await axios.get('http://localhost:8800/api/auth/getalllawyers', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const lawyerDetailsResponse = await axios.get('http://localhost:8800/api/lawyerdetails/getalldetails', {
          headers: { Authorization: `Bearer ${token}` },
        });

        const userData = usersResponse.data.data;
        const lawyerDetails = lawyerDetailsResponse.data.data;

        const combinedData = lawyerDetails.map((lawyer) => {
          const user = userData.find((user) => user._id === lawyer.user_id);
          return { ...lawyer, username: user?.username || 'Unknown' };
        });

        setLawyers(combinedData);
      } catch (error) {
        console.error('Error fetching lawyers:', error);
      }
    };
    fetchLawyers();
  }, [token]);

  const location = useLocation();
  const caseId = location.state?.caseId;

  const handleCardClick = (lawyer) => {
    navigate(`/lawyer/${lawyer._id}`, { state: { lawyer, caseId } });
  };

  const filteredLawyers = lawyers.filter((lawyer) => {
    const name = lawyer.username?.toLowerCase() || '';
    const jurisdictions = Array.isArray(lawyer.jurisdiction) ? lawyer.jurisdiction.map(j => j.toLowerCase()).join(' ') : '';
    return name.includes(searchTerm.toLowerCase()) || jurisdictions.includes(searchTerm.toLowerCase());
  });

  return (
    <div className="p-6">
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by name or jurisdiction..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredLawyers.map((lawyer) => (
          <div
            key={lawyer._id}
            className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-xl cursor-pointer transition-all relative"
            onClick={() => handleCardClick(lawyer)}
          >
            <img src="/profile-placeholder.png" alt="Profile" className="w-12 h-12 rounded-full absolute top-4 left-4" />
            <div className="ml-20">
              <h2 className="text-2xl font-bold text-gray-800">{lawyer.username}</h2>
              <p className="text-gray-600 mt-2">{lawyer.professional_summary}</p>
              <p className="text-gray-500 mt-1">Experience: {lawyer.work_experience} years</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Lawyers;
