import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import * as React from "react";
import { format, isAfter } from "date-fns";
import { Calendar as CalendarIcon, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useAddApplication } from "@/hooks/useAddApplication";

function AddJob() {
  const [application, setApplication] = useState({
    company: "",
    role: "",
    status: "Applied",
    dateOfApplication: "",
    link: "",
  });
  const [errors, setErrors] = useState({});
  const { addApplication, adding } = useAddApplication();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setApplication((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    const { company, role, dateOfApplication, link } = application;
    if (!company.trim()) newErrors.company = "Company is required";
    if (!role.trim()) newErrors.role = "Role is required";
    if (!dateOfApplication) newErrors.dateOfApplication = "Date is required";
    if (link && !isValidUrl(link)) newErrors.link = "Invalid URL";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      addApplication(application);
    }
  };

  return (
    <div className="w-full min-w-md p-1">
      <Card className="bg-zinc-50 rounded-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">
            New Application
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Company */}
            <div>
              <label
                htmlFor="company"
                className="block mb-2 text-sm font-medium"
              >
                Company
              </label>
              <Input
                id="company"
                name="company"
                value={application.company}
                onChange={handleChange}
                placeholder="Enter company name"
              />
              {errors.company && (
                <p className="text-red-500 text-sm">{errors.company}</p>
              )}
            </div>

            {/* Role */}
            <div>
              <label htmlFor="role" className="block mb-2 text-sm font-medium">
                Role
              </label>
              <Input
                id="role"
                name="role"
                value={application.role}
                onChange={handleChange}
                placeholder="Enter job role"
              />
              {errors.role && (
                <p className="text-red-500 text-sm">{errors.role}</p>
              )}
            </div>

            {/* Status */}
            <div>
              <label
                htmlFor="status"
                className="block mb-2 text-sm font-medium"
              >
                Status
              </label>
              <Select
                onValueChange={(value) =>
                  setApplication((prev) => ({ ...prev, status: value }))
                }
                value={application.status}
              >
                <SelectTrigger>
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

            {/* Date Picker */}
            <div>
              <label className="block text-sm mb-2 font-medium">
                Date of Application
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !application.dateOfApplication && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {application.dateOfApplication ? (
                      format(new Date(application.dateOfApplication), "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={
                      application.dateOfApplication
                        ? new Date(application.dateOfApplication)
                        : undefined
                    }
                    onSelect={(selectedDate) => {
                      if (selectedDate) {
                        const formatted = format(selectedDate, "yyyy-MM-dd");
                        setApplication((prev) => ({
                          ...prev,
                          dateOfApplication: formatted,
                        }));
                      }
                    }}
                    disabled={(date) => isAfter(date, new Date())}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              {errors.dateOfApplication && (
                <p className="text-red-500 text-sm">
                  {errors.dateOfApplication}
                </p>
              )}
            </div>

            {/* Link */}
            <div>
              <label htmlFor="link" className="block mb-2 text-sm font-medium">
                Link (optional)
              </label>
              <Input
                id="link"
                name="link"
                value={application.link}
                onChange={handleChange}
                placeholder="Enter job link"
              />
              {errors.link && (
                <p className="text-red-500 text-sm">{errors.link}</p>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-black hover:bg-black disabled:opacity-100 disabled:bg-black"
              disabled={adding}
            >
              {adding ? (
                // Loader2 icon from lucide-react with animate-spin class applied
                <span className="flex items-center justify-center">
                  <Loader2 className="h-5 w-5 animate-spin" />
                </span>
              ) : (
                "Submit"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default AddJob;
