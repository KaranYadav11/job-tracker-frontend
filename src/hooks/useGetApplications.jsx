import axios from "axios";
import { toast } from "sonner";
import { useJobs } from "@/context/JobContext";
import { useEffect, useState } from "react";

export const useGetApplications = () => {
  const { setApplications } = useJobs();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          "https://job-tracker-backend-c4hs.onrender.com/api/jobs"
        );
        console.log("Fetched applications:", data);
        setApplications(data?.data);
        toast.success("Applications fetched successfully!");
      } catch (err) {
        console.error("Failed to fetch applications:", err);
        toast.error("Failed to fetch applications");
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [setApplications]);

  return { loading };
};
