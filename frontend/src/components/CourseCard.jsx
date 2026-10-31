import { useNavigate } from "react-router-dom";

function CourseCard({ course }) {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleViewDetails = async () => {
    if (!token) {
      navigate("/login");
    } else {
      try {
        const res = await fetch(`http://localhost:8145/api/profile/enroll/${course.courseId}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.ok) {
          alert(`Successfully enrolled in ${course.courseName}!`);
          navigate("/dashboard");
        } else {
          const errorText = await res.text();
          throw new Error(errorText || "Failed to enroll in the course.");
        }
      } catch (error) {
        console.error("Enrollment error:", error);
        alert(`Error: ${error.message}`);
      }
    }
  };

  return (
    <div className="min-w-[340px] max-w-[350px] h-[360px] rounded-3xl shadow-md hover:shadow-lg transition border border-[#efeafe] flex flex-col overflow-hidden relative bg-white">
      {/* Subtle card top-corner gradient */}
      <div
        className="absolute top-0 right-0 w-3/4 h-2/3 rounded-tr-3xl rounded-bl-full pointer-events-none"
        style={{
          background:
            "linear-gradient(120deg, #f2e2ff54 0%, #ffe5c157 80%, transparent 100%)",
        }}
      ></div>
      
      <div className="flex items-center gap-3 px-6 pt-8 pb-3 relative z-10">
        <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-[#efeafe] shadow text-3xl shrink-0">
          📚
        </div>
        <div className="font-extrabold text-lg text-[#285fff] leading-tight line-clamp-2">
          {course.courseName}
        </div>
      </div>
      
      <div
        className="px-6 text-[#575a7b] font-medium mb-3 relative z-10 line-clamp-3"
        style={{ minHeight: "64px" }}
      >
        {course.description}
      </div>
      
      {/* This spacer auto-expands to push the button to the bottom edge */}
      <div className="flex-1"></div>
      
      <button
        onClick={handleViewDetails}
        className="block w-full px-6 py-3 bg-gradient-to-r from-[#8133e8] to-[#fc9336] text-white font-bold text-lg text-center rounded-b-3xl transition-all relative z-10 cursor-pointer shrink-0 mt-auto"
      >
        Enroll & View Details
      </button>
    </div>
  );
}

export default CourseCard;