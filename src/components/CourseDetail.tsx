import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import api from "../api";

interface Course {
  id: number;
  name: string;
  description: string;
  videoUrls: string[];
}

export const CourseDetail = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const [course, setCourse] = useState<Course | null>(null);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement | null>(null);

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
    }
  }, [currentVideoIndex, course]);

  const playVideo = (index: number) => {
    if (videoRef.current) {
      videoRef.current.play();
    }
    setCurrentVideoIndex(index);
  };

  const nextVideo = () => {
    if (currentVideoIndex < course!.videoUrls.length - 1) {
      setCurrentVideoIndex(currentVideoIndex + 1);
    }
  };

  const previousVideo = () => {
    if (currentVideoIndex > 0) {
      setCurrentVideoIndex(currentVideoIndex - 1);
    }
  };

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
