// src/hooks/useAddApplication.js
import { toast } from "sonner";
import { useJobs } from "../context/JobContext";
import axios from "axios";
import { useState } from "react";

export const useAddApplication = () => {
  const { applications, setApplications } = useJobs();
  const [adding, setAdding] = useState(false);

  const addApplication = async (newApp) => {
    try {
      setAdding(true);
      const { data } = await axios.post(
        "http://localhost:5000/api/jobs",
        newApp
      );

      // Append the new application to the state
      setApplications([...applications, data.data]);

      toast.success("Application added successfully!");
    } catch (err) {
      console.error("Error adding application:", err);
      toast.error(err.response?.data?.message || "Failed to add application.");
    } finally {
      setAdding(false);
    }
  };

  return { addApplication, adding };
};
