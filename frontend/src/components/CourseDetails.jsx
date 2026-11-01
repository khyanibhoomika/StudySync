import React from "react";
import { useParams, useNavigate } from "react-router-dom";

const courseDetails = {
  CS101: {
    name: "Java Programming",
    instructor: "Prof. Sharma",
    credits: 4,
    duration: "16 weeks",
    level: "Beginner",
    overview:
      "Learn core Java, object-oriented programming and problem solving with hands-on practice.",
    topics: [
      "Variables, data types and control flow",
      "Classes, objects and inheritance",
      "Exception handling and collections",
      "File handling and multithreading basics",
    ],
    link: "", // e.g. "https://your-college.edu/courses/cs101"
  },
  CS102: {
    name: "Data Structures",
    instructor: "Prof. Rao",
    credits: 4,
    duration: "16 weeks",
    level: "Intermediate",
    overview:
      "Understand how to organize and process data efficiently using core data structures and algorithms.",
    topics: [
      "Arrays and linked lists",
      "Stacks and queues",
      "Trees and graphs",
      "Sorting and searching algorithms",
    ],
    link: "",
  },
  CS103: {
    name: "Web Development",
    instructor: "Prof. Mehta",
    credits: 3,
    duration: "12 weeks",
    level: "Beginner",
    overview:
      "Build modern, responsive websites using HTML, CSS, JavaScript and React.",
    topics: [
      "HTML and CSS fundamentals",
      "JavaScript essentials",
      "React components and routing",
      "Connecting to backend APIs",
    ],
    link: "",
  },
  CS104: {
    name: "Database Management",
    instructor: "Prof. Iyer",
    credits: 3,
    duration: "14 weeks",
    level: "Intermediate",
    overview:
      "Design and query relational databases using SQL and MySQL.",
    topics: [
      "ER modelling and normalization",
      "SQL queries and joins",
      "Indexes and transactions",
      "Stored procedures and views",
    ],
    link: "",
  },
  CS105: {
    name: "Python Programming",
    instructor: "Prof. Nair",
    credits: 3,
    duration: "12 weeks",
    level: "Beginner",
    overview: "Python fundamentals, scripting and automation.",
    topics: [
      "Syntax, loops and functions",
      "Lists, dictionaries and files",
      "Modules and libraries",
      "Simple automation projects",
    ],
    link: "",
  },
  CS106: {
    name: "Operating Systems",
    instructor: "Prof. Gupta",
    credits: 4,
    duration: "16 weeks",
    level: "Advanced",
    overview:
      "Study how operating systems manage processes, memory and storage.",
    topics: [
      "Processes and threads",
      "CPU scheduling",
      "Memory management",
      "File systems and deadlocks",
    ],
    link: "",
  },
};

export default function CourseDetails() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const course = courseDetails[courseId];

  if (!course) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-20 text-center">
        <h1 className="text-3xl font-bold text-gray-800">
          Course details coming soon
        </h1>
        <p className="mt-2 text-gray-600">Course code: {courseId}</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-6 rounded-lg bg-gradient-to-r from-indigo-600 to-cyan-500 px-6 py-2.5 font-semibold text-white"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 font-semibold text-indigo-600 hover:text-cyan-500 transition-colors"
      >
        &larr; Back
      </button>

      <div className="overflow-hidden rounded-2xl bg-white shadow-xl">
        <div className="h-2 bg-gradient-to-r from-indigo-500 to-cyan-400" />
        <div className="p-8">
          <p className="text-sm font-bold text-gray-400">{courseId}</p>
          <h1 className="mt-1 text-4xl font-extrabold text-gray-800">
            {course.name}
          </h1>
          <p className="mt-4 text-gray-600">{course.overview}</p>

          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              ["Instructor", course.instructor],
              ["Credits", course.credits],
              ["Duration", course.duration],
              ["Level", course.level],
            ].map(([label, value]) => (
              <div
                key={label}
                className="rounded-xl bg-gradient-to-br from-purple-50 to-orange-50 p-4 text-center"
              >
                <p className="text-xs font-semibold uppercase text-gray-500">
                  {label}
                </p>
                <p className="mt-1 font-bold text-gray-800">{value}</p>
              </div>
            ))}
          </div>

          <h2 className="mt-10 text-xl font-bold text-gray-800">
            What you'll learn
          </h2>
          <ul className="mt-3 space-y-2">
            {course.topics.map((t) => (
              <li key={t} className="flex items-start gap-2 text-gray-700">
                <span className="text-indigo-500">✔</span>
                {t}
              </li>
            ))}
          </ul>

          {course.link && (
            <a
              href={course.link}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-block rounded-lg border-2 border-indigo-400 px-6 py-2.5 font-semibold text-indigo-700 hover:bg-indigo-600 hover:text-white transition-colors"
            >
              Official Course Page &rarr;
            </a>
          )}
        </div>
      </div>
    </div>
  );
}