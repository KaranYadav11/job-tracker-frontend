import React from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import AddJob from "./AddJob";

const Navbar = () => {
  return (
    <header className="w-full border-b shadow-sm bg-gradient-to-r from-gray-800 via-gray-700 to-gray-600">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Left Side: Logo */}
        <div className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
          Job<span className="text-emerald-400">Tracker</span>
        </div>

        {/* Right Side: Add Button (Dialog Trigger) */}
        <div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2 bg-emerald-600 text-white hover:bg-emerald-700 hover:text-white transition duration-200 px-4 py-2 rounded-md shadow-md">
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">Add Application</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="p-0 bg-white dark:bg-black border max-w-[90vw] w-[600px] rounded-lg overflow-hidden">
              <AddJob />
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
