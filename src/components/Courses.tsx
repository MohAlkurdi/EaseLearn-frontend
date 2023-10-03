import { Link } from "react-router-dom";
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
            <Link to={`/courses/${course.slug}`} key={course.id}>
              <div className="bg-white transform transition duration-500 hover:scale-110">
                <div className="py-8 px-9">
                  <p className="text-lg font-bold text-black">{course.title}</p>
                  <p className="mt-6 text-base text-gray-700">
                    {course.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
