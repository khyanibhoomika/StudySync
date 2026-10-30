import React from "react";

export default function MyCourses() {
  return (
    <div className="min-h-screen bg-gray-50 p-8 flex items-center justify-center">
      <div className="max-w-xl w-full bg-white rounded-3xl shadow-xl border border-gray-100 p-8 text-center">
        <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 text-3xl font-bold">
          📚
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-3">CBIT Course Syllabus</h1>
        <p className="text-gray-600 mb-8 leading-relaxed">
          Access the official undergraduate and postgraduate branch-wise syllabus structure directly from the college portal.
        </p>
        <a 
          href="https://www.cbit.ac.in/current_students/ug-and-pg-syllabus-structure/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-block w-full py-4 px-6 bg-gradient-to-r from-purple-600 to-orange-500 text-white font-bold text-lg rounded-xl hover:opacity-95 transition shadow-lg transform hover:-translate-y-0.5"
        >
          View Official Syllabus Website →
        </a>
      </div>
    </div>
  );
}
