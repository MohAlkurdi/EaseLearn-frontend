import { useEffect, useState } from "react";
import api from "../api";

interface Certificate {
  id: number;
  course: {
    title: string;
    description: string;
    // Add more properties as needed
  };
}

const UserCertificates: React.FC = () => {
  const [certificates, setCertificates] = useState<Certificate[]>([]);

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
                {certificate.course.title}
              </h3>
              <p className="text-gray-600">{certificate.course.description}</p>
              {/* You can add more details about the certificate here */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserCertificates;
