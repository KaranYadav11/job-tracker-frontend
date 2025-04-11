// src/context/JobContext.jsx
import { createContext, useContext, useState } from "react";

// 1. Create the context
const JobContext = createContext();

// 2. Create the provider
export const JobProvider = ({ children }) => {
  const [applications, setApplications] = useState([]);

  return (
    <JobContext.Provider value={{ applications, setApplications }}>
      {children}
    </JobContext.Provider>
  );
};

// 3. Custom hook to use the context
export const useJobs = () => {
  const context = useContext(JobContext);
  if (!context) {
    throw new Error("useJobContext must be used within a JobProvider");
  }
  return context;
};
