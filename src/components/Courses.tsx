import { useNavigate } from "react-router-dom";
import api from "../api";
import { useEffect, useState } from "react";

interface Course {
  id: number;
  title: string;
  slug: string;
  description: string;
}

export const Courses = () => {
  const [courses, setCourses] = useState([]);
  const userIsAuthenticated = !!localStorage.getItem("ACCESS_TOKEN"); // Check if the token exists in localStorage
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await api.get("/courses");
        setCourses(response.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);

  const enrollInCourse = async (courseId: number) => {
    try {
      // Check if the user is authenticated
      if (userIsAuthenticated) {
        // Send a POST request to enroll in the course
        const response = await api.post(`/courses/${courseId}/enroll`);
        // You can also update the state or show a success message to the user
        console.log(
          "You have successfully enrolled in the course.",
          response.data.message
        );
      } else {
        console.log(
          "Use must be authenticated to enroll in a course. Please log in."
        );
      }
    } catch (error) {
      alert("You're Already enrolled in this course");
    }
  };

  return (
    <section className="py-10 bg-gradient-to-r from-fuchsia-600 to-blue-600 sm:py-16 lg:py-24">
      <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <div className="max-w-2xl mx-auto text-left sm:text-center">
          <h2 className="text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl lg:leading-tight">
            Join one of our courses today.
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 mt-8 sm:mt-12 xl:mt-20 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8 xl:gap-14">
          {courses.map((course: Course) => (
            <div key={course.id}>
              <div className="bg-white transform transition duration-500 hover:scale-110">
                <div className="py-8 px-9">
                  <p className="text-lg font-bold text-black">{course.title}</p>
                  <p className="mt-6 text-base text-gray-700">
                    {course.description}
                  </p>
                </div>
              </div>
              {userIsAuthenticated ? (
                <button
                  onClick={() => {
                    enrollInCourse(course.id);
                    navigate(`/courses/${course.id}`);
                  }}
                  className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Enroll
                </button>
              ) : (
                // Render something else if the user is not authenticated
                <p className="mt-4 text-red-500">Please log in to enroll.</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
