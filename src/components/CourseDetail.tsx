import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import api from "../api";

interface Course {
  id: number;
  name: string;
  description: string;
  videoUrls: string[];
}

interface Certificate {
  id: number;
  unique_number: string;
  user_id: number;
  course_id: number;
  course: {
    id: number;
    name: string;
    slug: string;
    description: string;
    created_at: string;
    updated_at: string;
  };
  created_at: string;
  updated_at: string;
}

export const CourseDetail = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const [course, setCourse] = useState<Course | null>(null);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const checkIfUserHasCompletedCourse = async (courseId: string) => {
    try {
      const response = await api.get("/user/courses");
      const certificates: Certificate[] = response.data.certificate;

      // Check if the user has a certificate for the current courseId
      const completedCourse = certificates.some(
        (certificate) => certificate.course.id === Number(courseId)
      );

      if (completedCourse) {
        console.log("User has completed the course:", completedCourse);
      } else {
        console.log("User has not completed the course.");
      }
    } catch (error) {
      console.error("User has not completed course:", error);
    }
  };

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const response = await api.get(`/courses/${courseId}`);
        const courseData = response.data as Course;

        const videoUrls = [
          `/videos/course-${courseData.id}/video1.mp4`,
          `/videos/course-${courseData.id}/video2.mp4`,
          `/videos/course-${courseData.id}/video3.mp4`,
          `/videos/course-${courseData.id}/video4.mp4`,
        ];

        const updatedCourse: Course = {
          ...courseData,
          videoUrls,
        };

        setCourse(updatedCourse);
        // Check if user has completed the course after setting the course details
        checkIfUserHasCompletedCourse(courseId || "");
      } catch (error) {
        console.error("Error fetching course details:", error);
      }
    };

    fetchCourseDetails();
  }, [courseId]);

  useEffect(() => {
    // When currentVideoIndex changes, update the video source
    if (videoRef.current) {
      videoRef.current.src = course?.videoUrls?.[currentVideoIndex] ?? "";
      videoRef.current.load(); // Load the new video source
      // videoRef.current.play(); // Play the new video
    }
  }, [currentVideoIndex, course]);

  const playVideo = (index: number) => {
    if (videoRef.current) {
      videoRef.current.play();
    }
    setCurrentVideoIndex(index);
  };

  const nextVideo = () => {
    console.log("Next video clicked"); // Add this line
    if (currentVideoIndex < course!.videoUrls.length - 1) {
      setCurrentVideoIndex(currentVideoIndex + 1);
      console.log("Updated currentVideoIndex:", currentVideoIndex); // Add this line
    }
  };

  const previousVideo = () => {
    if (currentVideoIndex > 0) {
      setCurrentVideoIndex(currentVideoIndex - 1);
    }
  };

  // TODO: Create certificate
  // NOTE: this function need more improvement since it's not working

  // const createCertificate = async () => {
  //   console.log("Creating certificate...");
  //   try {
  //     const response = await api.post(`/courses/${courseId}/enroll`);
  //     console.log("Certificate created:", response.data);
  //     console.log("Redirected to success page");
  //   } catch (error) {
  //     console.error("Error creating certificate:", error);
  //   }
  // };

  if (!course) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{course.name}</h1>
      <p>{course.description}</p>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-1/4 p-4">
          <h2 className="text-lg font-semibold mb-2">Video Titles</h2>
          <ul>
            {course.videoUrls.map((videoUrl, index) => (
              <li
                key={index}
                className={`cursor-pointer ${
                  currentVideoIndex === index ? "font-bold" : ""
                }`}
                onClick={() => playVideo(index)}
              >
                Video {index + 1}
              </li>
            ))}
          </ul>
        </div>

        {/* Video Player */}
        <div className="w-3/4 p-4">
          <video
            ref={videoRef}
            controls
            width="100%"
            src={course.videoUrls[currentVideoIndex]}
          >
            Your browser does not support the video tag.
          </video>
          <div className="flex justify-between mt-2">
            <button
              onClick={previousVideo}
              disabled={currentVideoIndex === 0}
              className="bg-blue-500 text-white py-2 px-4 rounded-lg"
            >
              Previous Video
            </button>
            <button
              onClick={nextVideo}
              disabled={currentVideoIndex === course.videoUrls.length - 1}
              className="bg-blue-500 text-white py-2 px-4 rounded-lg"
            >
              Next Video
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
