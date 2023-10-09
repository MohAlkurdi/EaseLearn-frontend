interface Certificate {
  id: number;
  unique_number: string;
  course: {
    title: string;
    description: string;
    // Add more properties as needed
  };
}

interface CertificateDetailsProps {
  certificate: Certificate; // Pass the selected certificate as a prop
  onClose: () => void; // Function to close the modal
}

export const CertificateDetails: React.FC<CertificateDetailsProps> = ({
  certificate,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="bg-white p-4 rounded-lg shadow-lg z-10">
        <h3 className="text-xl font-semibold mb-2">Certificate Details</h3>
        <p className="text-gray-600">Course Name: {certificate.course.title}</p>
        <p className="text-gray-600">
          Description: {certificate.course.description}
        </p>
        {/* Add more details as needed */}

        <p className="text-gray-600">
          Description: {certificate.unique_number}
        </p>
        <button
          onClick={onClose}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Close
        </button>
      </div>
    </div>
  );
};
