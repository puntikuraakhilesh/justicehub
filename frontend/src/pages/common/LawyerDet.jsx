import React from 'react';
import { useLocation } from 'react-router-dom';

const LawyerDet = () => {
  const { state } = useLocation();
  const lawyer = state?.lawyer;

  if (!lawyer) {
    return <div className="p-10 text-center text-red-600 font-semibold">Lawyer details not available.</div>;
  }

  return (
    <div className="p-10 max-w-5xl mx-auto bg-white shadow-lg rounded-lg border border-gray-200">
      {/* Header */}
      <div className="flex items-center gap-8 border-b pb-6 mb-8">
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

      <div className="grid grid-cols-2 gap-8">
        {/* Left Column */}
        <div className="space-y-6">
          <DetailCard title="Education" content={lawyer.education || 'Not specified'} />
          <DetailCard title="Work Experience" content={`${lawyer.work_experience || 0} years`} />
          <DetailCard title="Number of Cases Handled" content={lawyer.number_of_cases_handled || 'Not specified'} />
          <DetailCard title="Contact Information">
            <p className="text-gray-700"><strong>Email:</strong> {lawyer.email}</p>
            <p className="text-gray-700"><strong>Phone:</strong> {lawyer.phone_number}</p>
          </DetailCard>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <DetailList title="Area of Practice" items={lawyer.area_of_practice} />
          <DetailList title="Jurisdictions" items={lawyer.jurisdiction} />
          <DetailList title="Licenses & Certificates" items={lawyer.licences_certificates} />
          <DetailList title="Awards" items={lawyer.awards} />
        </div>
      </div>

      {/* Case Studies */}
      <div className="mt-10">
        <h2 className="text-3xl font-bold text-gray-800 border-b-2 border-gray-300 pb-2">Case Studies</h2>
        {lawyer.case_studies?.length > 0 ? (
          <ul className="mt-4 space-y-4">
            {lawyer.case_studies.map((caseStudy, index) => (
              <li key={index} className="p-4 border rounded-lg shadow-sm bg-gray-50">
                <h3 className="text-xl font-semibold text-gray-700">{caseStudy.title}</h3>
                <p className="text-gray-600 mt-2">{caseStudy.description}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 mt-4">No case studies available.</p>
        )}
      </div>
    </div>
  );
};

const DetailCard = ({ title, content, children }) => (
  <div className="p-6 border rounded-lg shadow-sm bg-gray-50">
    <h3 className="text-2xl font-semibold text-gray-800">{title}</h3>
    <p className="text-gray-600 mt-2">{content}</p>
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
      <p className="text-gray-500 mt-2">Not specified</p>
    )}
  </div>
);

export default LawyerDet;
