import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link2, Loader2, Trash } from "lucide-react";
import { useGetApplications } from "@/hooks/useGetApplications";
import { useJobs } from "@/context/JobContext";
import { useDeleteApplication } from "@/hooks/useDeleteApplication";
import { format } from "date-fns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useUpdateStatus } from "@/hooks/useUpdateStatus";

const JobApplications = () => {
  const { applications } = useJobs();
  const { loading } = useGetApplications();
  const { deleteApplication } = useDeleteApplication();
  const { updateStatus } = useUpdateStatus();

  const handleDelete = (id) => {
    deleteApplication(id);
  };

  const handleUpdate = (id) => {
    const newStatus = prompt(
      "Enter new status (Applied, Interview, Offer, Rejected):"
    );
    if (newStatus) {
      setApplications((prevApps) =>
        prevApps.map((app) =>
          app.id === id ? { ...app, status: newStatus } : app
        )
      );
    }
  };

  const handleView = (link) => {
    if (link) {
      window.open(link, "_blank", "noopener,noreferrer");
    } else {
      alert("No job link provided for this application.");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-emerald-100 via-white to-emerald-50">
        <div className="flex flex-col items-center mt-0 space-y-2">
          <Loader2 className="size-24 animate-spin text-emerald-600" />
          <span className="text-md md:text-lg text-emerald-800 font-semibold">
            Loading applications...
          </span>
        </div>
      </div>
    );
  }

  if (!loading && applications.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] bg-gradient-to-br from-emerald-100 via-white to-emerald-50">
        <h1 className="text-2xl font-bold text-gray-700">
          No Applications Found
        </h1>
        <p className="text-gray-500">Start applying for jobs!</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-100 via-white to-emerald-50 px-4 py-8">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
        {applications.map((app, i) => (
          <Card
            key={app?._id}
            className="bg-white shadow-md border border-emerald-100 hover:shadow-lg transition"
          >
            <CardHeader>
              <CardTitle className="text-lg font-bold text-emerald-800">
                {i + 1} - {app?.company} : {app?.role}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-gray-700">
                <span className="font-semibold tracking-wide">
                  Date Applied:
                </span>{" "}
                {format(new Date(app.dateOfApplication), "PPP")}
              </p>
              <div>
                <span className="text-sm font-semibold text-gray-700">
                  Status:
                </span>
                <Select
                  onValueChange={(value) => updateStatus(app._id, value)}
                  defaultValue={app?.status}
                >
                  <SelectTrigger className="w-full mt-1">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Applied">Applied</SelectItem>
                    <SelectItem value="Interview">Interview</SelectItem>
                    <SelectItem value="Offer">Offer</SelectItem>
                    <SelectItem value="Rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-wrap gap-2 justify-between pt-2">
                <Button
                  size="sm"
                  onClick={() => handleView(app?.link)}
                  className="text-white bg-emerald-600 hover:bg-emerald-700"
                >
                  <Link2 className="mr-1 w-4 h-4" /> View Job
                </Button>
                <Button
                  size="sm"
                  onClick={() => handleDelete(app?._id)}
                  className="flex items-center gap-1 bg-rose-600 hover:bg-rose-700 text-white"
                >
                  <Trash className="w-4 h-4" /> Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default JobApplications;
