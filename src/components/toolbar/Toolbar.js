"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { GiSettingsKnobs } from "react-icons/gi";
import { IoAdd } from "react-icons/io5";
import FilterPanel from "./FilterPanel";

const Toolbar = ({ setOpenModal, setFilters, categories, patients }) => {
  const [localFilters, setLocalFilters] = useState({
    category: "all",
    patient: "all",
    startDate: "",
    endDate: "",
  });

  const applyFilters = () => {
    setFilters({
      category: localFilters.category === "all" ? null : localFilters.category,
      patient: localFilters.patient === "all" ? null : localFilters.patient,
      startDate: localFilters.startDate || null,
      endDate: localFilters.endDate || null,
    });
  };

  return (
    <div className="flex items-start space-x-3">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" aria-label="Filter öffnen">
            <GiSettingsKnobs className="mr-1" />
            Termine filtern
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-80 p-4 space-y-4 bg-white">
          <FilterPanel
            localFilters={localFilters}
            setLocalFilters={setLocalFilters}
            categories={categories}
            patients={patients}
            applyFilters={applyFilters}
          />
        </DropdownMenuContent>
      </DropdownMenu>
      <Button
        onClick={() => setOpenModal(true)}
        className="bg-black text-white"
        aria-label="Neuen Termin erstellen"
      >
        <IoAdd className="mr-1" />
        Neuer Termin
      </Button>
    </div>
  );
};

export default Toolbar;
