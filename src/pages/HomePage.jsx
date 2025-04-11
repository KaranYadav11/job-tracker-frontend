import JobApplications from "@/components/JobApplications";
import Navbar from "@/components/Navbar";

function Homepage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-green-50 to-white">
      <Navbar />
      <main className="p-4 max-w-7xl mx-auto">
        <JobApplications />
      </main>
    </div>
  );
}

export default Homepage;
