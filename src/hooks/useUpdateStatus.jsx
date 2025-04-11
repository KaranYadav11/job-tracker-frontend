// hooks/useUpdateApplicationStatus.js
import axios from "axios";
import { toast } from "sonner";
import { useJobs } from "@/context/JobContext";

export const useUpdateStatus = () => {
  const { setApplications } = useJobs();

  const updateStatus = async (id, newStatus) => {
    try {
      const response = await axios.patch(
        `https://job-tracker-backend-c4hs.onrender.com/api/jobs/${id}`,
        { status: newStatus }
      );

      const updatedApp = response.data.data;

      // Update application in global context
      setApplications((prevApps) =>
        prevApps.map((app) => (app._id === id ? updatedApp : app))
      );

      toast.success("Status updated successfully!");
    } catch (error) {
      console.error("Status update failed:", error);
      toast.error("Error updating status");
    }
  };

  return { updateStatus };
};
