// src/hooks/useDeleteApplication.js
import { toast } from "sonner";
import { useJobs } from "../context/JobContext";
import axios from "axios";

export const useDeleteApplication = () => {
  const { applications, setApplications } = useJobs();

  const deleteApplication = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/jobs/${id}`);
      const filtered = applications.filter((app) => app._id !== id);
      setApplications(filtered);
      toast.success("Application deleted successfully!");
    } catch (err) {
      console.error("Error deleting application:", err);
      toast.error(
        err.response?.data?.message || "Failed to delete application."
      );
    }
  };

  return { deleteApplication };
};
