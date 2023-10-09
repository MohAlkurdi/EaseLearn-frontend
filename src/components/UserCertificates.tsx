import { useEffect, useState } from "react";
import api from "../api";
import { CertificateDetails } from "./CertificateDetails";

interface Certificate {
  id: number;
  unique_number: string;
  created_at: string;
  course: {
    name: string;
    description: string;
  };
}

const UserCertificates: React.FC = () => {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [selectedCertificate, setSelectedCertificate] =
    useState<Certificate | null>(null);

  useEffect(() => {
    const fetchUserCertificates = async () => {
      try {
        const response = await api.get<{ certificate: Certificate[] }>(
          "/user/courses"
        );
        setCertificates(response.data.certificate);
      } catch (error) {
        console.error("Error fetching user certificates:", error);
      }
    };

    fetchUserCertificates();
  }, []);

  const openCertificateDetails = (certificate: Certificate) => {
    setSelectedCertificate(certificate);
  };

  const closeCertificateDetails = () => {
    setSelectedCertificate(null);
  };

  return (
    <div className="py-10 bg-gradient-to-r from-fuchsia-600 to-blue-600 sm:py-16 lg:py-24">
      <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <div className="max-w-2xl mx-auto text-left sm:text-center">
          <h2 className="text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl lg:leading-tight">
            Your Certificates
          </h2>
        </div>

        <div className="mt-8">
          {certificates.map((certificate) => (
            <div
              key={certificate.id}
              className="bg-white p-4 shadow-lg rounded-lg mb-4"
            >
              <h3 className="text-xl font-semibold text-gray-800">
                {certificate.course.name}
              </h3>
              <div className="flex justify-end items-center">
                <p className="text-gray-600 text-sm">
                  {new Date(certificate.created_at).toLocaleDateString()}
                </p>
              </div>
              <p className="text-gray-600">{certificate.course.description}</p>
              <button
                onClick={() => openCertificateDetails(certificate)}
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                View Certificate details
              </button>
            </div>
          ))}
        </div>

        {/* Render the certificate details modal */}
        {selectedCertificate && (
          <CertificateDetails
            certificate={selectedCertificate}
            onClose={closeCertificateDetails}
          />
        )}
      </div>
    </div>
  );
};

export default UserCertificates;
