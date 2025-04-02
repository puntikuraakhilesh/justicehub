
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const Lawyers = () => {
  const [lawyers, setLawyers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPracticeAreas, setSelectedPracticeAreas] = useState([]);
  const [uniquePracticeAreas, setUniquePracticeAreas] = useState([]);
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
        setUniquePracticeAreas([...new Set(combinedData.flatMap((lawyer) => lawyer.area_of_practice || []))]);
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

  const handleCheckboxChange = (area) => {
    setSelectedPracticeAreas((prev) =>
      prev.includes(area) ? prev.filter((a) => a !== area) : [...prev, area]
    );
  };

  const filteredLawyers = lawyers.filter((lawyer) => {
    const name = lawyer.username?.toLowerCase() || '';
    const jurisdictions = Array.isArray(lawyer.jurisdiction) ? lawyer.jurisdiction.map(j => j.toLowerCase()).join(' ') : '';
    const hasMatchingArea = selectedPracticeAreas.length === 0 || lawyer.area_of_practice.some(area => selectedPracticeAreas.includes(area));

    return (
      (name.includes(searchTerm.toLowerCase()) || jurisdictions.includes(searchTerm.toLowerCase())) &&
      hasMatchingArea
    );
  });

  return (
    <div className="p-6 flex gap-6">
      {/* Filters Sidebar */}
      <div className="w-1/4 bg-white p-6 rounded-lg shadow-lg border border-gray-200">
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800">Filters</h2>
        </div>
        
        {/* Search Input */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search by name or jurisdiction..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Practice Area Filters */}
        <div className="mb-6">
          <h3 className="font-semibold text-gray-700 mb-2">Filter by Area of Practice:</h3>
          <div className="space-y-2">
            {uniquePracticeAreas.map((area) => (
              <label key={area} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selectedPracticeAreas.includes(area)}
                  onChange={() => handleCheckboxChange(area)}
                  className="h-4 w-4"
                />
                <span className="text-gray-700">{area}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Lawyers List */}
      <div className="w-3/4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredLawyers.map((lawyer) => (
            <div
              key={lawyer._id}
              className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-2xl cursor-pointer transition-all relative border border-gray-100"
              onClick={() => handleCardClick(lawyer)}
            >
              <img src="/profile-placeholder.png" alt="Profile" className="w-16 h-16 rounded-full absolute top-4 left-4 border-4 border-white" />
              <div className="ml-20">
                <h2 className="text-2xl font-bold text-gray-800">{lawyer.username}</h2>
                <p className="text-gray-600 mt-2">{lawyer.professional_summary}</p>
                <p className="text-gray-500 mt-1">Experience: {lawyer.work_experience} years</p>
                <p className="text-gray-500 mt-1">Cases Handled: {lawyer.number_of_cases_handled || 'Not provided'}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Lawyers;



// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { useLocation } from 'react-router-dom';
// const Lawyers = () => {
//   const [lawyers, setLawyers] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const navigate = useNavigate();
//   const token = localStorage.getItem('token');

//   useEffect(() => {
    
//     const fetchLawyers = async () => {
//       try {
//         const usersResponse = await axios.get('http://localhost:8800/api/auth/getalllawyers', {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         const lawyerDetailsResponse = await axios.get('http://localhost:8800/api/lawyerdetails/getalldetails', {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         const userData = usersResponse.data.data;
//         const lawyerDetails = lawyerDetailsResponse.data.data;

//         const combinedData = lawyerDetails.map((lawyer) => {
//           const user = userData.find((user) => user._id === lawyer.user_id);
//           return { ...lawyer, username: user?.username || 'Unknown' };
//         });

//         setLawyers(combinedData);
//       } catch (error) {
//         console.error('Error fetching lawyers:', error);
//       }
//     };
//     fetchLawyers();
//   }, [token]);

//   const location = useLocation();
//   const caseId = location.state?.caseId;

//   const handleCardClick = (lawyer) => {
//     navigate(`/lawyer/${lawyer._id}`, { state: { lawyer, caseId } });
//   };

//   const filteredLawyers = lawyers.filter((lawyer) => {
//     const name = lawyer.username?.toLowerCase() || '';
//     const jurisdictions = Array.isArray(lawyer.jurisdiction) ? lawyer.jurisdiction.map(j => j.toLowerCase()).join(' ') : '';
//     return name.includes(searchTerm.toLowerCase()) || jurisdictions.includes(searchTerm.toLowerCase());
//   });

//   return (
//     <div className="p-6">
//       <div className="mb-6">
//         <input
//           type="text"
//           placeholder="Search by name or jurisdiction..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {filteredLawyers.map((lawyer) => (
//           <div
//             key={lawyer._id}
//             className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-xl cursor-pointer transition-all relative"
//             onClick={() => handleCardClick(lawyer)}
//           >
//             <img src="/profile-placeholder.png" alt="Profile" className="w-12 h-12 rounded-full absolute top-4 left-4" />
//             <div className="ml-20">
//               <h2 className="text-2xl font-bold text-gray-800">{lawyer.username}</h2>
//               <p className="text-gray-600 mt-2">{lawyer.professional_summary}</p>
//               <p className="text-gray-500 mt-1">Experience: {lawyer.work_experience} years</p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Lawyers;



// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { useLocation } from 'react-router-dom';

// const Lawyers = () => {
//   const [lawyers, setLawyers] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [locationSearch, setLocationSearch] = useState('');
//   const [selectedPracticeAreas, setSelectedPracticeAreas] = useState([]);
//   const [uniquePracticeAreas, setUniquePracticeAreas] = useState([]);
//   const navigate = useNavigate();
//   const token = localStorage.getItem('token');

//   useEffect(() => {
//     const fetchLawyers = async () => {
//       try {
//         const usersResponse = await axios.get('http://localhost:8800/api/auth/getalllawyers', {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         const lawyerDetailsResponse = await axios.get('http://localhost:8800/api/lawyerdetails/getalldetails', {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         const userData = usersResponse.data.data;
//         const lawyerDetails = lawyerDetailsResponse.data.data;

//         const combinedData = lawyerDetails.map((lawyer) => {
//           const user = userData.find((user) => user._id === lawyer.user_id);
//           return { ...lawyer, username: user?.username || 'Unknown' };
//         });

//         setLawyers(combinedData);
//         setUniquePracticeAreas([...new Set(combinedData.flatMap((lawyer) => lawyer.area_of_practice || []))]);
//       } catch (error) {
//         console.error('Error fetching lawyers:', error);
//       }
//     };
//     fetchLawyers();
//   }, [token]);

//   const location = useLocation();
//   const caseId = location.state?.caseId;

//   const handleCardClick = (lawyer) => {
//     navigate(`/lawyer/${lawyer._id}`, { state: { lawyer, caseId } });
//   };

//   const handleCheckboxChange = (area) => {
//     setSelectedPracticeAreas((prev) =>
//       prev.includes(area) ? prev.filter((a) => a !== area) : [...prev, area]
//     );
//   };

//   const filteredLawyers = lawyers.filter((lawyer) => {
//     const name = lawyer.username?.toLowerCase() || '';
//     const jurisdictions = Array.isArray(lawyer.jurisdiction) ? lawyer.jurisdiction.map(j => j.toLowerCase()).join(' ') : '';
//     const location = lawyer.location?.toLowerCase() || '';
//     const hasMatchingArea = selectedPracticeAreas.length === 0 || lawyer.area_of_practice.some(area => selectedPracticeAreas.includes(area));

//     return (
//       (name.includes(searchTerm.toLowerCase()) || jurisdictions.includes(searchTerm.toLowerCase())) &&
//       location.includes(locationSearch.toLowerCase()) &&
//       hasMatchingArea
//     );
//   });

//   return (
//     <div className="p-6">
//       {/* Search Inputs */}
//       <div className="mb-6 flex flex-col md:flex-row gap-4">
//         <input
//           type="text"
//           placeholder="Search by name or jurisdiction..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//         <input
//           type="text"
//           placeholder="Search by location..."
//           value={locationSearch}
//           onChange={(e) => setLocationSearch(e.target.value)}
//           className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
//         />
//       </div>

//       {/* Practice Area Filters */}
//       <div className="mb-6">
//         <h3 className="font-semibold text-gray-700 mb-2">Filter by Area of Practice:</h3>
//         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
//           {uniquePracticeAreas.map((area) => (
//             <label key={area} className="flex items-center gap-2">
//               <input
//                 type="checkbox"
//                 checked={selectedPracticeAreas.includes(area)}
//                 onChange={() => handleCheckboxChange(area)}
//               />
//               {area}
//             </label>
//           ))}
//         </div>
//       </div>

//       {/* Lawyers List */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {filteredLawyers.map((lawyer) => (
//           <div
//             key={lawyer._id}
//             className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-xl cursor-pointer transition-all relative"
//             onClick={() => handleCardClick(lawyer)}
//           >
//             <img src="/profile-placeholder.png" alt="Profile" className="w-12 h-12 rounded-full absolute top-4 left-4" />
//             <div className="ml-20">
//               <h2 className="text-2xl font-bold text-gray-800">{lawyer.username}</h2>
//               <p className="text-gray-600 mt-2">{lawyer.professional_summary}</p>
//               <p className="text-gray-500 mt-1">Experience: {lawyer.work_experience} years</p>
//               <p className="text-gray-500 mt-1">Location: {lawyer.location || 'Not provided'}</p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Lawyers;



// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { useLocation } from 'react-router-dom';

// const Lawyers = () => {
//   const [lawyers, setLawyers] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [locationSearch, setLocationSearch] = useState('');
//   const [selectedPracticeAreas, setSelectedPracticeAreas] = useState([]);
//   const [uniquePracticeAreas, setUniquePracticeAreas] = useState([]);
//   const navigate = useNavigate();
//   const token = localStorage.getItem('token');

//   useEffect(() => {
//     const fetchLawyers = async () => {
//       try {
//         const usersResponse = await axios.get('http://localhost:8800/api/auth/getalllawyers', {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         const lawyerDetailsResponse = await axios.get('http://localhost:8800/api/lawyerdetails/getalldetails', {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         const userData = usersResponse.data.data;
//         const lawyerDetails = lawyerDetailsResponse.data.data;

//         const combinedData = lawyerDetails.map((lawyer) => {
//           const user = userData.find((user) => user._id === lawyer.user_id);
//           return { ...lawyer, username: user?.username || 'Unknown' };
//         });

//         setLawyers(combinedData);
//         setUniquePracticeAreas([...new Set(combinedData.flatMap((lawyer) => lawyer.area_of_practice || []))]);
//       } catch (error) {
//         console.error('Error fetching lawyers:', error);
//       }
//     };
//     fetchLawyers();
//   }, [token]);

//   const location = useLocation();
//   const caseId = location.state?.caseId;

//   const handleCardClick = (lawyer) => {
//     navigate(`/lawyer/${lawyer._id}`, { state: { lawyer, caseId } });
//   };

//   const handleCheckboxChange = (area) => {
//     setSelectedPracticeAreas((prev) =>
//       prev.includes(area) ? prev.filter((a) => a !== area) : [...prev, area]
//     );
//   };

//   const filteredLawyers = lawyers.filter((lawyer) => {
//     const name = lawyer.username?.toLowerCase() || '';
//     const jurisdictions = Array.isArray(lawyer.jurisdiction) ? lawyer.jurisdiction.map(j => j.toLowerCase()).join(' ') : '';
//     const hasMatchingArea = selectedPracticeAreas.length === 0 || lawyer.area_of_practice.some(area => selectedPracticeAreas.includes(area));

//     return (
//       (name.includes(searchTerm.toLowerCase()) || jurisdictions.includes(searchTerm.toLowerCase())) &&
//       hasMatchingArea
//     );
//   });

//   return (
//     <div className="p-6">
//       {/* Search Inputs */}
//       <div className="mb-6 flex flex-col md:flex-row gap-4">
//         <input
//           type="text"
//           placeholder="Search by name or jurisdiction..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//       </div>

//       {/* Practice Area Filters */}
//       <div className="mb-6">
//         <h3 className="font-semibold text-gray-700 mb-2">Filter by Area of Practice:</h3>
//         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
//           {uniquePracticeAreas.map((area) => (
//             <label key={area} className="flex items-center gap-2">
//               <input
//                 type="checkbox"
//                 checked={selectedPracticeAreas.includes(area)}
//                 onChange={() => handleCheckboxChange(area)}
//               />
//               {area}
//             </label>
//           ))}
//         </div>
//       </div>

//       {/* Lawyers List */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {filteredLawyers.map((lawyer) => (
//           <div
//             key={lawyer._id}
//             className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-xl cursor-pointer transition-all relative"
//             onClick={() => handleCardClick(lawyer)}
//           >
//             <img src="/profile-placeholder.png" alt="Profile" className="w-12 h-12 rounded-full absolute top-4 left-4" />
//             <div className="ml-20">
//               <h2 className="text-2xl font-bold text-gray-800">{lawyer.username}</h2>
//               <p className="text-gray-600 mt-2">{lawyer.professional_summary}</p>
//               <p className="text-gray-500 mt-1">Experience: {lawyer.work_experience} years</p>
//               <p className="text-gray-500 mt-1">Cases Handled: {lawyer.number_of_cases_handled || 'Not provided'}</p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Lawyers;



// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { useLocation } from 'react-router-dom';

// const Lawyers = () => {
//   const [lawyers, setLawyers] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [locationSearch, setLocationSearch] = useState('');
//   const [selectedPracticeAreas, setSelectedPracticeAreas] = useState([]);
//   const [uniquePracticeAreas, setUniquePracticeAreas] = useState([]);
//   const navigate = useNavigate();
//   const token = localStorage.getItem('token');

//   useEffect(() => {
//     const fetchLawyers = async () => {
//       try {
//         const usersResponse = await axios.get('http://localhost:8800/api/auth/getalllawyers', {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         const lawyerDetailsResponse = await axios.get('http://localhost:8800/api/lawyerdetails/getalldetails', {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         const userData = usersResponse.data.data;
//         const lawyerDetails = lawyerDetailsResponse.data.data;

//         const combinedData = lawyerDetails.map((lawyer) => {
//           const user = userData.find((user) => user._id === lawyer.user_id);
//           return { ...lawyer, username: user?.username || 'Unknown' };
//         });

//         setLawyers(combinedData);
//         setUniquePracticeAreas([...new Set(combinedData.flatMap((lawyer) => lawyer.area_of_practice || []))]);
//       } catch (error) {
//         console.error('Error fetching lawyers:', error);
//       }
//     };
//     fetchLawyers();
//   }, [token]);

//   const location = useLocation();
//   const caseId = location.state?.caseId;

//   const handleCardClick = (lawyer) => {
//     navigate(`/lawyer/${lawyer._id}`, { state: { lawyer, caseId } });
//   };

//   const handleCheckboxChange = (area) => {
//     setSelectedPracticeAreas((prev) =>
//       prev.includes(area) ? prev.filter((a) => a !== area) : [...prev, area]
//     );
//   };

//   const filteredLawyers = lawyers.filter((lawyer) => {
//     const name = lawyer.username?.toLowerCase() || '';
//     const jurisdictions = Array.isArray(lawyer.jurisdiction) ? lawyer.jurisdiction.map(j => j.toLowerCase()).join(' ') : '';
//     const hasMatchingArea = selectedPracticeAreas.length === 0 || lawyer.area_of_practice.some(area => selectedPracticeAreas.includes(area));

//     return (
//       (name.includes(searchTerm.toLowerCase()) || jurisdictions.includes(searchTerm.toLowerCase())) &&
//       hasMatchingArea
//     );
//   });

//   return (
//     <div className="p-6 flex">
//       {/* Filters Sidebar */}
//       <div className="w-1/4 bg-white p-6 rounded-lg shadow-md">
//         {/* Search Input */}
//         <div className="mb-6">
//           <input
//             type="text"
//             placeholder="Search by name or jurisdiction..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>

//         {/* Practice Area Filters */}
//         <div className="mb-6">
//           <h3 className="font-semibold text-gray-700 mb-2">Filter by Area of Practice:</h3>
//           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
//             {uniquePracticeAreas.map((area) => (
//               <label key={area} className="flex items-center gap-2">
//                 <input
//                   type="checkbox"
//                   checked={selectedPracticeAreas.includes(area)}
//                   onChange={() => handleCheckboxChange(area)}
//                 />
//                 {area}
//               </label>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Lawyers List */}
//       <div className="w-3/4 pl-8">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {filteredLawyers.map((lawyer) => (
//             <div
//               key={lawyer._id}
//               className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-xl cursor-pointer transition-all relative"
//               onClick={() => handleCardClick(lawyer)}
//             >
//               <img src="/profile-placeholder.png" alt="Profile" className="w-12 h-12 rounded-full absolute top-4 left-4" />
//               <div className="ml-20">
//                 <h2 className="text-2xl font-bold text-gray-800">{lawyer.username}</h2>
//                 <p className="text-gray-600 mt-2">{lawyer.professional_summary}</p>
//                 <p className="text-gray-500 mt-1">Experience: {lawyer.work_experience} years</p>
//                 <p className="text-gray-500 mt-1">Cases Handled: {lawyer.number_of_cases_handled || 'Not provided'}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Lawyers;


