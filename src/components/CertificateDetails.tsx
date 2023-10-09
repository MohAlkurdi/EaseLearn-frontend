import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFDownloadLink,
} from "@react-pdf/renderer";
import api from "../api";
import { useEffect, useState } from "react";

interface Certificate {
  id: number;
  unique_number: string;
  created_at: string;
  course: {
    name: string;
    description: string;
  };
}

interface CertificateDetailsProps {
  certificate: Certificate;
  onClose: () => void;
}

const pdfStyles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#F2F2F2",
    padding: "20px",
    fontSize: 14,
    lineHeight: 1.5,
  },
  header: {
    backgroundColor: "#2D8FE6",
    padding: "10px",
    marginBottom: "20px",
    color: "#FFFFFF",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: "10px",
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: "5px",
  },
  text: {
    fontSize: 14,
    marginBottom: "10px",
  },
  footer: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    textAlign: "center",
    fontSize: 12,
    color: "#888888",
  },
});

export const CertificateDetails: React.FC<CertificateDetailsProps> = ({
  certificate,
  onClose,
}) => {
  const [user, setUser] = useState({
    name: "",
    isAuthenticated: false,
  });

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem("ACCESS_TOKEN");

      if (token) {
        const response = await api.get("/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const userData = response.data.user;

        // Update the user state with the fetched data
        setUser({
          name: userData.name,
          isAuthenticated: true,
        });
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    // Check if the user is authenticated (e.g., by checking if a token is present in local storage)
    const token = localStorage.getItem("ACCESS_TOKEN");

    if (token) {
      // Fetch user data from your API using the token
      // Replace this with your actual API call
      fetchUserData();
    }
  }, []);
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center z-50 bg-opacity-50 bg-black">
      <div className="bg-white p-4 rounded-lg max-w-4xl max-h-4xl overflow-y-auto">
        <h3 className="text-xl font-semibold mb-2">Certificate Details</h3>
        <p className="text-gray-600" style={pdfStyles.text}>
          Course Name: {certificate.course.name}
        </p>
        <p className="text-gray-600" style={pdfStyles.text}>
          Unique number: {certificate.unique_number}
        </p>
        <div className="mt-4">
          <button
            onClick={onClose}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 mr-4"
          >
            Close
          </button>
          <PDFDownloadLink
            document={
              <CertificatePDF certificate={certificate} userName={user.name} />
            }
            className="bg-fuchsia-600 text-white px-4 py-2 rounded hover:bg-fuchsia-700"
            fileName="certificate.pdf"
          >
            {({ loading }) =>
              loading ? "Loading document..." : "Download as PDF"
            }
          </PDFDownloadLink>
        </div>
      </div>
    </div>
  );
};

// CertificatePDF component with your certificate data and styling
const CertificatePDF: React.FC<{
  certificate: Certificate;
  userName: string;
}> = ({ certificate, userName }) => {
  return (
    <Document>
      <Page size="A4" style={pdfStyles.page}>
        <View style={pdfStyles.header}>
          <Text style={pdfStyles.title}>Certificate of Completion</Text>
        </View>
        <Text style={pdfStyles.subtitle}>This is to certify that:</Text>
        <Text style={pdfStyles.text}>User: {userName}</Text>
        <Text style={pdfStyles.subtitle}>Has successfully completed:</Text>
        <Text style={pdfStyles.text}>{certificate.course.name}</Text>
        <Text style={pdfStyles.subtitle}>Unique number:</Text>
        <Text style={pdfStyles.text}>{certificate.unique_number}</Text>
        {/* Add more certificate details here */}
        <View style={pdfStyles.footer}>
          <Text> Created At {new Date().toLocaleDateString()}</Text>
        </View>
      </Page>
    </Document>
  );
};
