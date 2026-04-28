import React, { useState, useEffect } from "react";
import Navbar from "../../Components/common/Navbar";
import { Link } from "react-router-dom";
import { learningService } from "../../api/learning.service";
import { BookOpen, Award, Clock, ChevronRight, PlayCircle } from "lucide-react";

function UserDashboard() {
  const userId = localStorage.getItem("id");
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCourses() {
      try {
        const res = await learningService.getEnrollments(userId);
        setCourses(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchCourses();
  }, [userId]);

  const stats = [
    { label: "Enrolled Courses", value: courses.length, icon: BookOpen, color: "blue" },
    { label: "Completed", value: courses.filter(c => c.completed).length, icon: Award, color: "green" },
    { label: "In Progress", value: courses.filter(c => !c.completed).length, icon: Clock, color: "indigo" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar page="dashboard" />
      
      <div className="max-w-7xl mx-auto py-10 px-6">
        <header className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900">Welcome Back! 👋</h1>
          <p className="text-gray-600 mt-2">Here's an overview of your learning progress.</p>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
              <div className={`p-4 bg-${stat.color}-50 rounded-xl`}>
                <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Continue Learning */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">My Courses</h2>
            <Link to="/learnings" className="text-blue-600 font-medium hover:underline flex items-center gap-1 text-sm">
              View All <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {loading ? (
            <div className="flex justify-center py-10">
              <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : courses.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {courses.slice(0, 4).map((course) => (
                <div key={course.id} className="group border border-gray-100 rounded-xl p-4 flex gap-4 hover:bg-gray-50 transition">
                  <img src={course.p_link} alt="" className="w-24 h-16 rounded-lg object-cover shadow-sm" />
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition">{course.course_name}</h3>
                    <p className="text-xs text-gray-500 mt-1">Instructor: {course.instructor}</p>
                    <div className="mt-3 flex items-center justify-between">
                       <Link 
                        to={`/course/${course.course_id}`}
                        className="flex items-center gap-1.5 text-sm font-semibold text-blue-600"
                       >
                        <PlayCircle className="w-4 h-4" />
                        Continue
                       </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10 border-2 border-dashed border-gray-100 rounded-2xl">
              <p className="text-gray-500">You haven't enrolled in any courses yet.</p>
              <Link to="/courses" className="mt-4 inline-block px-6 py-2 bg-blue-600 text-white rounded-lg font-medium shadow-lg hover:bg-blue-700 transition">
                Browse Courses
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;
